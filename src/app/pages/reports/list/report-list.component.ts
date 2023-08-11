import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ReportModel } from 'src/app/shared/models/report.model';
import { ReportService } from 'src/app/shared/services/report.service';
import { ReportDetailsComponent } from '../details/report-details.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss']
})
export class ReportListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // displayedColumns: string[] = ['date', 'claimant', 'reason', 'description', 'actions'];
  displayedColumns: string[] = ['date', 'claimant', 'description', 'actions'];

  dataSource: any = new MatTableDataSource<ReportModel>;

  constructor(
    public dialog: MatDialog,
    private reportService: ReportService,
  ) { }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.loadReports();
  }

  loadReports(): void {
    this.reportService.GetReports(this.paginator.pageIndex, this.paginator.pageSize).subscribe(
      (data: any): void => {
        this.dataSource.data = data;
      }
    );
  }

  seeReportDialog(alert: ReportModel) {
    this.dialog.open(ReportDetailsComponent, {
      data: alert
    });
  }
}