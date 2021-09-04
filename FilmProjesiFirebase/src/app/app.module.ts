import { CategoriesModule } from './category/categories.module';
import { MoviesModule } from './movies/movies.module';
import { AlertifyService } from './services/alertify.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TemplateFormsComponent } from './template-forms/template-forms.component';
import { ReactiveFormsComponent } from './reactive-forms/reactive-forms.component';
import { ErrorInterceptor } from './services/error.interceptor';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/alert/shared.module';

@NgModule({
  declarations: [
    //Component Bölümü
    AppComponent,
    NavbarComponent,
    FooterComponent,
    TemplateFormsComponent,
    ReactiveFormsComponent,
  
  ],
  imports: [
    //Modul Bölümü
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
    CategoriesModule
  ],
  providers: [
    AlertifyService,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ], //Service Bölümü
  bootstrap: [AppComponent], //Başlangıç Componenti Bölümü
})
export class AppModule {}
