import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EReportState } from 'src/app/models/enums';
import { ReportModel } from 'src/app/models/models';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss']
})
export class ReportListComponent implements AfterViewInit {
  displayedColumns: string[] = ['date', 'description', 'photos', 'state'];
  dataSource: any = new MatTableDataSource<ReportModel>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}

const ELEMENT_DATA: ReportModel[] = [
  { id: 0, userId: 0, date: new Date(), description: 'Descripción de la denuncia', photos: [], state: EReportState.Standby }
];