import {Injectable} from '@angular/core'
import {Observable} from 'rxjs/Observable'
import {of as rxOf} from 'rxjs/observable/of'
import {map as rxMap} from 'rxjs/operators'
import {curryN, compose, propEq, find as _find} from 'ramda'

import {BlogPost} from '../../models'

type FindPropEq = (prop: string, equalsValue: any) => (items: any[]) => any

const findPropEq: FindPropEq = curryN(2, compose(_find, propEq))

@Injectable()
export class BlogService {
  /* tslint:disable max-line-length */
  public posts$ = rxOf<BlogPost[]>([{
    title: 'Hello... World',
    slug: 'hello-world',
    imageUrl: 'https://placeimg.com/200/200',
    date: new Date(),
    description: 'The first post of many to come. This post is all about my reasons for starting this blog and inspirations.',
    content: `
      <div>
        <p class="lh-copy">I’m sure you’ve guessed it if you’re reading this, I’m starting a blog. I like to break things (shout out to @breakingthings), not usually on purpose but it tends to happen when trying out new technologies without doing much research. During the process of fixing things I love to ask questions to the various communities I can get in touch with and figure out how I can do what I’m doing better.</p>
        <p class="lh-copy mt4">Often time, I’ve been lucky enough to talk with people who work on the source or even authored the library (big thanks to everyone who’ve answered all my dumb questions!), this blog will be an embodiment of the things I’ve learned from these experiences!</p>
        <p class="lh-copy mt5">Look for things to come on:</p>
        <ul class="mt3 lst-dsc lsp-inside">
          <li class="lh-copy">Angular / React and other JS Frameworks</li>
          <li class="lh-copy">Elixir</li>
          <li class="lh-copy">Devops and AWS</li>
          <li class="lh-copy">More Randomness</li>
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
