import { Component } from '@angular/core';
//import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
 
@Component({
  selector: 'app-register',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class RegisterComponent {
  name: string = '';
  contact:string='';
  email: string = '';
  password: string = '';

 
  constructor(private authService: AuthService, private router: Router) {}
 
  onSubmit() {
    console.log(this.name, this.contact,this.email,this.password);
    this.authService.register( this.name, this.contact,this.email, this.password).subscribe(response => {
      console.log(response);
      this.router.navigate(['/login']);
      alert('Account Created Successfully');
    }
    , error => {
      console.error('Signup failed', error);
          this.name = '';
          this.contact='';
          this.email='';
          this.password='';
          this.handleError(error);
    }
   );
  }

  private handleError(error: any): void {
    console.error('Error response:', error);
    if (error.status === 400) {
      alert(error.error?.message || 'Sign Up failed. Please try again.');
    } else {
      alert('SignUp failed User already exists with this email ID');
    }
  }
}