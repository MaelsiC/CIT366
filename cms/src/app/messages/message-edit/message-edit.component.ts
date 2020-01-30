import { Component, OnInit, Output, ElementRef, ViewChild, EventEmitter } from '@angular/core';
import { Message } from '../messages.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {

  @ViewChild('subject', {static: false}) subjectRef: ElementRef;
  @ViewChild('msgText', {static: false}) msgTextRef: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();
  sender: string = 'Mae';

  constructor() { }

  ngOnInit() {
  }

  onSendMessage() {
    const subject: string = this.subjectRef.nativeElement.value;
    const msgText: string = this.msgTextRef.nativeElement.value;
    const msg = new Message('2', subject, msgText, this.sender);
    this.addMessageEvent.emit(msg);
    this.onClear();
  }

  onClear() {
    this.subjectRef.nativeElement.value = "";
    this.msgTextRef.nativeElement.value = "";
  }

}
