import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { AppComponent } from './app.component';
import { LoginGuard } from './guard/login.guard';

export const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'register', component: RegisterComponent, /*canActivate:[LoginGuard]*/ },
];

  
  /*  {
        path:'' , 
        redirectTo:'login' , pathMatch:'full'//cette redirection ne se produira que si l'URL est exactement vide et ne contient aucun autre segment de chemin.
    },

    {
        path:'login', component:LoginComponent
    },

    /*{
        path:'', component:LayoutComponent,
        children:[
            {
                path:'dashboard',
                component: DashboardComponent
            }
        ]
    }*/







