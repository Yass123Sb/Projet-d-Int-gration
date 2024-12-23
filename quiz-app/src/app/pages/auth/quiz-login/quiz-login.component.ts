import { CommonModule, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRadioButton } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterModule } from '@angular/router';
import { TestService } from '../../../services/test.service';

@Component({
  selector: 'app-quiz-login',
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
  ],
  templateUrl: './quiz-login.component.html',
  styleUrl: './quiz-login.component.css',
})
export class QuizLoginComponent {
  email: string = '';
  password: string = '';
  router = inject(Router);
  testService = inject(TestService);
  errorMessage: any;

  join() {
    if (!this.password || !this.email) {
      alert('Veuillez entrer votre email et votre mots de passe.');
      return;
    }
    let data = { password: this.password, email: this.email };
    this.testService.login(data).subscribe((data) => {
      if (data && data.role === 'candidate') {
        localStorage.setItem('id', data._id);
        this.router.navigateByUrl(`/candidat`);
      } else if (data && data.role === 'boss') {
        localStorage.setItem('id', data._id);
        this.router.navigateByUrl(`/recruter/my-jobs`);
      } else if (data && data.role === 'admin') {
        localStorage.setItem('id', data._id);
        this.router.navigateByUrl(`/admin`);
      } 
      else {
        alert('Une erreur est survenue. Veuillez réessayer');
      }
    });
  }
}
