import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';
import 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  // new subject object
  documentListChangedEvent = new Subject<Document[]>();

  // REMOVE
  // documentSelectedEvent = new EventEmitter<Document>();
  // // 
  documents: Document[] = [];

  // -ADD- // then substitute this for subject
  // documentChangedEvent = new EventEmitter<Document[]>();
  // //

  constructor() {
    this.documents = MOCKDOCUMENTS;
  }

  getDocument(id: string): Document {
    for (const document of this.documents) {
      if (document.id === id) {
        return document;
      }
    }
    return null;
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  deleteDocument(document: Document) {
    //REMOVED
    //   if (document === null) {
    //       return;
    //   }
    //   const pos = this.documents.indexOf(document);
    //   if (pos < 0) {
    //       return;
    //   }
    //   this.documents.splice(pos, 1);
    //   this.documentChangedEvent.emit(this.documents.slice());
    //  }
    // //

    if (document === null || document === undefined) {
      return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }
    this.documents.splice(pos, 1);
    this.storeDocuments();
  }
}
