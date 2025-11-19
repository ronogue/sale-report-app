import { Brand } from '../models/brand';
import { Category } from '../models/category';
import { Product } from '../models/product';

export const categories: Category[] = [
    { id: 1, name: 'Comida' },
    { id: 2, name: 'Roupas' },
    { id: 3, name: 'Eletrônicos' },
];

export const products: Product[] = [
    { id: 1, categoryId: 1, name: 'Arroz' },
    { id: 2, categoryId: 1, name: 'Feijão' },
    { id: 3, categoryId: 2, name: 'Camisa' },
    { id: 4, categoryId: 2, name: 'Calça' },
    { id: 5, categoryId: 3, name: 'Celular' },
    { id: 6, categoryId: 3, name: 'Notebook' },
];

export const brands: Brand[] = [
    { id: 1, productId: 1, name: 'Tio João' },
    { id: 2, productId: 2, name: 'Kicaldo' },
    { id: 3, productId: 3, name: 'Hering' },
    { id: 4, productId: 4, name: 'Levis' },
    { id: 5, productId: 5, name: 'Samsung' },
    { id: 6, productId: 6, name: 'Dell' },
];

function generateSales(): Sale[] {
    const sales: Sale[] = [];
    let id = 1;

    brands.forEach((brand) => {
        for (let monthOffset = 0; monthOffset < 12; monthOffset++) {
            const date = new Date();
            date.setMonth(date.getMonth() - monthOffset);

            const entries = Math.floor(Math.random() * 10) + 5;

            for (let i = 0; i < entries; i++) {
                sales.push({
                    id: id++,
                    productId: brand.productId,
                    brandId: brand.id,
                    date: new Date(
                        date.getFullYear(),
                        date.getMonth(),
                        Math.floor(Math.random() * 28) + 1
                    )
                        .toISOString()
                        .split('T')[0],
                    amount: Number((Math.random() * 500 + 50).toFixed(2)),
                });
            }
        }
    });

    return sales;
}

export const sales = generateSales();
