import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ReportModel } from 'src/app/shared/models/report.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-report-details',
  templateUrl: './report-details.component.html',
  styleUrls: ['./report-details.component.scss']
})
export class ReportDetailsComponent {
  generatedBy: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ReportModel,
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
