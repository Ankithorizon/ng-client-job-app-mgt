import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { ToastrModule } from 'ngx-toastr';

// components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FollowUpComponent } from './components/follow-up/follow-up.component';


// services

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FollowUpComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    FormsModule,    
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    ToastrModule.forRoot({
      timeOut: 5000, // 5 seconds
      closeButton: true,
      progressBar: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
