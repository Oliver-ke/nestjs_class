import {Injectable, NotFoundException} from '@nestjs/common';
import { title } from 'process';
import {Product} from './products.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  insertProduction(title: string, desc: string, price: number): string{
    const id = Math.random().toString();
    const newProduct = new Product(id, title, desc, price);
    this.products.push(newProduct);
    return id;
  }

  getProducts() {
    return [...this.products];
  }

  getSingleProduct(prodId: string) :Product{
    const [_, product] = this.findProduct(prodId);
    return {...product};
  }

  updateProduct(prodId, update: {title: string, description: string, price: number}){
    const [index, product] = this.findProduct(prodId);
    const updateProduct = {...product}
    if(update.title){
      updateProduct.title = update.title;
    }
    if(update.description){
      updateProduct.desc = update.description
    }
    if(update.price){
      updateProduct.price = update.price
    }

    this.products[index] = updateProduct;
  }

  deleteProduct(prodId: string){
    const [index] = this.findProduct(prodId);
    this.products.splice(index, 1);
  }

  private findProduct(prodId: string): [number, Product]{
    const productIndex = this.products.findIndex(({id}) => id === prodId);
    const product = this.products[productIndex];
    if(!product){
      throw new NotFoundException('Could not find product.');
    }
    return [productIndex, product]
  }
}