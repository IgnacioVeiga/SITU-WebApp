import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { DatePipe, NgClass } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { PageHeaderComponent } from 'src/app/shared/components/page-header/page-header.component';
import { Complaint, ComplaintState } from 'src/app/shared/models/complaint.model';
import { Page } from 'src/app/shared/models/page.model';
import { TruncatePipe } from 'src/app/shared/pipes/truncate.pipe';
import { ComplaintService } from 'src/app/shared/services/complaint.service';

@Component({
    templateUrl: './complaint-list.component.html',
    styleUrls: ['./complaint-list.component.scss'],
    imports: [
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        MatPaginatorModule,
        TranslateModule,
        DatePipe,
        TruncatePipe,
        NgClass,
        PageHeaderComponent
    ]
})
export class ComplaintListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  readonly defaultPageSize = 20;
  displayedColumns: string[] = ['date', 'claimant', 'description', 'actions'];
  dataSource: MatTableDataSource<Complaint> = new MatTableDataSource<Complaint>();
  listScope: 'all' | 'mine' = 'mine';
  titleKey: 'ALL_COMPLAINTS' | 'MY_COMPLAINTS' = 'MY_COMPLAINTS';

  private readonly complaintService = inject(ComplaintService);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly toastr = inject(ToastrService);

  ngOnInit(): void {
    this.listScope = (this.activatedRoute.snapshot.data['scope'] ?? 'mine') as 'all' | 'mine';
    this.titleKey = this.listScope === 'all' ? 'ALL_COMPLAINTS' : 'MY_COMPLAINTS';
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;

    if (!this.paginator.pageSize) {
      this.paginator.pageSize = this.defaultPageSize;
    }

    this.paginator.page.subscribe(() => this.loadComplaints());
    this.loadComplaints();
  }

  loadComplaints(): void {
    const source$ = this.listScope === 'all'
      ? this.complaintService.getComplaints(this.paginator.pageIndex, this.paginator.pageSize)
      : this.complaintService.getMyComplaints(this.paginator.pageIndex, this.paginator.pageSize);

    source$.subscribe({
      next: (data: Page<Complaint>) => {
        this.dataSource.data = data.content;
        this.paginator.length = data.totalElements;
      },
      error: () => {
        this.toastr.error('No se pudo conectar al servidor', 'Intentelo más tarde');
      }
    });
  }

  openComplaint(id: number): void {
    this.router.navigate(['complaint/item/', id]);
  }

  getPageSubtitle(): string {
    return `${this.dataSource.data.length} registros visibles de ${this.paginator?.length || 0} totales`;
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

  getStateClass(state: ComplaintState): string {
    switch (state) {
      case ComplaintState.PENDING_REVIEW:
        return 'state-pending';
      case ComplaintState.IN_REVIEW:
        return 'state-in-review';
      case ComplaintState.CLOSED:
        return 'state-closed';
      case ComplaintState.REOPENED:
        return 'state-reopened';
      default:
        return 'state-pending';
    }
  }
}
