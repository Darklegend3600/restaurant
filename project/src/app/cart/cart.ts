import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CartService } from './cart-service';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart implements OnInit {
  private cartService = inject(CartService);

  basketItems: any[] = [];
  originalItems: any[] = [];
  total: number = 0;
  isLoading: boolean = false;

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.isLoading = true;
    this.cartService.getBasket().subscribe({
      next: (data: any) => {
        this.originalItems = data;
        this.basketItems = this.groupItems(data);
        this.calculateTotal();
        this.isLoading = false;
      },
      error: (error) => {
        console.error(error);
        this.basketItems = [];
        this.originalItems = [];
        this.total = 0;
        this.isLoading = false;
      }
    });
  }

  groupItems(items: any[]): any[] {
    const grouped = items.reduce((acc, item) => {
      const key = item.product?.id || item.productId || item.id;
      if (!acc[key]) {
        acc[key] = { ...item, quantity: 0 };
      }
      acc[key].quantity += item.quantity || 1;
      return acc;
    }, {});
    return Object.values(grouped);
  }

  calculateTotal() {
    this.total = this.basketItems.reduce((sum, item) => {
      const quantity = item.quantity || 1;
      const price = item.product?.price || item.price;
      return sum + (price * quantity);
    }, 0);
  }

  removeFromBasket(productId: number, button: any) {
    const groupedItem = this.basketItems.find(item => (item.product?.id || item.productId || item.id) === productId);
    if (groupedItem && groupedItem.quantity > 1) {
      button.disabled = true;
      button.textContent = 'Updating...';
      const newQuantity = groupedItem.quantity - 1;
      const updateObject = {
        quantity: newQuantity,
        price: groupedItem.product?.price || groupedItem.price,
        productId: productId
      };
      this.cartService.putBasket(updateObject).subscribe({
        next: () => {
          this.loadCart();
        },
        error: (error) => {
          console.error(error);
          alert('Failed to update item');
          button.disabled = false;
          button.textContent = 'Remove';
        }
      });
    } else {
      button.disabled = true;
      button.textContent = 'Removing...';
      this.cartService.deleteBasket(productId).subscribe({
        next: () => {
          this.loadCart();
        },
        error: (error) => {
          console.error(error);
          alert('Failed to remove item');
          button.disabled = false;
          button.textContent = 'Remove';
        }
      });
    }
  }

  clearCart() {
    if (this.basketItems.length === 0) return;
    if (!confirm('Are you sure you want to empty your cart?')) return;

    const deletePromises = this.basketItems.map(item => 
      this.cartService.deleteBasket(item.product?.id || item.productId || item.id).toPromise()
    );

    Promise.all(deletePromises).then(() => {
      this.loadCart();
    }).catch(error => {
      console.error(error);
      alert('Failed to clear cart');
      this.loadCart();
    });
  }
}
