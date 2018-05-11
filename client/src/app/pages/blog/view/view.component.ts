import {Component, OnInit} from '@angular/core'
import {ActivatedRoute, Router} from '@angular/router'
import {Observable} from 'rxjs/Observable'
import {mergeMap, take as rxTake, map as rxMap, tap as rxTap} from 'rxjs/operators'
import {prop} from 'ramda'

import {BlogPost} from '../../../models'

import {BlogService} from '../blog.service'

const loadComments = (pageUrl: string, postSlug: string) => {
  (<any>window).disqus_config = function(this: any) {
    this.page.url = pageUrl
    this.page.identifier = postSlug
  };

  /* tslint:disable */
  (() => {
    const d = document, s = d.createElement('script');
    s.src = 'https://mikakalathil.disqus.com/embed.js';
    (<any>s).setAttribute('data-timestamp', (+new Date()).toString());
    (d.head || d.body).appendChild(s);
  })()
  /* tslint:enable */
}

const rxMapToSlug = rxMap<BlogPost, string>(prop('slug'))

@Component({
  selector: 'mk-blog-view',
  templateUrl: './view.component.pug',
  styleUrls: ['./view.component.scss']
})
export class BlogViewComponent implements OnInit {
  public post$: Observable<BlogPost>
  public isCommentsLoaded: boolean

  constructor(
    private blogService: BlogService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  public ngOnInit() {
    this.post$ = this.route.params
      .pipe(
        rxMapToSlug,
        mergeMap((slug) => this.blogService.getPost(slug)),
        rxTap((post) => {
          if (!post)
            this.router.navigateByUrl('/blog')
        })
      )
  }

  public loadComments() {
    this.post$
      .pipe(
        rxTake(1),
        rxMapToSlug
      )
      .subscribe((slug) => {
        this.isCommentsLoaded = true

        loadComments(window.location.href, slug)
      })
  }
}
