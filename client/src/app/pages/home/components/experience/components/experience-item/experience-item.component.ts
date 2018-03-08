import {Component, Input} from '@angular/core'

@Component({
  selector: 'mk-experience-item',
  templateUrl: './experience-item.component.pug',
  styleUrls: ['./experience-item.component.scss']
})
export class ExperienceItemComponent {
  @Input() public title: string
  @Input() public content: string
  @Input() public date: string
  @Input() public direction: 'left' | 'right' = 'left'
  @Input() public hideTail = false

  public get isDirectionLeft() {
    return this.direction === 'left'
  }

  public get isDirectionRight() {
    return this.direction === 'right'
  }
}
