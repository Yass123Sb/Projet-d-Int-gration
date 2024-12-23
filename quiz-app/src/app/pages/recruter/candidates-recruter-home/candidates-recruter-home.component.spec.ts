import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatesRecruterHomeComponent } from './candidates-recruter-home.component';

describe('CandidatesRecruterHomeComponent', () => {
  let component: CandidatesRecruterHomeComponent;
  let fixture: ComponentFixture<CandidatesRecruterHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidatesRecruterHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidatesRecruterHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
