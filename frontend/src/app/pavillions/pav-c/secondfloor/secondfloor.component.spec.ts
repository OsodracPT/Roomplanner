import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondfloorComponent } from './secondfloor.component';

describe('SecondfloorComponent', () => {
  let component: SecondfloorComponent;
  let fixture: ComponentFixture<SecondfloorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondfloorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondfloorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
