import { Component, ElementRef, OnInit } from '@angular/core';
import { AddPostService } from './add-post.service';
import { Post } from '../models/post.model';
import { CommonService } from '../service/common.service';

@Component({
    selector: 'app-add-post',
    templateUrl: './add-post.component.html',
    providers: [AddPostService]
})
export class AddPostComponent implements OnInit {

    closeBtn: ElementRef;
    public post: Post;

    constructor(private addPostService: AddPostService, private commonService: CommonService) {
        this.post = new Post();
    }

    ngOnInit() {
        this.commonService.postEdit_Observable.subscribe(() => {
            this.post = this.commonService.post_to_be_edited;
            console.log('post is ', this.post._id);
        });
    }

    addPost() {
        if (this.post.title && this.post.description) {
            if (this.post._id) {
                this.addPostService.updatePost(this.post).subscribe(() => {
                    this.closeBtn.nativeElement.click();
                    this.commonService.notifyPostAddition();
                });
            } else {
                this.addPostService.addPost(this.post).subscribe(() => {
                    this.closeBtn.nativeElement.click();
                    this.commonService.notifyPostAddition();
                });
            }
        } else {
            alert('Title and Description required');
        }
    }

}