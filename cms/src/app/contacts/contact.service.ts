import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';
import 'rxjs';
import 'rxjs/Rx';
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
    // this.http.get('http://localhost:3000/contacts')
    //   .subscribe((contacts: Contact[]) => {
    //     this.contacts = contacts;
    //     this.maxContactId = this.getMaxId();
    //     this.contacts.sort(this.compareContact);
    //     this.contactListChangedEvent.next(this.contacts.slice());
    //     console.log("here it is!");
    //   },

    //    (error: any) => {
    //       console.log(error);
    //     });
    this
      .http
      .get<{ message: string, contacts: Contact[] }>('http://localhost:3000/contacts')
      .subscribe((response: any) => {
        this.contacts = response.contacts;
        this.contacts.sort(this.compareContact);
        this.contactListChangedEvent.next(this.contacts.slice());
      }, (err: any) => {
        console.error(err);
      });
  }

  compareContact(currentcon: Contact, nextcon: Contact): number {
    if (currentcon.id < nextcon.id) {
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

    // REPLACED
    // if (contact === null) {
    //   return;
    // }
    // const pos = this.contacts.indexOf(contact);
    // if (pos < 0) {
    //   return;
    // }
    // this.contacts.splice(pos, 1);
    // // this.contactListChangedEvent.next(this.contacts.slice());
    // this.storeContacts();
    // WITH
    if (!contact) {
      return;
    }

    this.http.delete('http://localhost:3000/documents/' + contact.id)
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
          this.contactListChangedEvent.next(this.contacts.slice());
        }
      );
  }

  // REPLACED
  // addContact (newContact: Contact) {
  //   if (newContact === undefined || newContact === null) {
  //       return;
  //   }
  //   this.maxContactId++;
  //   newContact.id = this.maxContactId.toString();
  //   this.contacts.push(newContact);
  //   // const contactListClone = this.contacts.slice();
  //   // this.contactListChangedEvent.next(contactListClone);
  //   this.storeContacts();
  //  }

  //  updateContact(originalContact: Contact, newDoc: Contact) {
  //   if (originalContact === null || originalContact === undefined || newDoc === null || newDoc === undefined) {
  //       return;
  //   }
  //   const pos = this.contacts.indexOf(originalContact);
  //   if (pos < 0) {
  //       return;
  //   }

  //   newDoc.id = originalContact.id;
  //   this.contacts[pos] = newDoc;
  //   // const contactListClone = this.contacts.slice();
  //   // this.contactListChangedEvent.next(contactListClone);
  //   this.storeContacts();
  //  }
  // WITH
  addContact(contact: Contact) {
    if (!contact) {
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    contact.id = '';
    const strContact = JSON.stringify(contact);

    // this.http.post('http://localhost:3000/documents', strContact, {headers: headers})
    //   .subscribe(
    //     (contacts: Contact[]) => {
    //       this.contacts = contacts;
    //       this.contactListChangedEvent.next(this.contacts.slice());
    //     }
    //   );
    this.http
      .post<{ message: string, contact: Contact }>('http://localhost:3000/contacts', strContact, { headers: headers })
      .subscribe((response: any) => {
        this.contacts.push(response.contact);
        this.contacts.sort(this.compareContact);
        this.contactListChangedEvent.next(this.contacts.slice());
      });
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }

    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    newContact.id = originalContact.id;

    this.http.put('http://localhost:3000/documents/' + originalContact.id, newContact, { headers: headers })
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
          this.contactListChangedEvent.next(this.contacts.slice());
        }
      );
    // this.http
    // .put<{message: string}>(`http://localhost:3000/contacts/${originalContact.id}`, strContact, {headers: headers})
    // .subscribe((Response: any) => {
    //   this.getContacts();
    // });
  }

  storeContacts() {
    // const cons = JSON.stringify(this.contacts);
    // const header = new HttpHeaders({'Content-Type': 'application/json'});
    // this.http.put('https://samplecms-f2b88.firebaseio.com/contacts.json', cons, {
    //   headers: header
    // }).subscribe(() => {
    //   this.contactListChangedEvent.next(this.contacts.slice());
    // });
    const json = JSON.stringify(this.contacts);
    const header = new HttpHeaders();
    header.set('Content-Type', 'application/json');
    this
      .http
      .put<{ message: string }>('http://localhost:3000/contacts', json, {
        headers: header
      }).subscribe(() => {
        this.contactListChangedEvent.next(this.contacts.slice());
      });
  }
}
