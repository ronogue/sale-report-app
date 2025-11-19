import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
    ApexAxisChartSeries,
    ApexChart,
    ApexXAxis,
    ApexStroke,
    ApexDataLabels,
    ApexTooltip,
    NgApexchartsModule,
} from 'ng-apexcharts';
import { Sale } from '../../core/models/sale';

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis;
    stroke: ApexStroke;
    dataLabels: ApexDataLabels;
    tooltip: ApexTooltip;
};

@Component({
    selector: 'app-line-chart',
    standalone: true,
    imports: [CommonModule, NgApexchartsModule],
    templateUrl: './line-chart.component.html',
    styleUrls: ['./line-chart.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LineChartComponent {
    @Input()
    salesData: Sale[] = [];

    public chartOptions: Partial<ChartOptions> = {};

    constructor() {
        this.chartOptions = {
            chart: {
                type: 'line',
                height: 350,
                zoom: { enabled: false },
            },
            stroke: {
                curve: 'straight',
                width: 2,
            },
            xaxis: {
                type: 'datetime',
            },
            yaxis: {
                labels: {
                    formatter: (v) => v.toLocaleString('pt-BR'),
                },
            },
            tooltip: {
                x: { format: 'dd/MM/yy' },
            },
        };
    }

    ngOnChanges() {
        if (this.salesData && this.salesData.length) {
            this.updateChart();
        }
    }

    private updateChart() {
        const monthlyTotalsGroup: { [key: number]: { x: number; y: number } } = {};

        this.salesData.forEach((sale) => {
            const month = sale.date.getMonth();
            let data = monthlyTotalsGroup[month];

            if (!data) {
                data = monthlyTotalsGroup[month] = {
                    x: new Date(sale.date.getFullYear(), month, 1).getTime(),
                    y: 0,
                };
            }

            data.y += sale.amount;
        });

        const ordered = Object.values(monthlyTotalsGroup).sort((a, b) => a.x - b.x);

        console.log(ordered);

        this.chartOptions.series = [
            {
                name: 'Total de Vendas',
                data: ordered,
            },
        ];
    }
}
