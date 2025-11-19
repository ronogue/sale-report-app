import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    DestroyRef,
    inject,
    OnInit,
} from '@angular/core';
import { categories, brands, products, sales } from '../../core/mock/static-data';
import { Category } from '../../core/models/category';
import { Brand } from '../../core/models/brand';
import { Product } from '../../core/models/product';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LineChartComponent } from '../../shared/line-chart/line-chart.component';
import { Sale } from '../../core/models/sale';

interface FilterData {
    categoryId: number;
    productId: number;
    brandId: number;
}

@Component({
    selector: 'app-sales-report',
    imports: [MatSelectModule, ReactiveFormsModule, LineChartComponent],
    templateUrl: './sales-report.component.html',
    styleUrl: './sales-report.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SalesReportComponent implements OnInit {
    private formBuilder = inject(FormBuilder);
    private destroyRef = inject(DestroyRef);
    private cdr = inject(ChangeDetectorRef);

    categories: Category[] = categories;
    products: Product[] = products;
    brands: Brand[] = brands;
    sales: Sale[] = sales;
    chartData: Sale[] = [];

    viewCategories: Category[] = this.categories;
    viewProducts: Product[] = [];
    viewBrands: Brand[] = [];

    form: FormGroup = this.formBuilder.group({
        categoryId: new FormControl<number | null>(null),
        productId: new FormControl<number | null>(null),
        brandId: new FormControl<number | null>(null),
    });

    ngOnInit(): void {
        this.addSelectListeners();

        this.form.valueChanges
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((value: FilterData) => {
                this.chartData = this.sales.filter((sale) => {
                    return (
                        sale.productId === value.productId &&
                        sale.brandId === value.brandId &&
                        sale.categoryId == value.categoryId
                    );
                });

                this.cdr.markForCheck();
            });

        this.form.patchValue({
            categoryId: this.categories?.[0].id,
            productId: this.products?.[0].id,
            brandId: this.products?.[0].id,
        });
    }

    addSelectListeners() {
        this.form
            .get('categoryId')
            ?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((catId) => {
                this.viewProducts = this.products.filter((p) => p.categoryId === catId);
                this.form.patchValue({ productId: null, brandId: null });
                this.viewBrands = [];
                this.chartData = [];
                this.cdr.markForCheck();
            });

        this.form
            .get('productId')
            ?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((prodId) => {
                if (prodId) {
                    this.viewBrands = this.brands.filter((b) => b.productId === prodId);
                } else {
                    this.viewBrands = [];
                }

                this.form.patchValue({ brandId: null });
                this.chartData = [];
                this.cdr.markForCheck();
            });
    }
}
