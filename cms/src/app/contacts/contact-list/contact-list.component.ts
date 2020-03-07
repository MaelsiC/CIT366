import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  term: string = '';
  subscription: Subscription;
  contacts: Contact[] = [];

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    // this.contacts = this.contactService.getContacts();
    // this.contactService.contactChangedEvent.subscribe((contacts: Contact[]) => {
    //   this.contacts = contacts;
    // });
    // this.contacts = this.contactService.getContacts();
    // console.log(this.contacts);

    this.contactService.getContacts();
    this.subscription = this.contactService.contactListChangedEvent
    .subscribe((contacts: Contact[]) => {
      console.log(contacts)
      this.contacts = contacts;
    });
  }

  // REMOVE
  // onSelected(contact: Contact) {
  //   this.contactService.contactChangedEvent.emit(this.contacts);
  //  }

  // //

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onKeyPress(value: string) {
    this.term = value;
  }

}
