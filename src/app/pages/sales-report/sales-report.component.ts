import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-sales-report',
    imports: [],
    templateUrl: './sales-report.component.html',
    styleUrl: './sales-report.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SalesReportComponent {}
