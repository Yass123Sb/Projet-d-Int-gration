import { NgIf, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterModule } from '@angular/router';
import { TestService } from '../../../services/test.service';

@Component({
  selector: 'app-add-job',
  standalone: true,
  imports: [    MatInputModule,
      MatButtonModule,
      FormsModule,
      NgIf,
      RouterModule,
      MatSelectModule,
      CommonModule,
      MatRadioButton,
      MatRadioGroup,],
  templateUrl: './add-job.component.html',
  styleUrl: './add-job.component.css'
})
export class AddJobComponent {
  title: string = '';
  department: string = '';
  degree: string = '';
  region: string = '';
  salary: string = '';
  description: string = '';
  userId: string = '676146731a5b595d10e19fa9'; // Example user ID
  errorMessage: string | null = null;

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

  testService = inject(TestService);
  router = inject(Router);
  createJobOffer() {
    if (!this.title || !this.department || !this.degree || !this.region || !this.salary || !this.description) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }

    const jobData = {
      title: this.title,
      department: this.department,
      degree: this.degree,
      region: this.region,
      salary: this.salary,
      description: this.description,
      userId: localStorage.getItem('id'),
    };

    this.testService.createJob(jobData).subscribe({
      next: (response) => {
        alert('Offre d\'emploi créée avec succès !');
        this.router.navigateByUrl('/recruter/my-jobs');
      },
      error: (err) => {
        this.errorMessage = 'Une erreur est survenue lors de la création de l\'offre.';
        console.error(err);
      },
    });
  }
}
