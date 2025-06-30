import {
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  AfterViewInit,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import KeenSlider, { KeenSliderInstance } from 'keen-slider';
import { ApiService, GachaItem } from '../../services/api.service';

@Component({
  selector: 'app-showcase',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './showcase.component.html',
  styleUrls: [
    '../../../../node_modules/keen-slider/keen-slider.min.css',
    './showcase.component.scss',
  ],
})
export class ShowcaseComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('sliderRef') sliderRef!: ElementRef<HTMLElement>;

  currentSlide: number = 0;
  dotHelper: Array<number> = [];
  slider!: KeenSliderInstance;
  slides: GachaItem[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadShowcaseItems();
  }

  loadShowcaseItems() {
    this.apiService.getAllItems().subscribe({
      next: (items) => {
        this.slides = items;
        this.isLoading = false;
        setTimeout(() => this.initializeSlider(), 0);
      },
      error: (error) => {
        console.error('Showcase API Error:', error);
        this.errorMessage = 'データの読み込みに失敗しました';
        this.isLoading = false;
      }
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.slides.length > 0) {
        this.initializeSlider();
      }
    }, 0);
  }

  initializeSlider() {
    this.slider = new KeenSlider(
      this.sliderRef.nativeElement,
      {
        loop: true,
        mode: "snap",
        slides: {
          perView: 3,
          spacing: 15,
        },
        breakpoints: {
          "(max-width: 768px)": {
            slides: { perView: 2, spacing: 10 },
          },
          "(max-width: 480px)": {
            slides: { perView: 1, spacing: 10 },
          },
        },
        slideChanged: (s) => {
          this.currentSlide = s.track.details.rel;
        },
      },
      [
        (slider) => {
          let timeout: any;
          let mouseOver = false;

          function clearNextTimeout() {
            clearTimeout(timeout);
          }

          function nextTimeout() {
            clearTimeout(timeout);
            if (mouseOver) return;
            timeout = setTimeout(() => {
              slider.next();
            }, 3000);
          }

          slider.on('created', () => {
            slider.container.addEventListener('mouseover', () => {
              mouseOver = true;
              clearNextTimeout();
            });
            slider.container.addEventListener('mouseout', () => {
              mouseOver = false;
              nextTimeout();
            });
            nextTimeout();
          });

          slider.on('dragStarted', clearNextTimeout);
          slider.on('animationEnded', nextTimeout);
          slider.on('updated', nextTimeout);
        },
      ]
    );

    this.dotHelper = [...Array(this.slider.track.details.slides.length).keys()];
  }

  ngOnDestroy() {
    if (this.slider) this.slider.destroy();
  }

  prev() {
    this.slider.prev();
  }

  next() {
    this.slider.next();
  }

  moveToSlide(idx: number) {
    this.slider.moveToIdx(idx);
  }

  getRatingStars(rating: string): string {
    const numRating = parseFloat(rating);
    return "★".repeat(Math.floor(numRating)) + "☆".repeat(5 - Math.floor(numRating));
  }
}
