Understanding GenServers in Elixir.
===

*This article assumes basic familiarity with GenServer's and how to write one*

### The mistakes we make when starting to use GenServer's

A common mistake when first entering Elixir is to use GenServer's for everything. Wrap most of your code with potential for failure in a GenServer because if it does fail, it's isolated. However, GenServer's have the potential of being extremely dangerous to your application and can also create bottlenecks when used incorrectly.

One of GenServer's most important principals is that it can only process one message at a time; which means that in order to handle multiple messages happening in parallel, you need to have multiple instances/processes of that GenServer running.

Elixir's parallelism is achieved through processes


### What are the costs of GenServer's?
Let's say you're creating a mailer (using [swoosh](https://github.com/swoosh/swoosh)) and you wrap it in a GenServer because if it fails you don't want it to crash the server. (This is actual code I've seen in a production app)

```elixir

defmodule MyApp.Mailer do
  use Swoosh.Mailer, otp_app: :sample
end

defmodule MyApp.MailSender do
  use GenServer
  
  import Swoosh.Email
  
  @from_info {"Bill Nye", "BillNye@TheScienceGuy.org"}
  
  def start_link(_), do: :ok
  def init(_), do: :ok
  
  def send_mail(email, name, subject, body) do
    GenServer.call(:mailer, {:send_email, {email, name, subject, body}})
  end
  
  def send_mail_async(email, name, subject, body) do
    GenServer.cast(:mailer, {:send_email, {email, name, subject, body}})
  end
  
  def handle_call({:send_mail, {email, name, subect, body}}, _, _) do
    email
      |> create_mail(name, subject, body)
      |> Mailer.deliver
  end

  def handle_call({:send_mail, {email, name, subect, body}}, _, _) do
    email
      |> create_mail(name, subject, body)
      |> Mailer.deliver
  end  
  
  defp create_mail(email, name, subject, body) do
    new()
      |> to({name, email})
      |> from(@from_info)
      |> subject(subject)
      |> html_body(body)
  end
end
```

Here we've created a GenServer with two functions, they both send mail, but one will return the results of the send request while the other will return right away and execute the request shortly after. This module allows mail sends to fail and not crash the rest of your system! 

### What do you lose by following this? 
By doing this one of the (maybe) unintended side-effects is you are limited to only being able to pass one message at a time, this can be leveraged at as a back-pressure system to some extent, but there are much better solutions like GenStage. One of the reason for this is timeouts, when things start queing up and taking longer than the timeout, it's going to drop the messages and they will be lost! 

On the flip side if passing one message at a time is an unintended side effect,  for example in the case that you want the sytem to process multiple messages and run long running actions in parallel you've created a bottle neck.

Everything is also still on the same thread, so for example if you call `call` and you have a long running command behind that, then call `cast`, you're slowing your entire program down while your main thread is waiting for `cast` to complete, which is waiting for `call` to complete. 

##### Example of bottleneck:


<div style='display: flex; justify-content: center; align-items: center; margin: 20px 0;'>
<img src='https://mikakalathil.ca/assets/img/gen-server-blocking.png' height='300px'>
</div>

### What can be harmful about this?
First off, most of the time you don't want to be loosing messages in your queue (as can happen with timeouts as stated above). Second if you're running many long running processes, wouldn't you want them returning as quickly as possible instead of cloging up? That's a sign your application isn't able to scale to demand, why start with bottlenecks when you can eliminate the obvious ones?
That's only one of the issues created by wraping code in your GenServer, this example doesn't showcase it but another is memory. GenServer's have the capability of storing pretty large amounts of state, though this is all in memory, and memory isn't free. We need be careful with what you store in the state because memory is not unlimited or cheap. The other issue with using GenServer for state is when it comes to distribution how will the state work? If you have more nodes does the state need to be shared or is there a single master? What happens if one of the nodes dies, or is cut off from the network? These are important questions to ask ourselves when creating distributed systems and while out of scope for this article, I'll answer them next time in: *Distributed GenServers*.

Another note about GenServers, is message passing isn't as cheap as we would think, and things that are large need to be passed a different way otherwise they will get copied in memory, doing this multiple times can lead to your system taking up more resources than expected or neccessary to pass along messages. Discord created [fastglobal](https://github.com/discordapp/fastglobal) as a solution to this problem. 

### Parallelism: Registries to the rescue
If you want to solve some of these issues, particularly around creating bottlenecks or slowdowns we have a solution! Registries! These provide you with a way to  store a Key-Value dictionary of name -> PID.  This allows you to ask the registry to lookup the PID and then call the PID directly which can be your GenServer.

This changes the flow to something like this:  

<div style='display: flex; justify-content: center; align-items: center; margin: 20px 0;'>
<img src='https://mikakalathil.ca/assets/img/gen-server-parallel.png' height='300px'>
</div>

Registries provide a great solution to possible bottlenecks with GenServer's that come from many things hitting it at once, but this all assumes you're running on one machine locally, but what happens when you start to go distributed! This requires a registry that can  communicate distributedly and some of the solutations to that are: 

- [horde](https://github.com/michalmuskala/horde)
- [gproc](https://github.com/uwiger/gproc)
- [pg2](http://erlang.org/doc/man/pg2.html)

### Storage Bottleneck
Another bottleneck it can create is when it comes to storage, a lot of times I see GenServer being used as a cache, most recently in a job interview I was asked to create a caching module, so I went ahead and used [con_cache](https://github.com/sasa1977/con_cache). As feedback I was told my solution was vastly different, and most people had chosen to use a GenServer, which begged the question, was it neccessary? I see a lot of GenServer's that could be implimented as Agents instead which are simpler. It's always better to use the simplest solution adding complexity as neccessary. 

 [con_cache](https://github.com/sasa1977/con_cache) runs ontop of ETS, which for reads is async and can be accessed in parallel, this means that you can't have a queue build up to access state, which is a possibility with the GenServer implimentation. Instead of creating this limitation, why not just use something like ETS. I suggest using it behind  [con_cache](https://github.com/sasa1977/con_cache) which abstracts some of the hard parts.

### Summary
In this article we learned about some of the dangers of GenServer, and how using it for the wrong things can lead to bottlenecks in our application. We also learned that using it for long running functions requires more thought, especially if that same GenServer has both `cast` and `call` as you can lag the `call`er due to prior `cast` calls .   Finally we learned to use ETS or Agents instead of GenServer's for storing state.

Next time in *Distributed GenServers* we'll discuss how to use some of these tools to create a distributed registry, as well as some of the pains and issues around GenServer's at a distributed level.

Have you  fallen trap to the GenServer bottleneck pattern? Or have more questions about GenServers?

Let me know in the comments below!
