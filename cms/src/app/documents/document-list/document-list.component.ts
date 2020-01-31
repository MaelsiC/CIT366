import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
@Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document('1', 'CIT 260', ' Object Oriented Programming', 'https://content.byui.edu/file/22c0260d-e1b7-43a2-8903-8d8f948041ee/4/syllabus.html', null),
    new Document('2', 'CIT 366', ' Full Web Stack Development', 'https://byui.instructure.com/courses/73066/pages/course-introduction?module_item_id=9147090', null),
    new Document('3', 'CIT 425', ' Data Warehousing', 'http://emp.byui.edu/mclaughlinm/IS425/Winter2009/Syllabus_CIT425_Winter2009.htm', null),
    new Document('4', 'CIT 460', ' Enterprise Development', 'https://web.byui.edu/Directory/Employee/jacksonk/201508', null),
    new Document('5', 'CIT 495', ' Senior Practicum', 'http://www.byui.edu/executive-strategy-and-planning/institutional-research/outcomes-and-assessments/business-and-communication/computer-information-technology', null)
  ];

  constructor() { }

  ngOnInit() {
  }

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }

}
