import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { HttpClientModule} from '@angular/common/http';  // Importation de HttpClientModule
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginInterceptorProvider } from './app/interceptors/login.intercepter';

bootstrapApplication(AppComponent, {
  providers: [
    LoginInterceptorProvider,
    provideRouter(routes),
    importProvidersFrom(HttpClientModule, FormsModule), // Importez le module HTTP

  ],
}).catch((err) => console.error(err));
