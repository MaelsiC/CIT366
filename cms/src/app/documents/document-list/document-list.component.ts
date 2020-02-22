import { Component, OnInit, OnDestroy } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  subscription: Subscription;

  documents: Document[] = [];

  constructor(private documentService: DocumentService) { }

  ngOnInit() {
    // this.documents = this.documentService.getDocuments();
    //CHANGED
    // this.documentService.documentChangedEvent.subscribe((documents: Document[]) => { 
    //   this.documents = documents; }); 
    //   this.documents = this.documentService.getDocuments();
    // //
    this.documents = this.documentService.getDocuments();
     this.subscription = this.documentService.documentListChangedEvent
      .subscribe((documents: Document[]) => {
        this.documents = documents;
      });
  }

  // REMOVE
  // onSelectedDocument(document: Document) {
  //   this.documentService.documentSelectedEvent.emit(document);
  // }
  // //

  ngOnDestroy() {
    this.subscription.unsubscribe();
   }

}
