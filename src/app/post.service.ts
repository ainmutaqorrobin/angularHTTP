import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { map } from 'rxjs/operators';

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
      .subscribe((response) => {});
  }

  //send get Http request
  fetchPost() {
    return this.http
      .get<{ [key: string]: Post }>(
        'https://ng-backend-41e43-default-rtdb.firebaseio.com/posts.json'
      )
      .pipe(
        map((response) => {
          const postArray: Post[] = [];
          for (const key in response) {
            if (response.hasOwnProperty(key))
              postArray.push({ ...response[key], id: key });
          }
          return postArray;
        })
      );
  }

  clearPost() {
    return this.http.delete(
      'https://ng-backend-41e43-default-rtdb.firebaseio.com/posts.json'
    );
  }
}
