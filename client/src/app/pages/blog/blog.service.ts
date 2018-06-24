import {Injectable} from '@angular/core'
import {Observable, of as rxOf} from 'rxjs'
import {map as rxMap} from 'rxjs/operators'
import {curryN, propEq, find as _find} from 'ramda'

import {BlogPost} from '../../models'

const findPropEq = curryN(3, (prop: string, equalsValue: any, items: any[]) => _find(propEq(prop, equalsValue))(items))

@Injectable()
export class BlogService {
  /* tslint:disable max-line-length */
  public posts$ = rxOf<BlogPost[]>([{
    title: 'Hello... World?',
    slug: 'hello-world',
    imageUrl: 'assets/img/blog-post-1.jpg',
    date: new Date(),
    description: 'The first post of many to come. This post is all about my reasons for starting this blog and inspirations.',
    content: `
      <div>
        <p class="lh-copy">I’m sure you’ve guessed it if you’re reading this, I’m starting a new blog! I like to break things, it tends to happen when trying out new technologies without doing much research. During the process of fixing things and reading docs, I love to ask questions in the related communities and figure out how I can be more efficient in what I'm coding.</p>
        <p class="lh-copy mt4">Often, I’ve been lucky enough to talk to people who are working on the source, or even authored the library (big thanks to everyone who’ve answered all my dumb questions 🙌🙌). This blog will be an embodiment of the things I’ve learned and the experiences I've had hacking</p>
        <p class="lh-copy mt5">Look for things to come on:</p>
        <ul class="mt3 lst-dsc lsp-inside">
          <li class="lh-copy">Angular / React and other JS Frameworks</li>
          <li class="lh-copy">Elixir and GraphQL</li>
          <li class="lh-copy">Devops and AWS</li>
          <li class="lh-copy">More Randomness 😄</li>
        </ul>
      </div>
    `
  }])
  /* tslint:enable */

  public getPost(slug: string): Observable<BlogPost> {
    return this.posts$
      .pipe(rxMap(findPropEq('slug', slug)))
  }
}
