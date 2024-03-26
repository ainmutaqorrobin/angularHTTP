import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//use map in rxjs operators
import { map } from 'rxjs/operators';
import { Post } from './post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPost();
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    console.log(postData);
    this.http
      .post(
        'https://ng-backend-41e43-default-rtdb.firebaseio.com/posts.json',
        postData
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  onFetchPosts() {
    this.fetchPost();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPost() {
    this.http
      .get('https://ng-backend-41e43-default-rtdb.firebaseio.com/posts.json')
      .pipe(
        map((response: { [key: string]: Post }) => {
          const postArray: Post[] = [];
          for (const key in response) {
            if (response.hasOwnProperty(key))
              postArray.push({ ...response[key], id: key });
          }
          return postArray;
        })
      )
      .subscribe((response) => {
        console.log(response);
      });
  }
}
