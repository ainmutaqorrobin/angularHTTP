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
  loadedPosts: Post[] = [];
  isLoading: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPost();
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    console.log(postData);
    this.http
      .post<{ name: String }>(
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
    this.isLoading = true;
    this.http
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
      )
      .subscribe((response) => {
        this.isLoading = false;
        this.loadedPosts = response;
      });
  }
}
