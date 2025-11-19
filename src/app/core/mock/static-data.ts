import { Brand } from '../models/brand';
import { Category } from '../models/category';
import { Product } from '../models/product';
import { Sale } from '../models/sale';

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

    const baseYear = new Date().getFullYear();

    categories.forEach((category) => {
        const categoryProducts = products.filter((p) => p.categoryId === category.id);

        categoryProducts.forEach((product) => {
            const productBrands = brands.filter((b) => b.productId === product.id);

            productBrands.forEach((brand) => {
                for (let month = 0; month < 12; month++) {
                    const entries = 5 + Math.floor(Math.random() * 10);

                    for (let i = 0; i < entries; i++) {
                        sales.push({
                            id: id++,
                            productId: product.id,
                            brandId: brand.id,
                            categoryId: category.id,
                            date: new Date(baseYear, month, Math.floor(Math.random() * 28) + 1),
                            amount: Number((Math.random() * 500 + 50).toFixed(2)),
                        });
                    }
                }
            });
        });
    });

    return sales;
}

export const sales = generateSales();
