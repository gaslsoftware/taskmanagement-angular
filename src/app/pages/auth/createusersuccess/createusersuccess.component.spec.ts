import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateusersuccessComponent } from './createusersuccess.component';

describe('CreateusersuccessComponent', () => {
  let component: CreateusersuccessComponent;
  let fixture: ComponentFixture<CreateusersuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateusersuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateusersuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
