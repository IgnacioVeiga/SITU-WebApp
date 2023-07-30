import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { GenerateAlertComponent } from 'src/app/dialogs/generate-alert/generate-alert.component';
import { ToastrService } from 'ngx-toastr';
import { AlertDetailsComponent } from 'src/app/dialogs/alert-details/alert-details.component';
import { AlertModel } from 'src/app/models/models';
import { EPriority } from 'src/app/models/enums';

@Component({
  selector: 'app-alert-list',
  templateUrl: './alert-list.component.html',
  styleUrls: ['./alert-list.component.scss']
})
export class AlertListComponent implements AfterViewInit {
  displayedColumns: string[] = ['title', 'description', 'date', 'priority', 'actions'];
  dataSource: any = new MatTableDataSource<AlertModel>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(public dialog: MatDialog, private toastr: ToastrService) { }

  generateAlertDialog() {
    const dialogRef = this.dialog.open(GenerateAlertComponent);

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

const ELEMENT_DATA: AlertModel[] = [
  { id: 0, title: 'Título', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna.', date: new Date(), priority: EPriority.High, location: 'CABA' }
];