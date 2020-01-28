import { Component, OnInit } from '@angular/core';
import { Message } from '../messages.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [
    new Message('1', 'Activity', 'tomorrow at 5pm', 'Bro. Jackson'),
    new Message('3', 'Activity', 'cannot make it at that time', 'Bro. Thayne'),
    new Message('2', 'Activity', 'how about Friday?', 'Bro. Barzee')
  ];

  constructor() { }

  ngOnInit() {
  }

  onAddMessage(message: Message) {
    this.messages.push(message);
  }

}
