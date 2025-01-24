import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Common } from 'devextreme-angular';
import { CartsService } from '../carts.service';
import { Cart, CartItem } from '../cart.models';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  constructor(private service: CartsService) {}

  cartProducts: CartItem[] = [];
  total: number = 0;
  success: boolean = false;

  ngOnInit(): void {
    // Fetch cart items from DB using service
    this.getCart();
  }

  getCart(): void {
    this.service.getCart().subscribe(
      (cart: Cart) => {
        this.cartProducts = cart.cartItems;
        console.log(this.cartProducts);
        this.total = cart.totalPrice;
      },
      (error) => {
        console.error('Error fetching cart:', error);
      }
    );
  }

  getCartTotal(): void {
    this.total = 0;
    for (let x in this.cartProducts) {
      this.total +=
        this.cartProducts[x].product.price * this.cartProducts[x].quantity;
    }
  }

  addAmount(index: number): void {
    console.log(`addAmount called with index: ${index}`);
    console.log(
      `Product ID: ${this.cartProducts[index].product.id}, Current Quantity: ${this.cartProducts[index].quantity}`
    );
    this.cartProducts[index].quantity++;
    this.updateCartItemQuantity(
      this.cartProducts[index].product.id,
      this.cartProducts[index].quantity
    );
  }

  minusAmount(index: number): void {
    console.log(`minusAmount called with index: ${index}`);
    console.log(
      `Product ID: ${this.cartProducts[index].product.id}, Current Quantity: ${this.cartProducts[index].quantity}`
    );
    if (this.cartProducts[index].quantity > 1) {
      // prevent negative quantities
      this.cartProducts[index].quantity--;
      this.updateCartItemQuantity(
        this.cartProducts[index].product.id,
        this.cartProducts[index].quantity
      );
    }
  }

  detectChange(): void {
    console.log(`detectChange called`);
    console.log(`Cart Products before change detection:`, this.cartProducts);

    this.cartProducts = this.cartProducts.map((item) => {
      if (item.quantity < 1) {
        console.log(`Quantity for Product ID ${item.product.id} reset to 1`);
        item.quantity = 1; // reset to minimum valid quantity
      }
      return item;
    });
    this.cartProducts.forEach((item) => {
      console.log(
        `Updating Product ID: ${item.product.id} with Quantity: ${item.quantity}`
      );
      this.updateCartItemQuantity(item.product.id, item.quantity);
    });
  }

  // deleteProduct(index: number): void {
  //   const productId = this.cartProducts[index].product.id;
  //   console.log(`deleteProduct called with index: ${index}`);
  //   console.log(`Product ID to delete: ${productId}`);

  //   this.service.removeFromCart(productId).subscribe(
  //     (cart: Cart) => {
  //       if (this.cartProducts.length === 0) {
  //         window.location.reload(); // Reload the page
  //       }
  //       console.log(`Product ID ${productId} removed successfully`);
  //       this.cartProducts = cart.cartItems;
  //       this.total = cart.totalPrice;
  //       console.log(this.cartProducts);
  //       // Check if the cart is empty after removal

  //     },
  //     (error) => {
  //       console.error('Error removing product from cart:', error);
  //     }
  //   );
  // }

  deleteProduct(index: number): void {
    const productId = this.cartProducts[index].product.id;

    console.log(`Deleting product with ID: ${productId}`);

    this.service.removeFromCart(productId).subscribe(
      (cart) => {
        console.log(`Product ID ${productId} removed successfully`);


        // Update the cartProducts and total
        this.cartProducts = cart.cartItems;
        this.total = cart.totalPrice;
        console.log('Updated cart items:', this.cartProducts);



        // Remove the product from the UI in case of backend sync delay
        if (this.cartProducts.length === 0) {
          //window.location.reload(); // Reload the page


          this.cartProducts = [];
          this.total = 0;
        }
      },

    );
  }

  clearCart(): void {
    console.log(`clearCart called`);

    this.service.clearCart().subscribe(
      (cart : Cart) => {
        console.log(`Cart cleared successfully`);
        this.cartProducts = [];
        this.total = 0;
      },
      (error) => {
        console.error('Error clearing cart:', error);
      }
    );
  }

  checkout(): void {
    // call checkout method in the order module
  }

  private updateCartItemQuantity(productId: number, quantity: number): void {
    console.log(
      `updateCartItemQuantity called with Product ID: ${productId}, Quantity: ${quantity}`
    );

    this.service.updateCartItemQuantity(productId, quantity).subscribe(
      (cart: Cart) => {
        console.log(
          `Cart item with Product ID ${productId} updated successfully`
        );
        this.cartProducts = cart.cartItems;
        this.total = cart.totalPrice;
      },
      (error) => {
        console.error('Error updating cart item quantity:', error);
      }
    );
  }

  getCartProducts() {
    if ('cartProducts' in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('cartProducts')!);
      console.log(this.cartProducts);
    }
  }

  // getCartTotal(): void {
  //   this.total = 0;
  //   for (let x in this.cartProducts) {
  //     this.total +=
  //       this.cartProducts[x].product.price * this.cartProducts[x].quantity;
  //   }
  // }
  // addAmount(index: number) {
  //   this.cartProducts[index].quantity++;
  //   this.getCartTotal();
  //   localStorage.setItem('cartProducts', JSON.stringify(this.cartProducts));

  // minusAmount(index: number) {
  //   if (this.cartProducts[index].quantity > 1) {
  //     // prevent negative quantities
  //     this.cartProducts[index].quantity--;
  //     this.getCartTotal();
  //     localStorage.setItem('cartProducts', JSON.stringify(this.cartProducts));
  //   }
  // }

  // detectChange() {
  //   this.cartProducts = this.cartProducts.map((item) => {
  //     if (item.quantity < 1) {
  //       item.quantity = 1; // reset to minimum valid quantity
  //     }
  //     return item;
  //   });
  //   this.getCartTotal();
  //   localStorage.setItem('cartProducts', JSON.stringify(this.cartProducts));
  // }
  // deleteProduct(index: number) {
  //   this.cartProducts.splice(index, 1);
  //   this.getCartTotal();
  //   localStorage.setItem('cartProducts', JSON.stringify(this.cartProducts));
  // }
  // clearCart() {
  //   this.cartProducts = [];
  //   this.getCartTotal();
  //   localStorage.setItem('cartProducts', JSON.stringify(this.cartProducts));
  // }
  // checkout() {

  //   //checkout logic
  // }
}
