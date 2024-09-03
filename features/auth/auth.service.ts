import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { environment } from 'src/environments/environment.development';
//import { LoginResponse, RegisterResponse, User } from '../interfaces/user';
//import { User, LoginResponse, RegisterResponse } from '../interfaces/user';
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string="" ;
  // private baseUrl = `https://localhost:7104/api/Account/`;  // Replace with your backend API base URL
  private baseUrl = `http://localhost:5024/api/Account/`;
 
  constructor(private http: HttpClient, private router: Router) {}
 
  // login(email: string, password: string): Observable<LoginResponse> {
  //   return this.http.post<any>(`${this.baseUrl}/users/login`, { email, password })
  //     .pipe(
  //       map(response => {
  //         this.token = response.token;
  //         localStorage.setItem('token', this.token);
  //         return response;
  //       }),
  //       catchError(this.handleError<any>('login'))
  //     );
  // }
  login(email: string, password: string): Observable<any> {
    return this.http.post<{token:string}>(`${this.baseUrl}login`, {
      "emailId": email,
      "password": password,
    });
  }
 
  register(name:string,contact:string, email: string, password: string):Observable<any> {
    console.log(name,contact);
    return this.http.post<{message:string}>(`${this.baseUrl}SignUp`, 
     
      {
        "userId":0,
        "name": name + "",
        "contact": contact+"",
        "email": email +"",
        "password": password +"",
        "role": "user"
      }
      // {
      //   "userId": 0,
      //   "name": "Kushagra",
      //   "contact": "7600740442",
      //   "email": "manish9709110443@gmail.com",
      //   "password": "Password",
      //   "role": "string"
      // }
      
     
    );
  }
 
  saveToken(token: string) {
    localStorage.setItem('token', token);
  }
 
  logout() {
    // this.token = "";
    // localStorage.removeItem('token');
    // this.router.navigate(['/login']);
    console.log('logout');
    
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }
 
  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }
 
  isAdmin(): boolean {
    // Implement role check based on the token
    return this.isLoggedIn() && this.getRole() === 'Admin';
  }
 
  getRole(): string {
    const token = this.getToken();
    if (!token) return '';
 
    try {
      const decoded: any = jwtDecode(token);
      const roles: string[] = decoded['role'];
      return roles.includes('Admin') ? 'Admin' : roles[0];  // Assuming the first role or Admin
    } catch (error) {
      console.error('Invalid token', error);
      return '';
    }
  }

  getUserId(): string {
    const token = this.getToken();
    if (!token) return '';

    try {
      const decoded: any = jwtDecode(token);
      return decoded['userId'];
    } catch (error) {
      console.error('Invalid token', error);
      return '';
    }
  }

  
 
  getToken(): string | null {
    return localStorage.getItem('token');
  }
 
  getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`
    });
  }
 
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}