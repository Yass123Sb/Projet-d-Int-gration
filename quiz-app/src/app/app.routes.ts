import { Routes } from '@angular/router';
import { QuizJoinComponent } from './pages/auth/quiz-join/quiz-join.component';
import { QuizComponent } from './pages/quiz-exam/quiz/quiz.component';
import { QuizScoreComponent } from './pages/quiz-exam/quiz-score/quiz-score.component';
import { CertificationComponent } from './pages/quiz-exam/certification/certification.component';
import { QuizLoginComponent } from './pages/auth/quiz-login/quiz-login.component';
import { CandidatesListComponent } from './pages/admin/candidates-list/candidates-list.component';
import { JobListComponent } from './pages/admin/job-list/job-list.component';
import { RecruterJobsComponent } from './pages/recruter/recruter-jobs/recruter-jobs.component';
import { CandidatesRecruterHomeComponent } from './pages/recruter/candidates-recruter-home/candidates-recruter-home.component';
import { AddJobComponent } from './pages/recruter/add-job/add-job.component';
import { RecrutersListComponent } from './pages/admin/recruters-list/recruters-list.component';
import { AdminComponent } from './pages/admin/admin.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { AddQuizComponent } from './pages/admin/quiz-management/add-quiz/add-quiz.component';
import { QuizListComponent } from './pages/admin/quiz-management/quiz-list/quiz-list.component';
import { RecruterComponent } from './pages/recruter/recruter.component';
import { CandidatDetailComponent } from './pages/recruter/candidat-detail/candidat-detail.component';
import { CandidateDetailComponent } from './pages/candidat/candidat-detail/candidat-detail.component';
import { CandidatJobsListComponent } from './pages/candidat/candidat-jobs-list/candidat-jobs-list.component';
import { CandidatComponent } from './pages/candidat/candidat.component';
import { RecruterListComponent } from './pages/candidat/recruters-list/recruters-list.component';
import { CandidatOffersComponent } from './pages/candidat/candidat-offers/candidat-offers.component';
import { JobDetailComponent } from './pages/candidat/job-detail/job-detail.component';
import { RecruterOffersComponent } from './pages/recruter/recruter-offers/recruter-offers.component';

export const routes: Routes = [
  {
    path: '',
    component: QuizJoinComponent,
  },
  {
    path: 'login',
    component: QuizLoginComponent,
  },
  {
    path: 'quiz/:department',
    component: QuizComponent,
  },
  {
    path: 'quiz-score',
    component: QuizScoreComponent,
  },
  {
    path: 'certification',
    component: CertificationComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'candidat-list', component: CandidatesListComponent },
      { path: 'recruters-list', component: RecrutersListComponent },
      { path: 'job-list', component: JobListComponent },
      { path: 'quiz', component: QuizListComponent },
      { path: 'quiz/add', component: AddQuizComponent },
    ],
  },
  {
    path: 'recruter',
    component: RecruterComponent,
    children: [
      {
        path: '',
        component: CandidatesRecruterHomeComponent,
      },
      { path: 'my-jobs', component: RecruterJobsComponent },
      {
        path: 'add-job',
        component: AddJobComponent,
      },
      {
        path: 'candidate-detail/:id',
        component: CandidatDetailComponent,
      },
      {
        path: 'offer',
        component: RecruterOffersComponent,
      },
    ],
  },
  {
    path: 'candidat',
    component: CandidatComponent,
    children: [
      { path: '', component: CandidatJobsListComponent },
      { path: 'recruters-list', component: RecruterListComponent },
      {
        path: 'profil',
        component: CandidateDetailComponent,
      },
      {
        path: 'offers',
        component: CandidatOffersComponent,
      },
      {
        path: 'job/:id',
        component: JobDetailComponent,
      },
    ],
  }
];
