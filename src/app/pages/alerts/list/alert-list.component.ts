import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CreateAlertComponent } from 'src/app/pages/alerts/create/create-alert.component';
import { ToastrService } from 'ngx-toastr';
import { AlertDetailsComponent } from 'src/app/pages/alerts/details/alert-details.component';
import { AlertModel } from 'src/app/models/models';
import { EPriority } from 'src/app/models/enums';
import { ApiService } from 'src/app/services/api.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-alert-list',
  templateUrl: './alert-list.component.html',
  styleUrls: ['./alert-list.component.scss']
})
export class AlertListComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['title', 'description', 'date', 'priority', 'actions'];
  // dataSource: any = new MatTableDataSource<AlertModel>;
  dataSource: AlertModel[] = [];

  // @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  ngOnInit(): void {
    this.loadAlerts();
  }

  ngAfterViewInit(): void {
    // this.dataSource.paginator = this.paginator;
  }

  constructor(
    public dialog: MatDialog,
    private toastr: ToastrService,
    private alertService: AlertService
  ) { }

  loadAlerts() {
    return this.alertService.GetAlerts().subscribe(
      (data: any) => {
        // this.dataSource = [...data];
        console.log(data);
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

// const ELEMENT_DATA: AlertModel[] = [
//   { id: 0, title: 'Título', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna.', date: new Date(), priority: EPriority.High, location: 'CABA' }
// ];