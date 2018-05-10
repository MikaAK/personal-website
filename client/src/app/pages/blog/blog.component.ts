import {Component} from '@angular/core'

import {BlogService} from './blog.service'

@Component({
  selector: 'mk-blog',
  templateUrl: './blog.component.pug',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent {
  public get blogPosts$() {
    return this.blogService.posts$
  }

  constructor(private blogService: BlogService) { }
}
