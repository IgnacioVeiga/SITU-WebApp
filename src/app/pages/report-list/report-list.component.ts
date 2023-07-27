import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ReportElement } from 'src/app/models/interfaces';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss']
})
export class ReportListComponent implements AfterViewInit {
  displayedColumns: string[] = ['number', 'date', 'description', 'photos', 'state'];
  dataSource: any = new MatTableDataSource<ReportElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}

const ELEMENT_DATA: ReportElement[] = [
  { number: 0, date: '25/07/2023 19:30', description: 'Descripción de la denuncia', photos: 'No disponible', state: 'Respondida' },
  { number: 0, date: '25/07/2023 19:30', description: 'Descripción de la denuncia', photos: 'No disponible', state: 'Respondida' },
  { number: 0, date: '25/07/2023 19:30', description: 'Descripción de la denuncia', photos: 'No disponible', state: 'Respondida' },
  { number: 0, date: '25/07/2023 19:30', description: 'Descripción de la denuncia', photos: 'No disponible', state: 'Respondida' },
  { number: 0, date: '25/07/2023 19:30', description: 'Descripción de la denuncia', photos: 'No disponible', state: 'Respondida' },
  { number: 0, date: '25/07/2023 19:30', description: 'Descripción de la denuncia', photos: 'No disponible', state: 'Respondida' },
  { number: 0, date: '25/07/2023 19:30', description: 'Descripción de la denuncia', photos: 'No disponible', state: 'Respondida' },
  { number: 0, date: '25/07/2023 19:30', description: 'Descripción de la denuncia', photos: 'No disponible', state: 'Respondida' },
  { number: 0, date: '25/07/2023 19:30', description: 'Descripción de la denuncia', photos: 'No disponible', state: 'Respondida' },
  { number: 0, date: '25/07/2023 19:30', description: 'Descripción de la denuncia', photos: 'No disponible', state: 'Respondida' },
  { number: 0, date: '25/07/2023 19:30', description: 'Descripción de la denuncia', photos: 'No disponible', state: 'Respondida' },
  { number: 0, date: '25/07/2023 19:30', description: 'Descripción de la denuncia', photos: 'No disponible', state: 'Respondida' },
  { number: 0, date: '25/07/2023 19:30', description: 'Descripción de la denuncia', photos: 'No disponible', state: 'Respondida' },
  { number: 0, date: '25/07/2023 19:30', description: 'Descripción de la denuncia', photos: 'No disponible', state: 'Respondida' },
  { number: 0, date: '25/07/2023 19:30', description: 'Descripción de la denuncia', photos: 'No disponible', state: 'Respondida' },
  { number: 0, date: '25/07/2023 19:30', description: 'Descripción de la denuncia', photos: 'No disponible', state: 'Respondida' },
  { number: 0, date: '25/07/2023 19:30', description: 'Descripción de la denuncia', photos: 'No disponible', state: 'Respondida' },
  { number: 0, date: '25/07/2023 19:30', description: 'Descripción de la denuncia', photos: 'No disponible', state: 'Respondida' },
  { number: 0, date: '25/07/2023 19:30', description: 'Descripción de la denuncia', photos: 'No disponible', state: 'Respondida' },
  { number: 0, date: '25/07/2023 19:30', description: 'Descripción de la denuncia', photos: 'No disponible', state: 'Respondida' },
  { number: 0, date: '25/07/2023 19:30', description: 'Descripción de la denuncia', photos: 'No disponible', state: 'Respondida' },
  { number: 0, date: '25/07/2023 19:30', description: 'Descripción de la denuncia', photos: 'No disponible', state: 'Respondida' },
  { number: 0, date: '25/07/2023 19:30', description: 'Descripción de la denuncia', photos: 'No disponible', state: 'Respondida' },
  { number: 0, date: '25/07/2023 19:30', description: 'Descripción de la denuncia', photos: 'No disponible', state: 'Respondida' },
  { number: 0, date: '25/07/2023 19:30', description: 'Descripción de la denuncia', photos: 'No disponible', state: 'Respondida' },
  { number: 0, date: '25/07/2023 19:30', description: 'Descripción de la denuncia', photos: 'No disponible', state: 'Respondida' },
  { number: 0, date: '25/07/2023 19:30', description: 'Descripción de la denuncia', photos: 'No disponible', state: 'Respondida' },
  { number: 0, date: '25/07/2023 19:30', description: 'Descripción de la denuncia', photos: 'No disponible', state: 'Respondida' },
  { number: 0, date: '25/07/2023 19:30', description: 'Descripción de la denuncia', photos: 'No disponible', state: 'Respondida' },
  { number: 0, date: '25/07/2023 19:30', description: 'Descripción de la denuncia', photos: 'No disponible', state: 'Respondida' },
  { number: 0, date: '25/07/2023 19:30', description: 'Descripción de la denuncia', photos: 'No disponible', state: 'Respondida' },
  { number: 0, date: '25/07/2023 19:30', description: 'Descripción de la denuncia', photos: 'No disponible', state: 'Respondida' },
  { number: 0, date: '25/07/2023 19:30', description: 'Descripción de la denuncia', photos: 'No disponible', state: 'Respondida' },
  { number: 0, date: '25/07/2023 19:30', description: 'Descripción de la denuncia', photos: 'No disponible', state: 'Respondida' },
  { number: 0, date: '25/07/2023 19:30', description: 'Descripción de la denuncia', photos: 'No disponible', state: 'Respondida' },
  { number: 0, date: '25/07/2023 19:30', description: 'Descripción de la denuncia', photos: 'No disponible', state: 'Respondida' },
  { number: 0, date: '25/07/2023 19:30', description: 'Descripción de la denuncia', photos: 'No disponible', state: 'Respondida' },
  { number: 0, date: '25/07/2023 19:30', description: 'Descripción de la denuncia', photos: 'No disponible', state: 'Respondida' },
];