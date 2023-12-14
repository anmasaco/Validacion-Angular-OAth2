import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavMenuComponent } from './shared/nav-menu/nav-menu.component';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { LoginComponent} from './login/login/login.component';
import { RecaptchaModule } from "ng-recaptcha";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { OAuthModule,OAuthService } from 'angular-oauth2-oidc';
import {initializeAuth} from './services/AuthService.service';
import { APP_INITIALIZER } from '@angular/core';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavMenuComponent,
    NavBarComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RecaptchaModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    OAuthModule.forRoot()
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: initializeAuth,
    deps: [OAuthService],
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
