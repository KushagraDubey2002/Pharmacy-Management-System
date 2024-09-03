import { Injectable } from '@angular/core';
import { AddDrugRequest } from '../models/add-drug-request.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { drug } from '../models/drug.model';
import { environment } from 'src/environments/environment.development';
import { UpdateDrugRequest } from '../models/update-drug-request.model';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DrugService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  addDrug(model: AddDrugRequest): Observable<any> {
    const headers = this.authService.getAuthHeaders();
    return this.http.post<void>(`${environment.apiBaseUrl}/api/Drugs`,model, { headers });
  }

  getAllDrugs(): Observable<drug[]> {
    return this.http.get<drug[]>(`${environment.apiBaseUrl}/api/Drugs`);
  }

  getDrugById(id: string): Observable<drug> {
    return this.http.get<drug>(`${environment.apiBaseUrl}/api/Drugs/${id}`);
  }

  updateDrug(id: string, updateDrugRequest:UpdateDrugRequest):
  Observable<drug>{
    const headers = this.authService.getAuthHeaders();
    return this.http.put<drug>(`${environment.apiBaseUrl}/api/Drugs/${id}`,updateDrugRequest, { headers } );
  }

  deleteDrug(id: string): Observable<drug> {
    const headers = this.authService.getAuthHeaders();
    return this.http.delete<drug>(`${environment.apiBaseUrl}/api/Drugs/${id}`, { headers });
  }
}
