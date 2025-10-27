import { Injectable, Provider } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let isAuthAPI: boolean;

    // Identify if this is an auth API route (login or register)
    if (request.url.includes('/login') || request.url.includes('/register')) {
      isAuthAPI = true;
    } else {
      isAuthAPI = false;
    }

    // Only attach token if logged in and not an auth API call
    if (this.authenticationService.isLoggedIn() && !isAuthAPI) {
      const token = this.authenticationService.getToken();

      if (token) {
        // Clone the request and add the Authorization header
        const authReq = request.clone({
          setHeaders: { Authorization: `Bearer ${token}` }
        });

        return next.handle(authReq);
      }
    }

    // Otherwise, just pass the request along unchanged
    return next.handle(request);
  }
}

// Provide this interceptor globally
export const authInterceptProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: JwtInterceptor,
  multi: true
};
