import { Component,CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA} from '@angular/core';
import { Router } from '@angular/router';
import { Button } from 'primeng/button';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  schemas:[CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
})
export class HomeComponent {

  constructor(private router: Router) {}
  logOut(){
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

}
