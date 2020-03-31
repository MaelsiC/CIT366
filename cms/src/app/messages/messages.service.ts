import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './messages.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { Subject } from 'rxjs';
import 'rxjs';
import 'rxjs/Rx';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  maxMessageId: number;

  messageSelectedEvent = new EventEmitter<Message>();
  messageChangeEvent = new EventEmitter<Message[]>();
  messages: Message[] = [];

  constructor(private http: HttpClient) {
    // this.messages = MOCKMESSAGES;
    this.initMessages();
    this.maxMessageId = this.getMaxId();
  }

  getMessage(id: string): Message {
    //  for (const message of this.messages){
    //    if (message.id === id) {
    //      return message;
    //    }
    //  }
    //  return null;
    if (!this.messages) {
      return null;
    }

    for (const message of this.messages) {
      if (message.id === id) {
        return message;
      }
    }

    return null;
  }

  getMessages(): Message[] {
    return this.messages;
  }

  initMessages() {
    this.http.get('https://localhost:3000/messages')
      .subscribe((messages: Message[]) => {
        this.messages = messages;
        this.maxMessageId = this.getMaxId();
        this.messageChangeEvent.next(this.messages.slice());
      },

        (error: any) => {
          console.log(error);
        });
  }

  addMessage(message: Message) {
    // REPLACED
    // this.messages.push(message);
    // // this.messageChangeEvent.emit(this.messages.slice());
    // this.storeMessages();
    // WITH
    if (!message) {
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    message.id = '';

    this.http
      .post<{ message: string, newMessage: Message }>('http://localhost:3000/messages', message, { headers: headers })
      .subscribe((response: any) => {
        this.messages.push(response.newMessage);
        this.messageChangeEvent.next(this.messages.slice());
      });
  }

  getMaxId(): number {
    let maxId = 0;
    this.messages.forEach((message: Message) => {
      const currId = +message.id;
      if (currId > maxId) {
        maxId = currId;
      }
    });
    return maxId;
  }

  storeMessages() {
    //   const msgs = JSON.stringify(this.messages);
    //     const header = new HttpHeaders({'Content-Type': 'application/json'});
    //     this.http.put('https://samplecms-f2b88.firebaseio.com/messages.json', msgs, {
    //       headers: header
    //     }).subscribe(() => {
    //       this.messageChangeEvent.next(this.messages.slice());
    //     });
    // }
    const json = JSON.stringify(this.messages);
    const header = new HttpHeaders();
    header.set('Content-Type', 'application/json');
    this
      .http
      .put<{ message: string }>('http://localhost:3000/messages', json, {
        headers: header
      }).subscribe(() => {
        this.messageChangeEvent.next(this.messages.slice());
      });
  }
}
