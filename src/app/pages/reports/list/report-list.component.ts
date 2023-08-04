import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ReportModel } from 'src/app/models/report.model';
import { ReportService } from 'src/app/services/report.service';
import { ReportDetailsComponent } from '../details/report-details.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss']
})
export class ReportListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild('myDiv', { static: false })myDiv!: ElementRef;

  displayedColumns: string[] = ['date', 'description', 'photos', 'state', 'actions'];
  dataSource: any = new MatTableDataSource<ReportModel>;

  constructor(
    public dialog: MatDialog,
    private toastr: ToastrService,
    private reportService: ReportService
  ) { }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.loadReports();
  }

  loadReports(): void {
    this.reportService.GetReports(this.paginator.pageIndex, this.paginator.pageSize).subscribe({
      next: (data: any): void => {
        this.dataSource.data = data;
      },
      error: () => {
        this.toastr.error('No se pudo conectar al servidor', 'Intentelo más tarde');
      }
    });
    // this.calculateDivLength();
  }


  seeReportDialog(alert: ReportModel) {
    this.dialog.open(ReportDetailsComponent, {
      data: alert
    });
  }

  transform(value: string, limit: number): any {
    if (limit && value.length > limit) {
      return value.substring(0, limit).concat('...');
    }
    return value;
  }

  // calculateDivLength() {
  //   const divElement: HTMLElement = this.myDiv.nativeElement;
  //   const divLength: number = divElement.offsetWidth;
  //   console.log('Longitud del div:', divLength, 'px');
  //   return divLength;
  // }


}