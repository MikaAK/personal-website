import {Component} from '@angular/core'
import {replace} from 'ramda'

const FP_NAME = 'Functional Programming'
const FP_SHORT_NAME = 'FP'

const removeNumbers = replace(/\d/g, '')

@Component({
  selector: 'mk-skills',
  templateUrl: './skills.component.pug',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent {
  public isInView = false
  public frontendSkillsSchemes = {
    domain: ['#7CD7F9', '#F4E044', '#CE3336']
  }

  public frontendSkills = [{
    name: 'React',
    value: 1
  }, {
    name: 'Javascript',
    value: 2
  }, {
    name: 'Angular',
    value: 2
  }]

  public miscSkillsSchemes = {
    domain: ['#53C899', '#E2963D', '#9AD4F9', '#EEDB5F']
  }

  public miscSkills = [{
    name: 'Scrum',
    value: 1
  }, {
    name: 'AWS',
    value: 1
  }, {
    name: 'Webpack',
    value: 2
  }, {
    name: 'Functional Programming',
    value: 2
  }]

  public backendSkillsSchemes = {
    domain: ['#82B461', '#51B5E9', '#9278A9']
  }

  public backendSkills = [{
    name: 'NodeJS',
    value: 1
  }, {
    name: 'Docker',
    value: 1
  }, {
    name: 'Elixir',
    value: 1
  }]

  public edgeCaseLabelFormat(value: string) {
    if (value === FP_NAME)
      return FP_SHORT_NAME
    else
      return value
  }

  public stripNumbers(value: {data: {name: string}}) {
    return removeNumbers(value.data.name)
  }

  public onEleInView() {
    this.isInView = true
  }
}
