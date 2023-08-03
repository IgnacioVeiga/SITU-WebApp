import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ReportModel } from 'src/app/models/report.model';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss']
})
export class ReportListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['date', 'description', 'photos', 'state'];
  dataSource: any = new MatTableDataSource<ReportModel>;

  constructor(
    private reportService: ReportService
  ) { }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.loadReports();
  }

  loadReports(): void {
    this.reportService.GetReports(this.paginator.pageIndex, this.paginator.pageSize).subscribe(
      (data: any): void => {
        this.dataSource.data = [...data];
      }
    );
  }
}