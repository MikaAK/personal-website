import {Component, Input} from '@angular/core'

export type TagInput = {
  color: string
  name: string
}

@Component({
  selector: 'mk-project-card',
  templateUrl: './project-card.component.pug'
})
export class ProjectCardComponent {
  @Input() public imageUrl: string
  @Input() public title: string
  @Input() public tags: TagInput[]
}
