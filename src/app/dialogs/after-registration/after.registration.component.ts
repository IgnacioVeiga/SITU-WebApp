import { Component } from '@angular/core';

@Component({
  selector: 'app-after.registration',
  templateUrl: './after.registration.component.html',
  styleUrls: ['./after.registration.component.scss']
})
export class AfterRegistrationComponent {
  title: string = '';
  date: string = '';
  generatedBy: string = '';
  priorityLevel: string = '';
  location: string = '';
  description: string = '';

  constructor() {
  }
}
