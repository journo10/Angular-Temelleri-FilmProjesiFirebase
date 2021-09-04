import { catchError } from 'rxjs/operators';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

export class ErrorInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((response: HttpErrorResponse) => {
        let message = 'Hata oluştu';

        if (!navigator.onLine) {
          message = 'İnternet bağlantınızı kontrrol ediniz.';
          return throwError(message);
        }

        if (response.error.error) {
          if (response.status === 401) {
            message = 'Yetkiniz yok.';
            console.log(message);
            return throwError(message);
          }
        }

        if (response.error.error) {
          switch (response.error.error.message) {
            case 'EMAIL_EXISTS':
              message = 'Farklı bir email adresi ile kayıt olun.';
              break;
            case 'EMAIL_NOT_FOUND':
              message = 'Bu email adresi bulunamadı.';
              break;
            case 'INVALID_PASSWORD':
              message = 'Hatalı parola ile giriş yaptınız.';
              break;
          }
        }

        return throwError(message);
      })
    );
  }
}
