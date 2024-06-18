import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Report } from 'src/app/shared/models/report.model';
import { ReportService } from 'src/app/shared/services/report.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TruncatePipe } from '../../../shared/pipes/truncate.pipe';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';

@Component({
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss'],
  standalone: true,
  imports: [NavbarComponent, MatDialogModule, MatTableModule, MatButtonModule, MatIconModule, MatPaginatorModule, DatePipe, TruncatePipe]
})
export class ReportListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['date', 'claimant', 'description', 'actions'];

  dataSource: any = new MatTableDataSource<Report>;

  constructor(
    public dialog: MatDialog,
    private reportService: ReportService,
    private router: Router,
    // private toastr: ToastrService
  ) { }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.loadReports();
  }

  loadReports(): void {
    this.reportService.GetReports(this.paginator.pageIndex, this.paginator.pageSize)
      .subscribe({
        next: (data: Report[]) => {
          this.dataSource.data = data;
        },
        error: () => {
          // this.toastr.error('No se pudo conectar al servidor', 'Intentelo más tarde');
        }
      });
  }

  openReport(id: number) {
    this.router.navigate(['item/', id]);
  }
}