import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Contact } from '../contact.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {

  contact: Contact = null;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  hasGroup: boolean = false;
  originalContact: Contact;
  invalidGroupContact: boolean = false;

  constructor(private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];

      if (id === undefined || id === null) {
        this.editMode = false;
        return;
      }
      this.originalContact = this.contactService.getContact(id);
      if (this.originalContact === undefined || this.originalContact === null){
        return;
      }

      this.editMode = true;
      this.contact = JSON.parse(JSON.stringify(this.originalContact));

      // if (this.contact.group !== null && this.contact.group !==undefined){
      //   this.groupContacts = [...this.contact.group];

      if (this.contact.group) {
        this.groupContacts = this.contact.group.slice();
      }
    });
  }

  onSubmit(form: NgForm) {
    const values = form.value;
    console.log(form.value);
    const newContact = new Contact(null, values.name, values.email, values.phone, values.imageUrl, this.groupContacts);

    if (this.editMode === true) {
      this.contactService.updateContact(this.originalContact, newContact);
    } else {
      this.contactService.addContact(newContact);
    }

    this.router.navigate(['/contacts']);
  }

  onCancel() {
    this.router.navigate(['/contacts'], {relativeTo: this.route});
  }

  isInvalidContact(newContact: Contact) {
    console.log('isInvalidContact called')
    if (!newContact || newContact.id === this.contact.id) {
      return true;
    }

    for (let i = 0; i < this.groupContacts.length; i++) {
      if (newContact.id === this.groupContacts[i].id) {
        return true;
      }
    }
    return false;
  }

  addToGroup($event: any) {
    console.log('addToGroup called')
    let selectedContact: Contact = $event.dragData;
    this.invalidGroupContact = this.isInvalidContact(selectedContact);
    if (this.invalidGroupContact) {
      return;
    }
    this.groupContacts.push(selectedContact);
    this.invalidGroupContact = false;
  }

  onRemoveItem(idx: number) {
    console.log('onRemoveItem called')
    if (idx < 0 || idx >= this.groupContacts.length)
    return;

    this.groupContacts.splice(idx, 1);
    this.invalidGroupContact = false;
  }

}
