import { NgModule } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import localeFrExtra from '@angular/common/locales/extra/fr';

import { AppRoutingModule } from './core/app-routing.module';
import { CustomMaterialModule } from './core/material.module';

import { BrowserModule } from '@angular/platform-browser';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavigationComponent } from './components/navigation/navigation.component';

import { AuthGuard } from './services/Guards/auth-gard.service';
import { AuthInterceptor } from './interceptors/AuthInterceptor';
import { ErrorInterceptor } from './interceptors/ErrorInterceptor';
import { AuthentificationService } from './services/authentification.service';

import { UtilisateurService } from './services/utilisateur.service';
import { HomeComponent } from './components/home/home.component';


registerLocaleData(localeFr, 'fr-FR', localeFrExtra);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavigationComponent,
    HomeComponent
    ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    ReactiveFormsModule
    ],
  providers: [
    AuthGuard,
    AuthentificationService,
    UtilisateurService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    /*{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }*/
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
