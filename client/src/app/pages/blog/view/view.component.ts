import {Component, OnInit} from '@angular/core'
import {ActivatedRoute} from '@angular/router'
import {Observable} from 'rxjs/Observable'
import {mergeMap, map as rxMap} from 'rxjs/operators'
import {prop} from 'ramda'

import {BlogPost} from '../../../models'

import {BlogService} from '../blog.service'

@Component({
  selector: 'mk-blog-view',
  templateUrl: './view.component.pug',
  styleUrls: ['./view.component.scss']
})
export class BlogViewComponent implements OnInit {
  public post$: Observable<BlogPost>

  constructor(private blogService: BlogService, private route: ActivatedRoute) { }

  public ngOnInit() {
    this.post$ = this.route.params
      .pipe(
        rxMap<BlogPost, string>(prop('slug')),
        mergeMap((slug) => this.blogService.getPost(slug))
      )
  }
}
