import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruterJobsComponent } from './recruter-jobs.component';

describe('RecruterJobsComponent', () => {
  let component: RecruterJobsComponent;
  let fixture: ComponentFixture<RecruterJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecruterJobsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecruterJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
