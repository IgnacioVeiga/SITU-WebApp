import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AlertModel } from 'src/app/shared/models/alert.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  templateUrl: './alert-details.component.html',
  styleUrls: ['./alert-details.component.scss']
})
export class AlertDetailsComponent {
  generatedBy: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AlertModel,
    private toastr: ToastrService,
    private userService: UserService
  ) {
    this.userService.GetUser(data.userId).subscribe({
      next: (resp: any) => {
        this.generatedBy = `${resp.lastname} ${resp.firstname}`;
      },
      error: () => {
        this.toastr.error('No se pudo conectar al servidor', 'Intentelo más tarde');
      }
    });
  }
}
