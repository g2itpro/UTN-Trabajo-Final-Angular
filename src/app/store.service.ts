import { Injectable } from '@angular/core';
import { IStoreItems } from './store-items';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  url = 'https://fakestoreapi.com/products';
  constructor() {}

  async getAllProducts(): Promise<IStoreItems[]> {
    const data = await fetch(this.url);
    const products = (await data.json()) ?? [];

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(products);
      }, 300);
    });
  }

  async getProductById(id: number): Promise<IStoreItems> {
    const data = await fetch(`${this.url}/${id}`);
    return (await data.json()) ?? {};
  }

  async submitApplication(firstName: string, lastName: string, email: string) {
    alert(
      JSON.stringify({
        firstName,
        lastName,
        email,
      })
    );
  }
}
