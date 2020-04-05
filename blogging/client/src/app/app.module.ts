import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RootComponent } from './root/root.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ShowPostComponent } from './post-show/show.component';

import { LoginService } from './login/login.service';
import { ShowPostService } from './post-show/show.service';


@NgModule({
  declarations: [
  	RootComponent,
    LoginComponent,
    HomeComponent,
    ShowPostComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [LoginService, ShowPostService],
  bootstrap: [RootComponent]
})
export class AppModule { }