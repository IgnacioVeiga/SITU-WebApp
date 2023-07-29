import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private router: Router) { }

  goTo(route: string): void {
    this.router.navigate([route]);
  }

  onSubmit(myForm: NgForm) {
    // console.log(myForm.value);

    // TODO: validar el login por backend
    // Si está todo OK, redirige a:
    this.goTo('report-list')
  }
}
