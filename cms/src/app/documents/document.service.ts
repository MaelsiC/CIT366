import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';
import 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  maxDocumentId: number;

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
    this.maxDocumentId = this.getMaxId();
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
  }

  getMaxId (): number {
    let maxId = 0;
    this.documents.forEach((document: Document) => {
        const currId = +document.id;
        if (currId > maxId) {
            maxId = currId;
        }
    });
    return maxId;
   }

   addDocument (newDoc: Document) {
    if (newDoc === undefined || newDoc === null) {
        return;
    }
    this.maxDocumentId++;
    newDoc.id = this.maxDocumentId.toString();
    this.documents.push(newDoc);
   }

   updateDocument(originalDoc: Document, newDoc: Document) {
    if (originalDoc === null || originalDoc === undefined || newDoc === null || newDoc === undefined) {
        return;
    }
    const pos = this.documents.indexOf(originalDoc);
    if (pos < 0) {
        return;
    }

    newDoc.id = originalDoc.id;
    this.documents[pos] = newDoc;
   }
}
