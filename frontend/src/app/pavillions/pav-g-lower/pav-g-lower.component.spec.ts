import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PavGLowerComponent } from './pav-g-lower.component';

describe('PavGLowerComponent', () => {
  let component: PavGLowerComponent;
  let fixture: ComponentFixture<PavGLowerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PavGLowerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PavGLowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
