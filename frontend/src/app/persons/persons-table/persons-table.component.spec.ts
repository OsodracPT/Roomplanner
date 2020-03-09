import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonsTableComponent } from './persons-table.component';

describe('PersonsTableComponent', () => {
  let component: PersonsTableComponent;
  let fixture: ComponentFixture<PersonsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
