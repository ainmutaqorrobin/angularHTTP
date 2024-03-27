import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//use map in rxjs operators
import { map } from 'rxjs/operators';
import { Post } from './post.model';
import { PostService } from './post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isLoading: boolean = false;

  constructor(private http: HttpClient, private postService: PostService) {}

  ngOnInit() {
    this.isLoading = true;
    this.postService.fetchPost().subscribe((post) => {
      this.isLoading = false;
      this.loadedPosts = post;
    });
  }

  onCreatePost(postData: { title: string; content: string }) {
    this.postService.createPost(postData.title, postData.content);
  }

  onFetchPosts() {
    this.isLoading = true;
    this.postService.fetchPost().subscribe((post) => {
      this.isLoading = false;
      this.loadedPosts = post;
    });
  }

  onClearPosts() {
    // Send Http request
  }
}
