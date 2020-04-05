import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
// import { ShowPostComponent } from './post-show/show.component';

export const AppRoutes: Routes = [
    { path: '', component: LoginComponent, pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(AppRoutes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }