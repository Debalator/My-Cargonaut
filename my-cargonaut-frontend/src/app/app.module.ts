import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const appRoutes: Routes = [
  {path: '', component: LoginPageComponent},
  {path: 'register', component: RegisterPageComponent},
]

@NgModule({
  declarations: [AppComponent, LoginPageComponent, RegisterPageComponent],
  imports: [
    BrowserModule, 
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule, 
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}