import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruterOffersComponent } from './recruter-offers.component';

describe('RecruterOffersComponent', () => {
  let component: RecruterOffersComponent;
  let fixture: ComponentFixture<RecruterOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecruterOffersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecruterOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
