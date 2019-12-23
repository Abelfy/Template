import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { AuthGuard } from '../services/Guards/auth-gard.service';
import { HomeComponent } from '../components/home/home.component';

//{ path: '', redirectTo: '/login', pathMatch: 'full' },
const routes: Routes = [
  { path: '' , redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component : HomeComponent, canActivate : [AuthGuard]},
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash : true})],      // useHash sinon probleme au rafraichissemnt de page 
  exports: [RouterModule]
})
export class AppRoutingModule { }
