import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post.model';

@Injectable()
export class ShowPostService {

    posts: Post[] = [];

    constructor(private http: HttpClient) {

    }

    getAllPost() {
        return this.http.post('/api/post/getAllPost', {})
    }

    // getAllPosts(id: string): Post {
    //     for (const post of this.posts) {
    //         if (post.id === id) {
    //             return post;
    //         }
    //     }
    //     return null;
    // }

    // getAllPost() {
    //     this
    //         .http
    //         .get<{ message: string, posts: Post[] }>('http://localhost:3000/post')
    //         .subscribe((response: any) => {
    //             this.posts = response.posts;
    //         }, (err: any) => {
    //             console.error(err);
    //         });
    // }

}