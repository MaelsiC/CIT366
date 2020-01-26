import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cms-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() selectedFeautureEvent = new EventEmitter<string>();

  onSelected(selectedEvent: string) {
    this.selectedFeatureEvent.emit(selectedEvent);
  }
}
