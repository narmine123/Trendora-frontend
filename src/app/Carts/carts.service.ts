import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Cart, CartItem } from './cart.models';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartsService {
  baseApi = 'http://localhost:3000/cart';
  private selectedProducts = new BehaviorSubject<CartItem[]>([]);

  constructor(private http: HttpClient) {}

  getCart(): Observable<Cart> {
    return this.http.get<Cart>(this.baseApi, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
  }

  addToCart(productId: number): Observable<Cart> {
    return this.http.post<Cart>(
      `${this.baseApi}/add`,
      { productId },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      }
    );
  }

  removeFromCart(productId: number): Observable<Cart> {
    return this.http.delete<Cart>(`${this.baseApi}/remove`, {
      body: { productId },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
  }

  updateCartItemQuantity(
    productId: number,
    quantity: number
  ): Observable<Cart> {
    return this.http.patch<Cart>(
      `${this.baseApi}/update`,
      { productId, quantity },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      }
    );
  }
  clearCart(): Observable<Cart> {
    return this.http.delete<Cart>(`${this.baseApi}/clear`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
  }

  setSelectedProducts(products: CartItem[]): void {
    this.selectedProducts.next(products);
  }

  getSelectedProducts() {
    return this.selectedProducts.asObservable();
  }
  getCartItemCount(): Observable<number> {
    return this.selectedProducts.pipe(
      map((items: CartItem[]) =>
        items.reduce(
          (count: number, item: CartItem) => count + item.quantity,
          0
        )
      )
    );
  }
}
