import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Alert, AlertPriority } from 'src/app/shared/models/alert.model';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
    templateUrl: './create-alert.component.html',
    styleUrls: ['./create-alert.component.scss'],
    imports: [
        FormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatOptionModule,
        MatButtonModule,
        TranslateModule
    ]
})
export class CreateAlertComponent {
  alert: Alert = {
    ...new Alert(),
    priority: AlertPriority.MEDIUM
  };
  priorityTypes: AlertPriority[] = [AlertPriority.HIGH, AlertPriority.MEDIUM, AlertPriority.LOW];
  isSubmitting: boolean = false;

  private readonly alertService = inject(AlertService);
  private readonly dialogRef = inject(MatDialogRef<CreateAlertComponent>);
  private readonly toastr = inject(ToastrService);

  onSubmit(): void {
    if (this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;

    this.alertService.CreateAlert(this.alert).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
      error: () => {
        this.toastr.error('No se pudo crear la alerta.', 'Inténtelo nuevamente');
        this.isSubmitting = false;
      }
    });
  }

  getPriorityLabel(priority: AlertPriority): string {
    switch (priority) {
      case AlertPriority.HIGH:
        return 'Alta';
      case AlertPriority.MEDIUM:
        return 'Media';
      case AlertPriority.LOW:
        return 'Baja';
      default:
        return priority;
    }
  }
}
