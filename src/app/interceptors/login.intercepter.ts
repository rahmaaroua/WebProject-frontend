import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

//prendre req l'intercepter faire les changements puis la chainer pour continue son chemin
export class LoginInterceptor implements HttpInterceptor    {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token');
        console.log('Intercepted request:', req);

        if(token){

        
        const cloneReq = req.clone(
        {
            params: new HttpParams().set('access_token',token)
        }
    );
    return next.handle(cloneReq);

} else {
    return next.handle(req);

}
    }
}

export const LoginInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: LoginInterceptor,
    multi: true
}