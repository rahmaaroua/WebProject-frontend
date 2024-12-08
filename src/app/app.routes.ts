import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
  

    
    
    { path: '', component: LoginComponent }, // Route par défaut
    { path: 'login', component: LoginComponent },
    {path:'profile' ,component: ProfileComponent}

  

  
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






];
