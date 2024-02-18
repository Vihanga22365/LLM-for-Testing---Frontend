import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderBarComponentComponent } from './header-bar-component.component';

describe('HeaderBarComponentComponent', () => {
  let component: HeaderBarComponentComponent;
  let fixture: ComponentFixture<HeaderBarComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderBarComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderBarComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
