import { Router, ActivatedRoute, Params } from '@angular/router';
import { ContactService } from './../contact.service';
import { Component, OnInit, Input } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contacts-detail',
  templateUrl: './contacts-detail.component.html',
  styleUrls: ['./contacts-detail.component.css']
})
export class ContactsDetailComponent implements OnInit {
  contact: Contact;

  constructor(private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.contact = this.contactService.getContact(params['id']);
    });
  }

  onDelete() {
    this.contactService.deleteContact(this.contact);
    this.router.navigate(['/contacts'], {relativeTo: this.route});
  }

}
