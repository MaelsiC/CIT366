import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';
import 'rxjs';

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

  constructor() {
    this.contacts = MOCKCONTACTS;
  }

  getContact(id: string): Contact {
    for (const contact of this.contacts) {
      if (contact.id === id) {
        return contact;
      }
    }
    return null;
  }

  getContacts(): Contact[] {
    return this.contacts.slice();
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
    // this.contactListChangedEvent.emit(this.contacts.slice());

    if (contact === null) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
  }

  addContact (newContact: Contact) {
    if (newContact === undefined || newContact === null) {
        return;
    }
    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
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
   }
}
