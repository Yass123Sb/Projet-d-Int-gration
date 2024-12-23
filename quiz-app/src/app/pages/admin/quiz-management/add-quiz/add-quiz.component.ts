import { NgIf, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule, Router } from '@angular/router';
import { TestService } from '../../../../services/test.service';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-add-quiz',
  standalone: true,
  imports: [    MatInputModule,
      MatButtonModule,
      FormsModule,
      BrowserModule,
      ReactiveFormsModule,
      NgIf,
      RouterModule,
      MatSelectModule,
      CommonModule,
      MatRadioButton,
      MatRadioGroup,],
  templateUrl: './add-quiz.component.html',
  styleUrl: './add-quiz.component.css'
})
export class AddQuizComponent {
  departements: string[] = [
    'Informatique',
    'Télécommunications',
    'Électronique',
    'Génie Civil',
    'Mécanique',
    'Génie Industriel',
    'Énergétique',
    'Génie Biologique',
    'Automatique',
    'Mathématiques Appliquées',
  ];
  quizForm: FormGroup;
  department: string='';


  constructor(private fb: FormBuilder) {
    this.quizForm = this.fb.group({
      department: ['', Validators.required],
      questions: this.fb.array([])
    });

    // Add initial question
    this.addQuestion();
  }

  // Getter for questions form array
  get questions(): FormArray {
    return this.quizForm.get('questions') as FormArray;
  }

  // Function to add a new question
  addQuestion() {
    const questionGroup = this.fb.group({
      content: ['', Validators.required],
      marks: [5, Validators.required],
      negativeMarks: [2, Validators.required],
      options: this.fb.array([
        this.createOptionGroup()
      ])
    });
    this.questions.push(questionGroup);
  }

  createOptionGroup(): FormGroup {
    return this.fb.group({
      content: ['', Validators.required],
      isCorrect: [false]
    });
  }

  addOption(questionIndex: number) {
    const options = this.questions.at(questionIndex).get('options') as FormArray;
    options.push(this.createOptionGroup());
  }

  submitQuiz() {
    if (this.quizForm.invalid) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    const formData = this.quizForm.value;
    const requestBody = {
      department: formData.department,
      questions: formData.questions.map((question: any) => ({
        content: question.content,
        marks: question.marks,
        negativeMarks: question.negativeMarks,
        options: question.options.map((option: any) => ({
          content: option.content,
          isCorrect: option.isCorrect
        }))
      }))
    };

    console.log('Quiz Data Submitted:', requestBody);
  
  }
}
