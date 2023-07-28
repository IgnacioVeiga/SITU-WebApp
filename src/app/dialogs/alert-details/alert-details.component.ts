import { Component } from '@angular/core';

@Component({
  selector: 'app-alert-details',
  templateUrl: './alert-details.component.html',
  styleUrls: ['./alert-details.component.scss']
})
export class AlertDetailsComponent {
  title: string = '';
  date: string = '';
  generatedBy: string = '';
  priorityLevel: string = '';
  location: string = '';
  description: string = '';

  constructor() {
    this.title = 'TÍTULO DE EJEMPLO';
    this.date = '28/07/2023 12:00hs';
    this.generatedBy = 'Pepe Argento';
    this.priorityLevel = 'MEDIA';
    this.location = 'Palermo - CABA';
    this.description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna.';
  }
}
