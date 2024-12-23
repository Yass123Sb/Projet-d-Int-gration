import { Component, inject } from '@angular/core';
import { TestService } from '../../../services/test.service';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-recruter-offers',
  standalone: true,
  imports: [NgIf,NgFor],
  templateUrl: './recruter-offers.component.html',
  styleUrl: './recruter-offers.component.css'
})
export class RecruterOffersComponent {
 testService = inject(TestService);
  router = inject(Router);
  offers:any[]=[]
  offerToDeleteId=''
  showModal = false;

  ngOnInit() {
    this.getAllOffers();
  }

  getAllOffers() {
    const userId = localStorage.getItem('id');  // Get the recruiter ID from localStorage
    this.testService.getOfferByRecruter().subscribe((data: any) => {
      this.offers = data.offers.filter((offer: any) => offer.recruterId === userId); // Filter by recruterId
console.log(this.offers);

    });
  }
  toggleModal(id: string | null = null){
    this.showModal = !this.showModal;
    if (id) {
      this.offerToDeleteId = id;
    }
  }

  rejectOffer(offerId: string) {
    const updatedData = { status: 'rejected' };
    this.testService.editOffer(offerId, updatedData).subscribe(
      response => {
        console.log('Offer rejected:', response);
        const offer = this.offers.find(o => o._id === offerId);
        if (offer) {
          offer.status = 'rejected';
        }
      },
      error => {
        console.error('Error rejecting offer:', error);
      }
    );
  }

  approveOffer(offerId: string) {
    const updatedData = { status: 'accepted' };
    this.testService.editOffer(offerId, updatedData).subscribe(
      response => {
        console.log('Offer approved:', response);
        const offer = this.offers.find(o => o._id === offerId);
        if (offer) {
          offer.status = 'accepted';
        }
      },
      error => {
        console.error('Error approving offer:', error);
      }
    );
  }

  deleteElement(){
    this.testService.deleteOffer(this.offerToDeleteId).subscribe(data=>{
      this.getAllOffers();
      this.showModal = !this.showModal;
    })
  }
}
