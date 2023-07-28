import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { GenerateAlertComponent } from 'src/app/dialogs/generate-alert/generate-alert.component';
import { ToastrService } from 'ngx-toastr';
import { AlertElement } from 'src/app/models/interfaces';
import { AlertDetailsComponent } from 'src/app/dialogs/alert-details/alert-details.component';

@Component({
  selector: 'app-alert-list',
  templateUrl: './alert-list.component.html',
  styleUrls: ['./alert-list.component.scss']
})
export class AlertListComponent implements AfterViewInit {
  displayedColumns: string[] = ['title', 'description', 'date', 'priority', 'actions'];
  dataSource: any = new MatTableDataSource<AlertElement>(ELEMENT_DATA);

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

  seeAlertDialog() {
    this.dialog.open(AlertDetailsComponent);
  }
}

const ELEMENT_DATA: AlertElement[] = [
  { title: 'Título', description: 'Descripción de la alerta', date: '25/07/2023 19:30', priority: 'Alta' },
  { title: 'Título', description: 'Descripción de la alerta', date: '25/07/2023 19:30', priority: 'Alta' },
  { title: 'Título', description: 'Descripción de la alerta', date: '25/07/2023 19:30', priority: 'Alta' },
  { title: 'Título', description: 'Descripción de la alerta', date: '25/07/2023 19:30', priority: 'Alta' },
  { title: 'Título', description: 'Descripción de la alerta', date: '25/07/2023 19:30', priority: 'Alta' },
  { title: 'Título', description: 'Descripción de la alerta', date: '25/07/2023 19:30', priority: 'Alta' },
  { title: 'Título', description: 'Descripción de la alerta', date: '25/07/2023 19:30', priority: 'Alta' },
  { title: 'Título', description: 'Descripción de la alerta', date: '25/07/2023 19:30', priority: 'Alta' },
  { title: 'Título', description: 'Descripción de la alerta', date: '25/07/2023 19:30', priority: 'Alta' },
  { title: 'Título', description: 'Descripción de la alerta', date: '25/07/2023 19:30', priority: 'Alta' },
  { title: 'Título', description: 'Descripción de la alerta', date: '25/07/2023 19:30', priority: 'Alta' },
  { title: 'Título', description: 'Descripción de la alerta', date: '25/07/2023 19:30', priority: 'Alta' },
  { title: 'Título', description: 'Descripción de la alerta', date: '25/07/2023 19:30', priority: 'Alta' },
  { title: 'Título', description: 'Descripción de la alerta', date: '25/07/2023 19:30', priority: 'Alta' },
  { title: 'Título', description: 'Descripción de la alerta', date: '25/07/2023 19:30', priority: 'Alta' },
  { title: 'Título', description: 'Descripción de la alerta', date: '25/07/2023 19:30', priority: 'Alta' },
  { title: 'Título', description: 'Descripción de la alerta', date: '25/07/2023 19:30', priority: 'Alta' },
  { title: 'Título', description: 'Descripción de la alerta', date: '25/07/2023 19:30', priority: 'Alta' },
  { title: 'Título', description: 'Descripción de la alerta', date: '25/07/2023 19:30', priority: 'Alta' },
  { title: 'Título', description: 'Descripción de la alerta', date: '25/07/2023 19:30', priority: 'Alta' },
  { title: 'Título', description: 'Descripción de la alerta', date: '25/07/2023 19:30', priority: 'Alta' },
  { title: 'Título', description: 'Descripción de la alerta', date: '25/07/2023 19:30', priority: 'Alta' },
  { title: 'Título', description: 'Descripción de la alerta', date: '25/07/2023 19:30', priority: 'Alta' },
  { title: 'Título', description: 'Descripción de la alerta', date: '25/07/2023 19:30', priority: 'Alta' },
  { title: 'Título', description: 'Descripción de la alerta', date: '25/07/2023 19:30', priority: 'Alta' },
  { title: 'Título', description: 'Descripción de la alerta', date: '25/07/2023 19:30', priority: 'Alta' },
  { title: 'Título', description: 'Descripción de la alerta', date: '25/07/2023 19:30', priority: 'Alta' },
  { title: 'Título', description: 'Descripción de la alerta', date: '25/07/2023 19:30', priority: 'Alta' },
  { title: 'Título', description: 'Descripción de la alerta', date: '25/07/2023 19:30', priority: 'Alta' },
  { title: 'Título', description: 'Descripción de la alerta', date: '25/07/2023 19:30', priority: 'Alta' },
  { title: 'Título', description: 'Descripción de la alerta', date: '25/07/2023 19:30', priority: 'Alta' },
  { title: 'Título', description: 'Descripción de la alerta', date: '25/07/2023 19:30', priority: 'Alta' },
  { title: 'Título', description: 'Descripción de la alerta', date: '25/07/2023 19:30', priority: 'Alta' },
  { title: 'Título', description: 'Descripción de la alerta', date: '25/07/2023 19:30', priority: 'Alta' },
  { title: 'Título', description: 'Descripción de la alerta', date: '25/07/2023 19:30', priority: 'Alta' },
  { title: 'Título', description: 'Descripción de la alerta', date: '25/07/2023 19:30', priority: 'Alta' },
  { title: 'Título', description: 'Descripción de la alerta', date: '25/07/2023 19:30', priority: 'Alta' },
  { title: 'Título', description: 'Descripción de la alerta', date: '25/07/2023 19:30', priority: 'Alta' },
  { title: 'Título', description: 'Descripción de la alerta', date: '25/07/2023 19:30', priority: 'Alta' },
  { title: 'Título', description: 'Descripción de la alerta', date: '25/07/2023 19:30', priority: 'Alta' },
  { title: 'Título', description: 'Descripción de la alerta', date: '25/07/2023 19:30', priority: 'Alta' },
  { title: 'Título', description: 'Descripción de la alerta', date: '25/07/2023 19:30', priority: 'Alta' },
];