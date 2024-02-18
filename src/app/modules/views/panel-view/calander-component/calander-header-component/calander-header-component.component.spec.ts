import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalanderHeaderComponentComponent } from './calander-header-component.component';

describe('CalanderHeaderComponentComponent', () => {
  let component: CalanderHeaderComponentComponent;
  let fixture: ComponentFixture<CalanderHeaderComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalanderHeaderComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalanderHeaderComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
