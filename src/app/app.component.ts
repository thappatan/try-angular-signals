import { Component, OnInit, computed, effect, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  price = signal<number>(0);
  priceX2 = computed(() => this.price() * 2);

  priceX3 = signal<number>(0);

  constructor(){
    effect(() => {
      console.log(`ราคาล่าสุด : `, this.price());
      this.priceX3.update(() => this.price() * 3)
    }, {
      allowSignalWrites: true
    })
  }

  ngOnInit(): void {
    this.price.set(100);
  }

  addPrice() {
    this.price.update(p => p + 1);
  }

  removePrice() {
    this.price.update(p => p - 1);
  }
}
