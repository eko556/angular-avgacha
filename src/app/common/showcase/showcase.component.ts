import {
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import KeenSlider, { KeenSliderInstance } from 'keen-slider';

interface ShowcaseItem {
  imageUrl: string;
  title: string;
  price: number;
  rating: number;
  reviewCount: number;
}

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
export class ShowcaseComponent implements AfterViewInit, OnDestroy {
  @ViewChild('sliderRef') sliderRef!: ElementRef<HTMLElement>;

  currentSlide: number = 0;
  dotHelper: Array<number> = [];
  slider!: KeenSliderInstance;

  // サンプルデータ
  slides: ShowcaseItem[] = [
    {
      imageUrl: 'assets/sample1.jpg',
      title: 'サンプル作品1',
      price: 1980,
      rating: 4.5,
      reviewCount: 120
    },
    {
      imageUrl: 'assets/sample2.jpg',
      title: 'サンプル作品2',
      price: 2980,
      rating: 4.2,
      reviewCount: 85
    },
    {
      imageUrl: 'assets/sample3.jpg',
      title: 'サンプル作品3',
      price: 1580,
      rating: 4.8,
      reviewCount: 230
    },
    {
      imageUrl: 'assets/sample4.jpg',
      title: 'サンプル作品4',
      price: 2480,
      rating: 4.3,
      reviewCount: 156
    },
    {
      imageUrl: 'assets/sample5.jpg',
      title: 'サンプル作品5',
      price: 1780,
      rating: 4.6,
      reviewCount: 198
    }
  ];

  ngAfterViewInit() {
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
}
