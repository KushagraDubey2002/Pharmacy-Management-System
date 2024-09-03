import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../features/auth/auth.service';
import { CartService } from '../features/drugsInventory/services/cart.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  constructor(public authService: AuthService,private router: Router, public cartService: CartService ) { }
  isLog:boolean = false;
  userRole: string= '';
  totalItems: number = this.cartService.totalItemms;
  ngOnInit(): void {
    this.isLog = this.authService.isLoggedIn();
    this.userRole = this.authService.getRole();
  }

  goHome(){
    this.router.navigate(['/']);
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  
}
