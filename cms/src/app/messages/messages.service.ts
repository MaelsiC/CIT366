import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './messages.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  messageSelectedEvent = new EventEmitter<Message>();
  messageChangeEvent = new EventEmitter<Message[]>();
  messages: Message[] = [];

  constructor() {
    this.messages = MOCKMESSAGES;
   }

   getMessage(id: string): Message {
     for (const message of this.messages){
       if (message.id === id) {
         return message;
       }
     }
     return null;
   }

   getMessages(): Message[] {
     return this.messages;
   }

   addMessage(message: Message) {
    this.messages.push(message);
    this.messageChangeEvent.emit(this.messages.slice());
 }
}
