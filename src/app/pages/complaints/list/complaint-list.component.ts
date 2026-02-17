import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Complaint, ComplaintState } from 'src/app/shared/models/complaint.model';
import { ComplaintService } from 'src/app/shared/services/complaint.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TruncatePipe } from '../../../shared/pipes/truncate.pipe';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Page } from 'src/app/shared/models/page.model';
import { TranslateModule } from '@ngx-translate/core';

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
        TruncatePipe
    ]
})
export class ComplaintListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['date', 'claimant', 'description', 'actions'];
  dataSource: any = new MatTableDataSource<Complaint>;
  listScope: 'all' | 'mine' = 'mine';
  
  private complaintService = inject(ComplaintService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private toastr = inject(ToastrService);

  ngAfterViewInit(): void {
    this.listScope = (this.activatedRoute.snapshot.data['scope'] ?? 'mine') as 'all' | 'mine';
    this.dataSource.paginator = this.paginator;
    this.loadComplaints();
    this.paginator.page.subscribe(() => this.loadComplaints());
  }

  loadComplaints(): void {
    const source$ = this.listScope === 'all'
      ? this.complaintService.getComplaints(this.paginator.pageIndex, this.paginator.pageSize)
      : this.complaintService.getMyComplaints(this.paginator.pageIndex, this.paginator.pageSize);

    source$.subscribe({
        next: (data: Page<Complaint>) => {
          this.dataSource.data = data.content;
        },
        error: () => {
          this.toastr.error('No se pudo conectar al servidor', 'Intentelo más tarde');
        }
      });
  }

  openComplaint(id: number) {
    this.router.navigate(['complaint/item/', id]);
  }

  getTitleKey(): string {
    return this.listScope === 'all' ? 'ALL_COMPLAINTS' : 'MY_COMPLAINTS';
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
