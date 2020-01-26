import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from 'events';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {

  @ViewChild('subject') subjectRef: ElementRef;
  @ViewChild('msgText') msgTextRef: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();
  currentSender: string = "Mae";

  constructor() { }

  ngOnInit() {
  }

  onSendMessage() {
    const subject: string = this.subjectRef.nativeElement.value;
    const msgText: string = this.msgTextRef.nativeElement.value;
    const id: string = "010101";
    let msg: Message = new Message(id, subject, msgText, this.currentSender);
    this.addMessageEvent.addMessage(msg);
  }

  onClear() {
    this.subjectRef.nativeElement.value = "";
    this.msgTextRef.nativeElement.value = "";
  }

}
