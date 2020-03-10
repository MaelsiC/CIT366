import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';
import 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  maxContactId: number;

  // REMOVED contactSelectedEvent = new EventEmitter<Contact>();
  contacts: Contact[] = [];
  // ADDED then REMOVED
  // contactChangedEvent = new EventEmitter<Contact[]>();

  // ADDED
  contactListChangedEvent = new Subject<Contact[]>();

  constructor(private http: HttpClient) {
    // this.contacts = MOCKCONTACTS;
    this.getContacts;
    this.maxContactId = this.getMaxId();
  }

  getContact(id: string): Contact {
    for (const contact of this.contacts) {
      if (contact.id === id) {
        return contact;
      }
    }
    return null;
  }

  //SUBSTITUTE
  // getContacts(): Contact[] {
  //   return this.contacts.slice();
  // }
  //WITH
  getContacts() {
    this.http.get('https://samplecms-f2b88.firebaseio.com/contacts.json')
      .subscribe((contacts: Contact[]) => {
        this.contacts = contacts;
        this.maxContactId = this.getMaxId();
        this.contacts.sort(this.compareContact);
        this.contactListChangedEvent.next(this.contacts.slice());
        console.log("here it is!");
      },

       (error: any) => {
          console.log(error);
        });
  }

  compareContact(currentcon: Contact, nextcon: Contact): number {
    if(currentcon.id < nextcon.id) {
      return -1;
    } else if (currentcon.id > nextcon.id) {
      return 1;
    } else {
      return 0;
    }
  }

  getMaxId(): number {
    let maxId = 0;
    this.contacts.forEach((contact: Contact) => {
      const currId = +contact.id;
      if (currId > maxId) {
        maxId = currId;
      }
    });
    return maxId;
  }


  deleteContact(contact: Contact) {
    // if (contact === null) {
    //     return;
    // }
    // const pos = this.contacts.indexOf(contact);
    // if (pos < 0) {
    //     return;
    // }
    // this.contacts.splice(pos, 1);

    if (contact === null) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    // this.contactListChangedEvent.next(this.contacts.slice());
    this.storeContacts();
  }

  addContact (newContact: Contact) {
    if (newContact === undefined || newContact === null) {
        return;
    }
    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    // const contactListClone = this.contacts.slice();
    // this.contactListChangedEvent.next(contactListClone);
    this.storeContacts();
   }

   updateContact(originalContact: Contact, newDoc: Contact) {
    if (originalContact === null || originalContact === undefined || newDoc === null || newDoc === undefined) {
        return;
    }
    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
        return;
    }

    newDoc.id = originalContact.id;
    this.contacts[pos] = newDoc;
    // const contactListClone = this.contacts.slice();
    // this.contactListChangedEvent.next(contactListClone);
    this.storeContacts();
   }

   storeContacts() {
    const cons = JSON.stringify(this.contacts);
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    this.http.put('https://samplecms-f2b88.firebaseio.com/contacts.json', cons, {
      headers: header
    }).subscribe(() => {
      this.contactListChangedEvent.next(this.contacts.slice());
    });
  }
}
