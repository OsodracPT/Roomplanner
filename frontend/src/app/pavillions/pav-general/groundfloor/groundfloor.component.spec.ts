import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroundfloorComponent } from './groundfloor.component';

describe('GroundfloorComponent', () => {
  let component: GroundfloorComponent;
  let fixture: ComponentFixture<GroundfloorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroundfloorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroundfloorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
