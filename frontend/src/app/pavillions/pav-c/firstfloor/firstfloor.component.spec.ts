import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstfloorComponent } from './firstfloor.component';

describe('FirstfloorComponent', () => {
  let component: FirstfloorComponent;
  let fixture: ComponentFixture<FirstfloorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstfloorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstfloorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
