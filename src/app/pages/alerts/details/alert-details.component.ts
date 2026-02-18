import { DatePipe, NgClass } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { Alert, AlertPriority } from 'src/app/shared/models/alert.model';

@Component({
    templateUrl: './alert-details.component.html',
    styleUrls: ['./alert-details.component.scss'],
    imports: [
        MatDialogModule,
        MatButtonModule,
        TranslateModule,
        DatePipe,
        NgClass
    ]
})
export class AlertDetailsComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: Alert) {}

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

    getPriorityClass(priority: AlertPriority): string {
        switch (priority) {
            case AlertPriority.HIGH:
                return 'priority-high';
            case AlertPriority.MEDIUM:
                return 'priority-medium';
            case AlertPriority.LOW:
                return 'priority-low';
            default:
                return 'priority-medium';
        }
    }

    getActiveStateClass(): string {
        return this.data.active ? 'state-in-review' : 'state-closed';
    }

    getActiveStateLabel(): string {
        return this.data.active ? 'Activa' : 'Inactiva';
    }
}
