import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Chart, registerables } from 'chart.js';
import { TranslateModule } from '@ngx-translate/core';
import { PageHeaderComponent } from 'src/app/shared/components/page-header/page-header.component';

@Component({
    selector: 'app-dashboard',
    imports: [
        MatIconModule,
        TranslateModule,
        PageHeaderComponent
    ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements AfterViewInit, OnDestroy {
  @ViewChild('alertChart') alertChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('complaintChart') complaintChartRef!: ElementRef<HTMLCanvasElement>;

  private alertChart?: Chart;
  private complaintChart?: Chart;

  constructor() {
    Chart.register(...registerables);
  }

  ngAfterViewInit(): void {
    this.createAlertChart();
    this.createComplaintChart();
  }

  ngOnDestroy(): void {
    this.alertChart?.destroy();
    this.complaintChart?.destroy();
  }

  private createAlertChart(): void {
    const ctx = this.alertChartRef.nativeElement.getContext('2d');
    if (!ctx) {
      return;
    }

    this.alertChart?.destroy();

    this.alertChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
        datasets: [{
          label: 'Alertas creadas',
          data: [3, 5, 4, 6, 2, 1, 3],
          borderColor: this.getCssColor('--primary'),
          backgroundColor: 'rgba(19, 122, 127, 0.16)',
          borderWidth: 2,
          pointRadius: 3,
          fill: true,
          tension: 0.35
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            grid: {
              color: 'rgba(95, 112, 123, 0.12)'
            }
          },
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0
            },
            grid: {
              color: 'rgba(95, 112, 123, 0.12)'
            }
          }
        }
      }
    });
  }

  private createComplaintChart(): void {
    const ctx = this.complaintChartRef.nativeElement.getContext('2d');
    if (!ctx) {
      return;
    }

    this.complaintChart?.destroy();

    this.complaintChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Pendiente', 'En revisión', 'Cerrada', 'Reabierta'],
        datasets: [{
          label: 'Denuncias',
          data: [18, 11, 33, 4],
          backgroundColor: [
            '#ffe9c7',
            '#d5eef8',
            '#d9f2e0',
            '#f7d8ea'
          ],
          borderColor: [
            '#8b5f17',
            '#1f5e79',
            '#1a5e3a',
            '#83305d'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0
            },
            grid: {
              color: 'rgba(95, 112, 123, 0.12)'
            }
          }
        }
      }
    });
  }

  private getCssColor(variable: string): string {
    return getComputedStyle(document.documentElement).getPropertyValue(variable).trim() || '#137a7f';
  }
}
