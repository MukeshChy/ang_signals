import { NgFor } from '@angular/common';
import {Component, computed, effect, Signal, signal} from '@angular/core';

@Component({
  selector: 'app-signals',
  templateUrl: './signals.component.html',
  standalone: true,
  imports: [NgFor],
})
export class SignalsComponent {
  actions = signal<string[]>([]);
  counter= signal(0);

  /* computed will compute isEven everytime counter value changes */
  isEven = computed(() => (this.counter() % 2) === 0);

  constructor() {
    /* whenever counter value changes, code inside effect will be executed */
    effect(() => console.log(`COUNTER CHANGED TO ${this.counter()}`))
  }

  increment() {
    this.counter.update((oldCounterValue) => oldCounterValue + 1);
    this.actions.mutate((existingActions) => [...existingActions, 'INCREMENT'])
  }

  decrement() {
    this.counter.update((oldCounterValue) => oldCounterValue - 1);
    this.actions.mutate((existingActions) => existingActions.push('DECREMENT'));
  }
}
