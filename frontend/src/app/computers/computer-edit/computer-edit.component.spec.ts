import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputerEditComponent } from './computer-edit.component';

describe('ComputerEditComponent', () => {
  let component: ComputerEditComponent;
  let fixture: ComponentFixture<ComputerEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComputerEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComputerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
