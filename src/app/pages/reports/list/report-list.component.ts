import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Complaint, ComplaintState } from 'src/app/shared/models/report.model';
import { ReportService } from 'src/app/shared/services/report.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TruncatePipe } from '../../../shared/pipes/truncate.pipe';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Page } from 'src/app/shared/models/page.model';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    templateUrl: './report-list.component.html',
    styleUrls: ['./report-list.component.scss'],
    imports: [
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        MatPaginatorModule,
        TranslateModule,
        DatePipe,
        TruncatePipe
    ]
})
export class ReportListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['date', 'claimant', 'description', 'actions'];
  dataSource: any = new MatTableDataSource<Complaint>;
  
  private reportService = inject(ReportService);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.loadReports();
  }

  loadReports(): void {
    this.reportService.GetReports(this.paginator.pageIndex, this.paginator.pageSize)
      .subscribe({
        next: (data: Page<Complaint>) => {
          this.dataSource.data = data.content;
        },
        error: () => {
          // TODO: review, organize and translate all these types of toastr messages.
          this.toastr.error('No se pudo conectar al servidor', 'Intentelo más tarde');
        }
      });
  }

  openReport(id: number) {
    this.router.navigate(['report/item/', id]);
  }

  getStateLabel(state: ComplaintState): string {
    switch (state) {
      case ComplaintState.PENDING_REVIEW:
        return 'Pendiente de revisión';
      case ComplaintState.IN_REVIEW:
        return 'En revisión';
      case ComplaintState.CLOSED:
        return 'Cerrada';
      case ComplaintState.REOPENED:
        return 'Reabierta';
      default:
        return state;
    }
  }
}
