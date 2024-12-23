import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-recruter',
  standalone: true,
  imports: [RouterOutlet,RouterModule],
  templateUrl: './recruter.component.html',
  styleUrl: './recruter.component.css'
})
export class RecruterComponent {

}
