import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreateAlertComponent } from 'src/app/pages/alerts/create/create-alert.component';
import { ToastrService } from 'ngx-toastr';
import { AlertDetailsComponent } from 'src/app/pages/alerts/details/alert-details.component';
import { Alert } from 'src/app/shared/models/alert.model';
import { AlertService } from 'src/app/shared/services/alert.service';
import { TruncatePipe } from '../../../shared/pipes/truncate.pipe';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { Page } from 'src/app/shared/models/page.model';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  templateUrl: './alert-list.component.html',
  styleUrls: ['./alert-list.component.scss'],
  standalone: true,
  imports: [
    NavbarComponent,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    TranslateModule,
    DatePipe,
    TruncatePipe
  ]
})
export class AlertListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['title', 'description', 'date', 'priority', 'actions'];
  dataSource: any = new MatTableDataSource<Alert>;

  private dialog = inject(MatDialog);
  private toastr = inject(ToastrService);
  private alertService = inject(AlertService);

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.loadAlerts();
  }

  loadAlerts(): void {
    this.alertService.GetAlerts(this.paginator.pageIndex, this.paginator.pageSize).subscribe({
      next: (data: Page<Alert>) => {
        this.dataSource.data = data.content;
      },
      error: () => {
        // TODO: review, organize and translate all these types of toastr messages.
        this.toastr.error("No se pudo conectar al servidor", 'Intentelo más tarde');
      }
    });
  }

  CreateAlertDialog() {
    const dialogRef = this.dialog.open(CreateAlertComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadAlerts();
      }
    });
  }

  seeAlertDialog(alert: Alert) {
    this.dialog.open(AlertDetailsComponent, {
      data: alert
    });
  }
}
