import {
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export class AuthInterceptorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log(`Request is on its way`);
    console.log(req.url);

    const modifiedHeader = req.clone({
      headers: req.headers.append('Auth', 'robin interceptor header'),
    });

    return next.handle(modifiedHeader).pipe(
      tap((event) => {
        console.log(event);

        if (event.type === HttpEventType.Response) {
          console.log(`response arrived`);
          console.log(event.body);
        }
      })
    );
  }
}
