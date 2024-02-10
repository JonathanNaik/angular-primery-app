import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
   },
   {
    path:'register',
    component: RegisterComponent
   },
   {
    path:'home',
    component: HomeComponent,
    canActivate:[authGuard]
   },
   {
    path: '', redirectTo: 'home', pathMatch: 'full'
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppRoutingModule { }