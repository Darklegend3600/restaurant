import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuService } from './menu-service';

@Component({
  selector: 'app-menu',
  imports: [CommonModule, FormsModule],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu implements OnInit{
  private menuService = inject(MenuService)

  products: any[] = []
  vegetarianFilter: string = ''
  nutsFilter: string = ''
  spicinessFilter: string = ''

  ngOnInit(): void {
    this.showProducts()
  }

  showProducts(){
    this.menuService.getProducts().subscribe({
      next: (data: any) => {
        this.products = data
      },
      error: (error) => {
        console.error(error)
        this.products = []
      }
    })
  }

  filterProducts(){
    let spiciness = parseInt(this.spicinessFilter)
    if (this.spicinessFilter && (isNaN(spiciness) || spiciness < 0 || spiciness > 4)) {
      alert("Spiciness must be between 0 and 4")
      return
    }

    let params = {
      vegetarian: this.vegetarianFilter,
      nuts: this.nutsFilter,
      spiciness: this.spicinessFilter ? spiciness : ''
    }

    this.menuService.getFilteredProducts(params).subscribe({
      next: (data: any) => {
        this.products = data
      },
      error: (error) => {
        console.error(error)
        this.products = []
      }
    })
  }

  addToCart(product: any, quantity: number, button: any){
    if (isNaN(quantity) || quantity <= 0) {
      alert("Please enter a valid quantity")
      return
    }

    button.disabled = true
    button.textContent = "Adding..."


    this.menuService.getBasket().subscribe({
      next: (basket: any) => {
        const existingItem = basket.find((item: any) => item.productId === product.id);
        if (existingItem) {

          const newQuantity = existingItem.quantity + quantity;
          const updateObject = {
            quantity: newQuantity,
            price: product.price,
            productId: product.id
          };
          this.menuService.putBasket(updateObject).subscribe({
            next: () => {
              button.textContent = "Added!"
              setTimeout(() => {
                button.textContent = "Add to Cart"
                button.disabled = false
              }, 2000)
            },
            error: (error: any) => {
              console.error(error)
              button.textContent = "Failed"
              setTimeout(() => {
                button.textContent = "Add to Cart"
                button.disabled = false
              }, 2000)
              alert("Failed to update item in cart")
            }
          });
        } else {

          let addObject = {
            quantity: quantity,
            productId: product.id
          }
          this.menuService.addToBasket(addObject).subscribe({
            next: (data: any) => {
              button.textContent = "Added!"
              setTimeout(() => {
                button.textContent = "Add to Cart"
                button.disabled = false
              }, 2000)
            },
            error: (error: any) => {
              console.error(error)
              button.textContent = "Failed"
              setTimeout(() => {
                button.textContent = "Add to Cart"
                button.disabled = false
              }, 2000)
              alert("Failed to add item to cart")
            }
          });
        }
      },
      error: (error: any) => {
        console.error(error)
        button.textContent = "Failed"
        setTimeout(() => {
          button.textContent = "Add to Cart"
          button.disabled = false
        }, 2000)
        alert("Failed to check cart")
      }
    });
  }
}
