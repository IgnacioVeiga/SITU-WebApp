import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ReportModel } from 'src/app/shared/models/report.model';
import { ReportService } from 'src/app/shared/services/report.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss']
})
export class ReportListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['date', 'claimant', 'description', 'actions'];

  dataSource: any = new MatTableDataSource<ReportModel>;

  constructor(
    public dialog: MatDialog,
    private reportService: ReportService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.loadReports();
  }

  loadReports(): void {
    this.reportService.GetReports(this.paginator.pageIndex, this.paginator.pageSize)
      .subscribe({
        next: (data) => {
          this.dataSource.data = data;
        },
        error: () => {
          this.toastr.error('No se pudo conectar al servidor', 'Intentelo más tarde');
        }
      });
  }

  seeReport(id: number) {
    this.router.navigate(['report-item/', id]);
  }
}