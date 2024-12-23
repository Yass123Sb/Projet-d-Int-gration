import { Component, inject } from '@angular/core';
import { TestService } from '../../../services/test.service';
import { QuizResult } from '../../../types';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quiz-score',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './quiz-score.component.html',
  styleUrl: './quiz-score.component.css'
})
export class QuizScoreComponent {
  testService = inject(TestService);
  quizResult!: QuizResult;
  router = inject(Router);
  role=''
  ngOnInit() {
    setTimeout(() => {
      this.testResult();
      this.getUserInfo();
    }, 500); 
  }

  testResult(){
    let id=localStorage.getItem('id')
    this.testService.getQuizResultByUser(id).subscribe(data=>{
      this.quizResult=data.results[0]
    })
  }

  getUserInfo(){
    let id=localStorage.getItem('id')
    this.testService.getUserById(id).subscribe(data=>{
      this.role=data.role
    })
  }

}
