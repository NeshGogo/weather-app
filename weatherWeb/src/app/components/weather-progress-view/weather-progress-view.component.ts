import { Component, input } from '@angular/core';
import { Pregression } from '../../models/progression';

@Component({
  selector: 'app-weather-progress-view',
  imports: [],
  template: `
      <div
      class="mt-4 shadow dark:shadow-indigo-700 w-full p-3 bg-white border border-gray-200 rounded-lg dark:bg-indigo-950 dark:border-indigo-800"
    >
      <h1
        class="uppercase mb-1 text-base font-extrabold leading-none tracking-tight text-gray-700 md:text-xl dark:text-white"
      >
        {{title()}}
      </h1>
      <div
        class="flex justify-evenly overflow-x-scroll [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
      >
        @for (item of progressions(); track $index) {
        <div
          class="flex flex-col justify-between text-center shadow m-2 dark:shadow-blue-700 w-full p-3 bg-white border border-gray-200 rounded-lg dark:bg-blue-950 dark:border-blue-950"
        >
          <p class="mb-3 text-gray-500 dark:text-gray-400">
            {{item.title }}
          </p>
          <img
            src="assets/icons/medium/{{ item.icon }}.png"
            [alt]="item.iconDescription"
          />
          <p class="mb-3 font-bold text-gray-500 dark:text-gray-400">
            {{ item.value }}
          </p>
        </div>
        }
      </div>
    </div>
  `,
})
export class WeatherProgressViewComponent {
  title = input<string>('');
  progressions = input<Pregression[]>([])
}
