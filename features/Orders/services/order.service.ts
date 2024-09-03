import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Order } from '../models/order.model';
import { AddOrderRequest } from '../models/add-order-request.model';
import { UpdateOrderRequest } from '../models/update-order-request.model'
import { OrderItem } from '../models/orderItem.model';
import { OrderDto } from '../models/order-dto.model';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  userRole: string='';
  constructor(private http: HttpClient,private authService:AuthService) { }

  // addOrder(model: AddOrderRequest): Observable<any> {
  //   return this.http.post<void>(`${environment.apiBaseUrl}/api/Orders`, model);
  // }

  getAllOrders(): Observable<Order[]> {
    var headers= this.authService.getAuthHeaders();
    return this.http.get<Order[]>(`${environment.apiBaseUrl}/api/Orders`,{headers});
  }

  getOrderById(id: string): Observable<Order> {
    return this.http.get<Order>(`${environment.apiBaseUrl}/api/Orders/${id}`);
  }
  // getOrderById(): Observable<Order> {
  //   return this.http.get<Order>(`${environment.apiBaseUrl}/api/Orders/userId`);
  // }

  updateOrder(id: number, updateOrderRequest: UpdateOrderRequest): Observable<Order> {
    return this.http.put<Order>(`${environment.apiBaseUrl}/api/Orders/${id}`, updateOrderRequest);
  }

  deleteOrder(id: number): Observable<Order> {
    return this.http.delete<Order>(`${environment.apiBaseUrl}/api/Orders/${id}`);
  }

  validateOrder(id: number): Observable<any> {
    return this.http.post<void>(`${environment.apiBaseUrl}/api/Orders/${id}/validate`, {});
  }

  getSalesReport(startDate: Date, endDate: Date): Observable<any> {
    return this.http.get<any>(`${environment.apiBaseUrl}/api/Orders/salesreport?startDate=${startDate}&endDate=${endDate}`);
  }

  getOrderItemsByUserId(id: string): Observable<OrderItem[]> {
    return this.http.get<OrderItem[]>(`${environment.apiBaseUrl}/api/Orders/${id}`);
  }

  getOrderByUserId(): Observable<Order[]>{
    return this.http.get<Order[]>(`${environment.apiBaseUrl}/api/Orders/userId`);
  }

  // cancelOrder(orderId: number): Observable<void> {
  //   return this.http.put<void>(`${this.baseUrl}/cancel/${orderId}`, {});
  // }

  // addOrder(orderRequest: AddOrderRequest): Observable<any> {
  //   return this.http.post(`${environment.apiBaseUrl}/api/Orders`, orderRequest);
  // }

  addOrder(orderRequest: AddOrderRequest): Observable<any> {
    const headers = this.authService.getAuthHeaders();
    console.log(orderRequest);
    
    return this.http.post<AddOrderRequest>(`${environment.apiBaseUrl}/api/Orders`, 
      orderRequest,{headers}
    )
    // .
    // pipe
    // (        
    // catchError
    // (this.handleError) );
  }


  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Unknown error occurred';
  
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else if (error.error && typeof error.error === 'string') {
      // Backend returned a string error message
      errorMessage = `Error: ${error.error}`;
    } else if (error.error && typeof error.error === 'object') {
      // Backend returned an object error message
      errorMessage = `Error: ${error.error.message || JSON.stringify(error.error)}`;
    } else {
      // Log the entire error for more details
      errorMessage = `Error: ${JSON.stringify(error)}`;
    }
    
    console.error(errorMessage);
    return throwError(errorMessage);
  }
  

  // private handleError(error: HttpErrorResponse): Observable<never> {
  //   let errorMessage = 'Unknown error occurred';
  //   if (error.error instanceof ErrorEvent) {
  //     // Client-side error
  //     errorMessage = `Error: ${error.error.message}`;
  //   } else if (error.error && typeof error.error === 'string') {
  //     // Backend returned a string error message
  //     errorMessage = `Error: ${error.error}`;
  //   } else if (error.error && typeof error.error === 'object') {
  //     // Backend returned an object error message
  //     errorMessage = `Error: ${error.error.message}`;
  //   } else {
  //     // Log the entire error for more details
  //     errorMessage = `Error: ${JSON.stringify(error)}`;
  //   }
  //   console.error(errorMessage);
  //   return throwError(errorMessage);
  // }
  

  


}
