import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { GenerateAlertComponent } from 'src/app/dialogs/generate-alert/generate-alert.component';

@Component({
  selector: 'app-alert-list',
  templateUrl: './alert-list.component.html',
  styleUrls: ['./alert-list.component.scss']
})
export class AlertListComponent implements AfterViewInit {
  displayedColumns: string[] = ['title', 'description', 'date', 'priority'];
  dataSource: any = new MatTableDataSource<AlertElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(public dialog: MatDialog) { }

  openDialog() {
    const dialogRef = this.dialog.open(GenerateAlertComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

export interface AlertElement {
  title: string;
  description: string;
  date: string;
  priority: string;
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