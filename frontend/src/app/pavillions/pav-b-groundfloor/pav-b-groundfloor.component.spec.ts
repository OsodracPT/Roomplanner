import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PavBGroundfloorComponent } from './pav-b-groundfloor.component';

describe('PavBGroundfloorComponent', () => {
  let component: PavBGroundfloorComponent;
  let fixture: ComponentFixture<PavBGroundfloorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PavBGroundfloorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PavBGroundfloorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
