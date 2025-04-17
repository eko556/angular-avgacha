import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface GachaResult {
  title: string;
  price: number;
  imageUrl: string;
  rating: number;
  reviewCount: number;
}

@Component({
  selector: 'app-gacha',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gacha.component.html',
  styleUrl: './gacha.component.scss'
})
export class GachaComponent {
  isSpinning: boolean = false;
  currentResult: GachaResult | null = null;

  spinGacha() {
    if (this.isSpinning) return;

    this.isSpinning = true;
    // TODO: APIからランダムな作品を取得する処理を実装
    setTimeout(() => {
      this.currentResult = {
        title: "サンプル作品",
        price: 1980,
        imageUrl: "assets/sample.jpg",
        rating: 4,
        reviewCount: 120
      };
      this.isSpinning = false;
    }, 2000);
  }

  getRatingStars(rating: number): string {
    return "★".repeat(Math.floor(rating)) + "☆".repeat(5 - Math.floor(rating));
  }
}
