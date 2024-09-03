import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
 
  constructor(private authService: AuthService, private router: Router) {}
 
  onSubmit() {
 
    this.authService.login(this.email, this.password).subscribe((data) => {
      console.log(data);
      localStorage.setItem("token", data.token);
      this.router.navigate(['/Home']);
      
      alert('Log In Succesfull');
    },
    error => {
      this.handleError(error);
    }
    
  )
  }

  private handleError(error: any): void {
    console.error('Error response:', error);
    if (error.status === 401) {
      alert(error.error?.message || 'Invalid credentials. Please try again.');
    } else {
      alert('Invalid credentials. Please try again.');
    }
  }
 
}
 
