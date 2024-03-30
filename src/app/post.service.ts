import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './post.model';
//use map in rxjs operators
import { catchError, map, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostService {
  constructor(private http: HttpClient) {}

  // Send post Http request
  createPost(title: string, content: string) {
    const postData: Post = { title: title, content: content };
    this.http
      .post<{ name: String }>(
        'https://ng-backend-41e43-default-rtdb.firebaseio.com/posts.json',
        postData,
        {
          observe: 'response',
        }
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  //send get Http request
  fetchPost() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('custom', 'keymark');

    return this.http
      .get<{ [key: string]: Post }>(
        'https://ng-backend-41e43-default-rtdb.firebaseio.com/posts.json',
        {
          headers: new HttpHeaders({ 'Custom-Header': 'Robin header' }),
          params: searchParams,
        }
      )
      .pipe(
        map((response) => {
          const postArray: Post[] = [];
          for (const key in response) {
            if (response.hasOwnProperty(key))
              postArray.push({ ...response[key], id: key });
          }
          return postArray;
        }),
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  clearPost() {
    return this.http
      .delete(
        'https://ng-backend-41e43-default-rtdb.firebaseio.com/posts.json',
        {
          observe: 'events',
        }
      )
      .pipe(
        tap((events) => {
          console.log(events);
        })
      );
  }
}
