import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TestService } from '../../../../services/test.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-quiz-list',
  standalone: true,
  imports: [NgFor,NgIf,RouterModule],
  templateUrl: './quiz-list.component.html',
  styleUrl: './quiz-list.component.css'
})
export class QuizListComponent {
 testService = inject(TestService);
  router = inject(Router);
  quizs:any[]=[]
  quizToDeleteId=''
  showModal = false;

  ngOnInit() {
    this.getAllquizs();
  }

  getAllquizs() {
    this.testService.getAllQuestions().subscribe((data:any) => {
      console.log(data);
      
      this.quizs = data.quizs;
    });
  }
  toggleModal(id: string | null = null){
    this.showModal = !this.showModal;
    if (id) {
      this.quizToDeleteId = id;
    }
  }

  deleteElement(){
    this.testService.deleteQuiz(this.quizToDeleteId).subscribe(data=>{
      this.getAllquizs();
      this.showModal = !this.showModal;
    })
  }
}
