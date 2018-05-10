import {Component, Input} from '@angular/core'

import {BlogPost} from '../../../../models'

const MARGIN_LEFT = 'ml3'
const MARGIN_RIGHT = 'mr3'
const CONTENT_FLEX_LEFT = 'space-between start'
const CONTENT_FLEX_RIGHT = 'space-between end'
const BUTTON_FLEX_LEFT = 'start'
const BUTTON_FLEX_RIGHT = 'end'

@Component({
  selector: 'mk-blog-post',
  templateUrl: './post.component.pug',
  styleUrls: ['./post.component.scss'],
  host: { // tslint:disable-line use-host-property-decorator
    class: 'mk-blog-post'
  }
})
export class BlogPostComponent {
  @Input() public post: BlogPost
  @Input() public set reversed(value: boolean) {
    this.imageOrderNumber = +value
    this.marginClass = value ? MARGIN_RIGHT : MARGIN_LEFT
    this.contentFlexDirection = value ? CONTENT_FLEX_RIGHT : CONTENT_FLEX_LEFT
    this.buttonFlexDirection = value ? BUTTON_FLEX_RIGHT : BUTTON_FLEX_LEFT
  }

  public get blogLink() {
    return `./${this.post.slug}`
  }

  public imageOrderNumber = 0
  public marginClass = MARGIN_LEFT
  public contentFlexDirection = CONTENT_FLEX_LEFT
  public buttonFlexDirection = BUTTON_FLEX_LEFT
}
