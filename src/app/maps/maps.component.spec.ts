import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewfiturComponent } from './maps.component';

describe('NewfiturComponent', () => {
  let component: NewfiturComponent;
  let fixture: ComponentFixture<NewfiturComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewfiturComponent]
    });
    fixture = TestBed.createComponent(NewfiturComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
