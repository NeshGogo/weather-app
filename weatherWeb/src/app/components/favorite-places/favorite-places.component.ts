import { Component, input, output } from '@angular/core';
import { Place } from '../../models/place';

@Component({
  selector: 'app-favorite-places',
  imports: [],
  template: `
    @for (place of places(); track $index) {
    <div
      class="flex mb-2 cursor-pointer shadow dark:shadow-indigo-700 w-full p-3 bg-white border border-gray-200 rounded-lg dark:bg-indigo-950 dark:border-indigo-800"
    >
      <div class="w-full" (click)="select.emit(place)">
        <h2
          class="text-center text-xs font-extrabold leading-none tracking-tight text-gray-700 md:text-sm dark:text-white"
        >
          {{ place.name }}
        </h2>
      </div>

      <button (click)="remove.emit(place)">
        <svg
          class="w-4 h-4 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fill-rule="evenodd"
            d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>

    }
  `,
})
export class FavoritePlacesComponent {
  places = input<Place[]>([]);
  select = output<Place>();
  remove = output<Place>();
}
