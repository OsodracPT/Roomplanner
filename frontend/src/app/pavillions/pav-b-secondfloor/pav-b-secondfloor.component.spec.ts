import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PavBSecondfloorComponent } from './pav-b-secondfloor.component';

describe('PavBSecondfloorComponent', () => {
  let component: PavBSecondfloorComponent;
  let fixture: ComponentFixture<PavBSecondfloorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PavBSecondfloorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PavBSecondfloorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
