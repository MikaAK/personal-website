import {Input, Component} from '@angular/core'

@Component({
  selector: 'mk-pill',
  template: `
    <div class="f7 link dim br-pill ph2 pv2 mb2 dib {{ color }} bg-{{backgroundColor}}">
      <ng-content></ng-content>
    </div>
  `,
})
export class PillComponent {
  @Input() public backgroundColor = 'yellow'
  @Input() public color = 'black'
}
