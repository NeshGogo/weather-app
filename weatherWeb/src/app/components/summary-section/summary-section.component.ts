import { Component, input } from '@angular/core';

@Component({
  selector: 'app-summary-section',
  imports: [],
  template: `
    <div
      class="flex justify-between items-center mt-4 shadow dark:shadow-indigo-700 w-full p-3 bg-white border border-gray-200 rounded-lg dark:bg-indigo-950 dark:border-indigo-800"
    >
      <div>
        <h1
          class="uppercase mb-1 text-xl font-extrabold leading-none tracking-tight text-gray-700 md:text-2xl dark:text-white"
        >
          {{ name() }}
        </h1>
        <p class="mb-3 text-gray-500 dark:text-gray-400">
          Chance of rain: {{ precipitation() }}%
        </p>
        <h1
          class="text-xl font-extrabold leading-none tracking-tight text-gray-700 md:text-2xl dark:text-white"
        >
          {{ temperature()?.toFixed() }}°
        </h1>
      </div>
      <div>
        <img
          class="md:w-32"
          src="assets/icons/big/{{icon()}}.png"
          [alt]="summary()"
        />
      </div>
    </div>
  `,
})
export class SummarySectionComponent {
  name = input<string>();
  precipitation = input<number>();
  temperature = input<number>();
  icon = input<number>();
  summary = input<string>();
}
