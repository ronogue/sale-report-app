import { Product } from './product';

export interface Sale {
    id: number;
    productId: number;
    brandId: number;
    categoryId: number;
    date: Date;
    amount: number;
}
