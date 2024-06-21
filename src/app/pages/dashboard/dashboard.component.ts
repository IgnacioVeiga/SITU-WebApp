import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { Chart, registerables } from 'chart.js';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgClass,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatGridListModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements AfterViewInit {

  @ViewChild('alertChart') alertChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('reportChart') reportChartRef!: ElementRef<HTMLCanvasElement>;

  constructor() {
    // Registrar todos los componentes de Chart.js
    Chart.register(...registerables);
  }

  ngAfterViewInit(): void {
    this.createAlertChart();
    this.createReportChart();
  }

  createAlertChart(): void {
    const ctx = this.alertChartRef.nativeElement.getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [{
            label: 'Alertas',
            data: [65, 59, 80, 81, 56, 55, 40],
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            fill: false
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              type: 'category',
              display: true,
              title: {
                display: true,
                text: 'Meses'
              }
            },
            y: {
              display: true,
              title: {
                display: true,
                text: 'Cantidad'
              }
            }
          }
        }
      });
    }
  }

  createReportChart(): void {
    const ctx = this.reportChartRef.nativeElement.getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [{
            label: 'Reportes',
            data: [28, 48, 40, 19, 86, 27, 90],
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1,
            fill: false
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              type: 'category',
              display: true,
              title: {
                display: true,
                text: 'Meses'
              }
            },
            y: {
              display: true,
              title: {
                display: true,
                text: 'Cantidad'
              }
            }
          }
        }
      });
    }
  }
}