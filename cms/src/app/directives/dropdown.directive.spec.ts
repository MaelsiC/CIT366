import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownDirective } from './dropdown.directive';

describe('DropdownDirective', () => {
  let component: DropdownDirective;
  let fixture: ComponentFixture<DropdownDirective>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownDirective ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});