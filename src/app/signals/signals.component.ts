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
  isEven = computed(() => (this.counter() % 2) === 0);

  constructor() {
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
