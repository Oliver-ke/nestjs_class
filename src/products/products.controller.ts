import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('/products')
export class ProductController {
  constructor(private readonly productsService: ProductsService){}

  

  @Post()
  addProduct(@Body() reqBody: {
    description: string,
    price: number,
    title: string
  }):{id: string} {
    const {price, description, title} = reqBody;
    const prodId = this.productsService.insertProduction(title, description, price);
    return {id: prodId}
  }

  @Get()
  getAllProducts() {
    return this.productsService.getProducts();
  }

  @Get(':id')
  getSingleProduct(@Param('id') prodId: string){
    return this.productsService.getSingleProduct(prodId);
  }

  @Patch(':id')
  updateProduct(@Param('id')prodId: string, @Body() payload: {
    title: string,
    description: string,
    price: number
  }){
    this.productsService.updateProduct(prodId, payload);
    return null;
  }

  @Delete(':id')
  removeProduct(@Param('id') prodId: string){
    this.productsService.deleteProduct(prodId);
    return null;
  }
}