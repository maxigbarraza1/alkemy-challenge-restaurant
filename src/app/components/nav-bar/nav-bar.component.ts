import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.sass']
})
export class NavBarComponent implements OnInit {
  
  constructor(private readonly authService:AuthService,
              public router:Router) { }

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout();
  }

  navigateTo(route:string){
    this.router.navigate([route]);
  }

  isRouteActive(route:string){
    return this.router.url === route;
  }

}
