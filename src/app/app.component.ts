import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  error = null;

  constructor(private http: HttpClient, private postService: PostService) {}

  ngOnInit() {
    this.isLoading = true;
    this.postService.fetchPost().subscribe(
      (post) => {
        this.isLoading = false;
        this.loadedPosts = post;
        this.error = null;
      },
      (error) => {
        this.error = error.message;
        this.isLoading = false;
      }
    );
  }

  onCreatePost(postData: { title: string; content: string }) {
    this.postService.createPost(postData.title, postData.content);
  }

  onFetchPosts() {
    this.isLoading = true;
    this.postService.fetchPost().subscribe(
      (post) => {
        this.isLoading = false;
        this.loadedPosts = post;
        this.error = null;
      },
      (error) => {
        console.log(error);

        this.error = error.message;
        this.isLoading = false;
      }
    );
  }

  onClearPosts() {
    this.postService.clearPost().subscribe((resp) => {
      this.loadedPosts = [];
    });
  }
}
