import { Component, OnInit } from '@angular/core';
// Output, EventEmitter DELETED FROM IMPORTS

@Component({
  selector: 'cms-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // REMOVED
  // @Output() selectedFeatureEvent = new EventEmitter<string>();
  // //

  ngOnInit () {
  }

  // REMOVED 
  // onSelected(selectedEvent: string) {
  //   this.selectedFeatureEvent.emit(selectedEvent);
  // }
  // //
  
}
