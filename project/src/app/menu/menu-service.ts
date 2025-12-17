import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  
  private http = inject(HttpClient)

  getProducts(){
    return this.http.get('https://restaurant.stepprojects.ge/api/Products/GetAll')
      .pipe(
        catchError(() => {
          return throwError(() => new Error('Failed to Load Products'))
        })
      )
  }

  getFilteredProducts(params: any){
    let queryParams = new URLSearchParams()
    if (params.vegetarian !== "") queryParams.append("vegeterian", params.vegetarian)
    if (params.nuts !== "") queryParams.append("nuts", params.nuts)
    if (params.spiciness !== "") queryParams.append("spiciness", params.spiciness.toString())

    return this.http.get(`https://restaurant.stepprojects.ge/api/Products/GetFiltered?${queryParams.toString()}`)
      .pipe(
        catchError(() => {
          return throwError(() => new Error('Failed to Filter Products'))
        })
      )
  }

  getBasket(){
    return this.http.get('https://restaurant.stepprojects.ge/api/Baskets/GetAll')
      .pipe(
        catchError(() => {
          return throwError(() => new Error('Failed to Load Basket'))
        })
      )
  }

  putBasket(objectToUpdate: any){
    return this.http.put('https://restaurant.stepprojects.ge/api/Baskets/UpdateBasket', objectToUpdate)
      .pipe(
        catchError(() => {
          return throwError(() => new Error('Failed to Update Basket'))
        })
      )
  }

  addToBasket(objectToPost: any){
    return this.http.post('https://restaurant.stepprojects.ge/api/Baskets/AddToBasket', objectToPost)
      .pipe(
        catchError(() => {
          return throwError(() => new Error('Failed to Add to Basket'))
        })
      )
  }
}
