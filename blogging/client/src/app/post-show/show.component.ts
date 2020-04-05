import { Component, OnInit } from '@angular/core';
import { ShowPostService } from './show.service';
import 'rxjs';
import { Post } from '../models/post.model';

@Component({
    selector: 'app-post-show',
    templateUrl: './show.component.html',
})
export class ShowPostComponent implements OnInit {

    public posts: any [];

    constructor(private showPostService: ShowPostService) {

    }

    ngOnInit() {
        this.getAllPost();
    }

    getAllPost(){
        this.showPostService.getAllPost().subscribe(result => {
            console.log(this.posts)
            this.posts = result['data'];
        });
    }

}