import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AlertModel } from 'src/app/models/alert.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-alert-details',
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
    this.userService.GetUserFullname(data.userId).subscribe({
      next: (resp: any) => {
        this.generatedBy = `${resp[0].lastname} ${resp[0].firstname}`;
      },
      error: () => {
        this.toastr.error('No se pudo conectar al servidor', 'Intentelo más tarde');
      }
    });
  }
}
