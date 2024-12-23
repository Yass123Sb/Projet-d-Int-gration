import { Component, inject, Inject } from '@angular/core';
import { TestService } from '../../../services/test.service';
import { QuizResult } from '../../../types';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-certification',
  standalone: true,
  imports: [RouterModule],
  providers: [TestService],
  templateUrl: './certification.component.html',
  styleUrl: './certification.component.css',
})
export class CertificationComponent {
  testService = inject(TestService);
  quizResult: QuizResult = {
    correct: 0,
    inCorrect: 0,
    percentage: 72,
    score: 0,
    unAttempt: 0,
    userId: {},
  };
  router = inject(Router);
  ngOnInit() {
    this.testResult();
  }

  testResult() {
    let id = localStorage.getItem('id');
    this.testService.getQuizResultByUser(id).subscribe((data) => {
      console.log(data);

      this.quizResult = data.results[0];
    });
  }
}
