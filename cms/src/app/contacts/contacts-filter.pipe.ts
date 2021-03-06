import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from '../contacts/contact.model';

@Pipe({
  name: 'contactsFilter'
})
export class ContactsFilterPipe implements PipeTransform {

  transform(contacts: Contact[], [term]) {
    let filteredArray: Contact[] = [];

    // for(let i = 0; i < contacts.length; i++){
    //   let contact = contacts[i];
    //   if(contact.name.toLowerCase().includes(term)) {
    //     filteredArray.push(contact);
    //   }
    // }

    // Simplify with filter() function
    filteredArray = contacts.filter(
      (contact: any) => contact.name.toLowerCase().includes(term.toLowerCase())
    );

    if (filteredArray.length < 1){
      return contacts;
    }
    return filteredArray;
  }

}
