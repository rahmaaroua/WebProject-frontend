import { Injectable } from '@angular/core'; // Importer Injectable
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({ // Ajout de l'annotation Injectable
  providedIn: 'root', // Fournit ce guard dans toute l'application
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router) {} // Injection du service Router

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = localStorage.getItem('token'); // Récupérer le token depuis localStorage

    if (!!token) {
      return true; // Autoriser l'accès si le token existe
    } else {
      this.router.navigate(['/login']); // Rediriger vers la page de connexion
      return false; // Bloquer l'accès
    }
  }
}
