import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalanderComponentComponent } from './calander-component.component';

describe('CalanderComponentComponent', () => {
  let component: CalanderComponentComponent;
  let fixture: ComponentFixture<CalanderComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalanderComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalanderComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
