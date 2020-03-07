import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';
import 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

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

  constructor(private http: HttpClient) {
    // this.documents = MOCKDOCUMENTS;
    this.getDocuments();
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

  //REMOVE
  // getDocuments(): Document[] {
  //   return this.documents.slice();
  // }
  // SUBSTITUTE WITH
  getDocuments() {
    this.http.get('https://samplecms-f2b88.firebaseio.com/documents.json')
      .subscribe((documents: Document[]) => {
        this.documents = documents;
        this.maxDocumentId = this.getMaxId();
        this.documents.sort(this.compareDocument);
        this.documentListChangedEvent.next(this.documents.slice());
      },

       (error: any) => {
          console.log(error);
        });
  }

  compareDocument(currentdoc: Document, nextdoc: Document): number {
    if(currentdoc.id < nextdoc.id) {
      return -1;
    } else if (currentdoc.id > nextdoc.id) {
      return 1;
    } else {
      return 0;
    }
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
    // SUBSTITUTE
    // this.documentListChangedEvent.next(this.documents.slice());
    // WITH
    this.storeDocuments();
  }

  getMaxId(): number {
    let maxId = 0;
    this.documents.forEach((document: Document) => {
      const currId = +document.id;
      if (currId > maxId) {
        maxId = currId;
      }
    });
    return maxId;
  }

  addDocument(newDoc: Document) {
    if (newDoc === undefined || newDoc === null) {
      return;
    }
    this.maxDocumentId++;
    newDoc.id = this.maxDocumentId.toString();
    this.documents.push(newDoc);
    console.log('hello')
    // const documentListClone = this.documents.slice();
    // SUBSTITUTE
    // this.documentListChangedEvent.next(documentListClone);
    // WITH
    this.storeDocuments();
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
    // const documentListClone = this.documents.slice();
    // SUBSTITUTE
    // this.documentListChangedEvent.next(documentListClone);
    // WITH
    this.storeDocuments();
  }

  storeDocuments() {
    const docs = JSON.stringify(this.documents);
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    this.http.put('https://samplecms-f2b88.firebaseio.com/documents.json', docs, {
      headers: header
    }).subscribe(() => {
      this.documentListChangedEvent.next(this.documents.slice());
    });
  }
}
