import { Component, inject } from '@angular/core';
import { TestService } from '../../../services/test.service';
import { Question, Quiz, QuizResult } from '../../../types';
import { ActivatedRoute, Router } from '@angular/router';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [MatRadioModule, MatButtonModule,NgIf],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent {
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  testService = inject(TestService);
  questions: Question[] = [];
  quizInfo!: Quiz;
  quizResult!: QuizResult
  currentQuestionNo: number = 0;

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.testService.getQuestions(params['department']).subscribe((data:any)=>{
        console.log("data",data);
        this.questions = data?.questions;
        this.quizInfo = {
          id: data.department,
          _id: data.department,
          name: data.department,
          code: data.department,
          questions: data.questions.map((q: any) => q._id)
        };
      });
    });
    this.quizResult = this.testService.quizResult;
  }
  get currentQuestion() {
    if (this.quizInfo && this.quizInfo.questions) {
      let questionId = this.quizInfo.questions[this.currentQuestionNo];
      return this.questions.find(x => x._id == questionId);
    }
    return null; 
  }
  currentSelectedOptionId: string = '';
  next() {
    if (!this.quizResult.response) {
      this.quizResult.response = [];
    }
    
    this.quizResult.response.push({
      questionId: this.currentQuestion!._id,
      answerOptionId: this.currentSelectedOptionId,
    });
    
    this.currentQuestionNo++;
    this.currentSelectedOptionId = "";
  }

  submit() {
    this.next();
    this.calculateResult();
    this.router.navigateByUrl("quiz-score");

  }
  calculateResult() {
    let score = 0;
    let correct = 0;
    let inCorrect = 0;
    let unAttempt = 0;
    let totalMark = 0;
    this.quizResult.response?.forEach((response) => {
      let questionId = response.questionId;
      let selectedOptionId = response.answerOptionId;
      let question = this.questions.find((x) => x._id == questionId);
      let correctOption = question?.options.find((x) => x.isCorrect);
      totalMark += question!.marks;
      if (!selectedOptionId) {
        unAttempt++;
      } else if (selectedOptionId === correctOption?._id) {
        correct++;
        score += question!.marks;
      } else {
        inCorrect++;
        score -= question!.negativeMarks;
      }   
    });
    this.quizResult.correct = correct;
    this.quizResult.inCorrect = inCorrect;
    this.quizResult.unAttempt = unAttempt;
    this.quizResult.score = score;
    this.quizResult.percentage = Math.round((score / totalMark) * 100);
    this.quizResult.userId = localStorage.getItem('id')+'';
   delete this.quizResult._id 
   delete this.quizResult.quizId 
     this.testService.createQuizResult(this.quizResult).subscribe(data=>{console.log(data);
     })
  }

  userAlreadyPassTest(){
    let id=localStorage.getItem('id')
    this.testService.getQuizResultByUser(id).subscribe(data=>{
      console.log("is result",data);
      

    })
  }
}
