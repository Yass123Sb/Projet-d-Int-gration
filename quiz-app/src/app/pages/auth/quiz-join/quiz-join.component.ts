import { Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterModule } from '@angular/router';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { TestService } from '../../../services/test.service';

@Component({
  selector: 'app-quiz-join',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    FormsModule,
    NgIf,
    RouterModule,
    MatSelectModule,
    CommonModule,
    MatRadioButton,
    MatRadioGroup,
  ],
  templateUrl: './quiz-join.component.html',
  styleUrls: ['./quiz-join.component.css'],
})
export class QuizJoinComponent {
  email: string = '';
  name: string = '';
  password: string = '';
  role: string = 'candidate';
  department: string = '';
  degree: string = '';
  router = inject(Router);
  testService = inject(TestService);
  errorMessage: any;
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
  join() {
    if (!this.name || !this.department || !this.email) {
      alert('Veuillez entrer votre nom, e-mail et département.');
      return;
    }
    const data = {
      name: this.name,
      email: this.email,
      password: this.password,
      department: this.department,
      degree: this.degree,
      role: this.role,
    };

    this.testService.join(data).subscribe((data) => {
      if (data && data.role === 'candidate') {
        localStorage.setItem("id", data._id);
        this.router.navigateByUrl(`/quiz/${this.department}`);
      } else if (data && data.role === 'boss') {
        localStorage.setItem("id", data._id);
        this.router.navigateByUrl(`/recruter`);
      } else {
        alert('Une erreur est survenue. Veuillez réessayer');
      }
    });
  }
}
