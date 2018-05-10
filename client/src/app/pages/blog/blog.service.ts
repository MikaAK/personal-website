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
    title: 'How to do xyz',
    slug: 'how-to-do-xzy',
    imageUrl: 'https://placeimg.com/200/200',
    date: new Date(),
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel vestibulum arcu. Praesent at vestibulum nibh. Donec in quam quis eros vulputate rhoncus.',
    content: 'Curabitur ornare auctor nulla in imperdiet. Donec ut metus viverra, sollicitudin magna in, dapibus tellus. Aliquam erat volutpat. Nullam finibus consequat felis quis posuere. <strong>Cras</strong> pharetra ipsum massa, sit amet gravida tortor maximus nec. Duis a lectus consectetur, fermentum nisl ac, consequat massa. Integer ac viverra dui. <h1>Nulla</h1> facilisi. Fusce aliquet iaculis felis at tristique. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.'
  }])
  /* tslint:enable */

  public getPost(slug: string): Observable<BlogPost> {
    return this.posts$
      .pipe(rxMap(findPropEq('slug', slug)))
  }
}
