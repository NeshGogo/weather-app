import { Component, input, output } from '@angular/core';
import { Place } from '../../models/place';

@Component({
  selector: 'app-favorite-places',
  imports: [],
  template: `
    @for (place of places(); track $index) {
    <div
      class="cursor-pointer shadow dark:shadow-indigo-700 w-full p-3 bg-white border border-gray-200 rounded-lg dark:bg-indigo-950 dark:border-indigo-800"
      (click)="select.emit(place)"
    >
      <h2
        class="text-center text-xs font-extrabold leading-none tracking-tight text-gray-700 md:text-sm dark:text-white"
      >
        {{ place.name }}
      </h2>
    </div>
    }
  `,
})
export class FavoritePlacesComponent {
  places = input<Place[]>([]);
  select = output<Place>();
}
