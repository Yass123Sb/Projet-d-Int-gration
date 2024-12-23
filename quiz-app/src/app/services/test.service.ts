import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Question, Quiz, QuizResult } from '../types';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  quizResult: QuizResult = {
    name: "Manjeet",
    id: 1,
    _id: 1,
    quizId: 1,
  };
  http = inject(HttpClient);

  constructor() { }

  getQuestions(department:string) {
    return this.http.get<Question[]>(`http://localhost:5000/api/quiz/${department}`);

  }
  getAllQuestions() {
    return this.http.get<Question[]>(`http://localhost:5000/api/quiz`);

  }

  login(data:{email:string,password:string}) {
    return this.http.post<any>("http://localhost:5000/api/auth/login",data);

  }

  addOffer(data:any) {
    return this.http.post<any>("http://localhost:5000/api/offer",data);

  }
  join(data:any) {
    return this.http.post<any>("http://localhost:5000/api/auth/signup",data);

  }
  createQuizResult(data:any) {
    return this.http.post<any>("http://localhost:5000/api/result",data);
  }

  createJob(data:any) {
    return this.http.post<any>("http://localhost:5000/api/job",data);
  }

  getQuizResultByUser(id:any) {
    return this.http.get<any>(`http://localhost:5000/api/result/user/${id}`);
  }
  
  getAllJobs() {
    return this.http.get<any>(`http://localhost:5000/api/job/`);
  }
  
  getAllUsers() {
    return this.http.get<any>(`http://localhost:5000/api/auth/users/all`);
  }
  
  
  getUserById(id:any) {
    return this.http.get<any>(`http://localhost:5000/api/auth/${id}`);
  }

  deleteUser(id:any) {
    return this.http.delete<any>(`http://localhost:5000/api/auth/${id}`);
  }
  deleteJob(id:any) {
    return this.http.delete<any>(`http://localhost:5000/api/job/${id}`);
  }
  deleteQuiz(id:any) {
    return this.http.delete<any>(`http://localhost:5000/api/quiz/${id}`);
  }
  getOfferByRecruter() {
    return this.http.get<any>(`http://localhost:5000/api/offer`);
  }
  getOfferByCandidat(id:any) {
    return this.http.get<any>(`http://localhost:5000/api/offer/candidate/${id}`);
  }
  getjobById(id:any) {
    return this.http.get<any>(`http://localhost:5000/api/job/${id}`);
  }
  deleteOffer(id:any) {
    return this.http.delete<any>(`http://localhost:5000/api/offer/${id}`);
  }
  editOffer(id: any, data: any) {
    return this.http.patch<any>(`http://localhost:5000/api/offer/${id}`, data);
  }
}
