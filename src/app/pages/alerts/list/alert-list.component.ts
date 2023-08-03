import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CreateAlertComponent } from 'src/app/pages/alerts/create/create-alert.component';
import { ToastrService } from 'ngx-toastr';
import { AlertDetailsComponent } from 'src/app/pages/alerts/details/alert-details.component';
import { AlertModel } from 'src/app/models/models';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-alert-list',
  templateUrl: './alert-list.component.html',
  styleUrls: ['./alert-list.component.scss']
})
export class AlertListComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['title', 'description', 'date', 'priority', 'actions'];
  dataSource: any = new MatTableDataSource<AlertModel>;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  ngOnInit(): void {
    this.loadAlerts();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    public dialog: MatDialog,
    private toastr: ToastrService,
    private alertService: AlertService
  ) { }

  loadAlerts() {
    return this.alertService.GetAlerts().subscribe(
      (data: any) => {
        this.dataSource.data = [...data];
      }
    );
  }

  generateAlertDialog() {
    const dialogRef = this.dialog.open(CreateAlertComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.toastr.success('Alerta emitida!');
      }
    });
  }

  seeAlertDialog(alert: AlertModel) {
    this.dialog.open(AlertDetailsComponent, {
      data: alert
    });
  }
}
