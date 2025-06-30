import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, GachaItem } from '../../services/api.service';

@Component({
  selector: 'app-gacha',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gacha.component.html',
  styleUrl: './gacha.component.scss'
})
export class GachaComponent {
  isSpinning: boolean = false;
  currentResult: GachaItem | null = null;
  errorMessage: string = '';

  constructor(private apiService: ApiService) {}

  spinGacha() {
    if (this.isSpinning) return;

    this.isSpinning = true;
    this.errorMessage = '';
    
    this.apiService.getGachaItems().subscribe({
      next: (items) => {
        setTimeout(() => {
          if (items && items.length > 0) {
            const randomIndex = Math.floor(Math.random() * items.length);
            this.currentResult = items[randomIndex];
          }
          this.isSpinning = false;
        }, 2000);
      },
      error: (error) => {
        console.error('Gacha API Error:', error);
        this.errorMessage = 'APIからデータを取得できませんでした';
        this.isSpinning = false;
      }
    });
  }

  getRatingStars(rating: string): string {
    const numRating = parseFloat(rating);
    return "★".repeat(Math.floor(numRating)) + "☆".repeat(5 - Math.floor(numRating));
  }
}
