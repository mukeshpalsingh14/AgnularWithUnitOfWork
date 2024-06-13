import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { AuthGuard } from './auth.guard';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  // { path: 'products', component: ProductListComponent },
  // { path: 'product/new', component: ProductFormComponent },
  // { path: 'product/edit/:id', component: ProductFormComponent },
  { path: 'products', component: ProductListComponent, canActivate: [AuthGuard] },
  { path: 'product/new', component: ProductFormComponent, canActivate: [AuthGuard] },
  { path: 'product/edit/:id', component: ProductFormComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
