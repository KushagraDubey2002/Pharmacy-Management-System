import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { supplier } from '../models/supplier.model';
import { environment } from 'src/environments/environment.development';
import { AddSupplierRequest } from '../models/add-supplier-request.model';
import { UpdateSupplierRequest } from '../models/update-supplier-request.model';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private http: HttpClient, private authService:AuthService) { }

  addSupplier(model: AddSupplierRequest): Observable<any>{
    const headers = this.authService.getAuthHeaders();
    return this.http.post(`${environment.apiBaseUrl}/api/Suppliers`, model,{headers});
  }

  getAllSuppliers(): Observable<supplier[]>{
    const headers = this.authService.getAuthHeaders();
    return this.http.get<supplier[]>(`${environment.apiBaseUrl}/api/Suppliers`,{headers});//('https://localhost:7104/api/Suppliers');//(`${environment.apiBaseUrl}/api/Suppliers`);
  }

  getSupplierById(id: string): Observable<supplier>{
    const headers = this.authService.getAuthHeaders();
    return this.http.get<supplier>(`${environment.apiBaseUrl}/api/Suppliers/${id}`,{headers});
  }

  updateSupplier(id: string, updateSupplierRequest: UpdateSupplierRequest):
  Observable<supplier>{
    const headers = this.authService.getAuthHeaders();
    return this.http.put<supplier>(`${environment.apiBaseUrl}/api/Suppliers/${id}`,updateSupplierRequest,{headers});
  }

  deleteSupplier(id: string): Observable<supplier>{
    const headers = this.authService.getAuthHeaders();
    return this.http.delete<supplier>(`${environment.apiBaseUrl}/api/Suppliers/${id}`,{headers});
  }
}
