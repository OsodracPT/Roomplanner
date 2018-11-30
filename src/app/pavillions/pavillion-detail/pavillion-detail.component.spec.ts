import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PavillionDetailComponent } from './pavillion-detail.component';

describe('PavillionDetailComponent', () => {
  let component: PavillionDetailComponent;
  let fixture: ComponentFixture<PavillionDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PavillionDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PavillionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
