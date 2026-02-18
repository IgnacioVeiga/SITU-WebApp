import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { DatePipe, NgClass } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { CreateAlertComponent } from 'src/app/pages/alerts/create/create-alert.component';
import { AlertDetailsComponent } from 'src/app/pages/alerts/details/alert-details.component';
import { PageHeaderComponent } from 'src/app/shared/components/page-header/page-header.component';
import { Alert, AlertPriority } from 'src/app/shared/models/alert.model';
import { Page } from 'src/app/shared/models/page.model';
import { TruncatePipe } from 'src/app/shared/pipes/truncate.pipe';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
    templateUrl: './alert-list.component.html',
    styleUrls: ['./alert-list.component.scss'],
    imports: [
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        MatTableModule,
        MatPaginatorModule,
        TranslateModule,
        DatePipe,
        TruncatePipe,
        NgClass,
        PageHeaderComponent
    ]
})
export class AlertListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  readonly defaultPageSize = 20;
  displayedColumns: string[] = ['title', 'description', 'date', 'priority', 'actions'];
  dataSource: MatTableDataSource<Alert> = new MatTableDataSource<Alert>();
  activeOnly: boolean = true;

  private readonly dialog = inject(MatDialog);
  private readonly toastr = inject(ToastrService);
  private readonly alertService = inject(AlertService);

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;

    if (!this.paginator.pageSize) {
      this.paginator.pageSize = this.defaultPageSize;
    }

    this.paginator.page.subscribe(() => this.loadAlerts());
    this.loadAlerts();
  }

  loadAlerts(): void {
    this.alertService.GetAlerts(this.paginator.pageIndex, this.paginator.pageSize, this.activeOnly).subscribe({
      next: (data: Page<Alert>) => {
        this.dataSource.data = data.content;
        this.paginator.length = data.totalElements;
      },
      error: () => {
        this.toastr.error('No se pudo conectar al servidor', 'Intentelo más tarde');
      }
    });
  }

  setActiveOnly(activeOnly: boolean): void {
    if (this.activeOnly === activeOnly) {
      return;
    }
    this.activeOnly = activeOnly;
    this.paginator.firstPage();
    this.loadAlerts();
  }

  createAlertDialog(): void {
    const dialogRef = this.dialog.open(CreateAlertComponent);

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.loadAlerts();
      }
    });
  }

  seeAlertDialog(alert: Alert): void {
    this.dialog.open(AlertDetailsComponent, {
      data: alert
    });
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

  getPriorityLabel(priority: AlertPriority): string {
    switch (priority) {
      case AlertPriority.HIGH:
        return 'Alta';
      case AlertPriority.MEDIUM:
        return 'Media';
      case AlertPriority.LOW:
        return 'Baja';
      default:
        return 'Media';
    }
  }

  getPageSubtitle(): string {
    const filterLabel = this.activeOnly ? 'activas' : 'totales';
    return `${this.dataSource.data.length} alertas ${filterLabel} visibles de ${this.paginator?.length || 0}`;
  }
}
