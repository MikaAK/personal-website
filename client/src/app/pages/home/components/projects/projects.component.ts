import {Component} from '@angular/core'
import * as projectCards from './project-cards.json'

@Component({
  selector: 'mk-projects',
  templateUrl: './projects.component.pug',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
  public projectCards = projectCards
}
