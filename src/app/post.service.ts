import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './post.model';
//use map in rxjs operators
import { catchError, map } from 'rxjs/operators';
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
        postData
      )
      .subscribe();
  }

  //send get Http request
  fetchPost() {
    return this.http
      .get<{ [key: string]: Post }>(
        'https://ng-backend-41e43-default-rtdb.firebaseio.com/posts.json',
        {
          headers: new HttpHeaders({ 'Custom-Header': 'Robin header' }),
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
    return this.http.delete(
      'https://ng-backend-41e43-default-rtdb.firebaseio.com/posts.json'
    );
  }
}
