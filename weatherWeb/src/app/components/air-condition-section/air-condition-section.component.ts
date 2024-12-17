import { Component, input } from '@angular/core';
import { Weather } from '../../models/weather';

@Component({
  selector: 'app-air-condition-section',
  imports: [],
  template: `
    <div
      class="mt-4 shadow dark:shadow-indigo-700 w-full p-3 bg-white border border-gray-200 rounded-lg dark:bg-indigo-950 dark:border-indigo-800"
    >
      <h1
        class="uppercase mb-2 text-base font-extrabold leading-none tracking-tight text-gray-700 md:text-xl dark:text-white"
      >
        air conditions
      </h1>
      <div class="sm:grid sm:grid-cols-2 sm:gap-4">
        <div
          class="mb-2 flex justify-between  shadow dark:shadow-blue-700 w-full p-3 bg-white border border-gray-200 rounded-lg dark:bg-blue-950 dark:border-blue-950"
        >
          <div>
            <p class="mb-3 text-gray-500 dark:text-gray-400">Real Feel</p>
            <p class="mb-3 font-bold text-gray-500 dark:text-gray-400">
              {{ weather()?.current?.temperature?.toFixed() }}°
            </p>
          </div>
          <img
            src="assets/icons/small/{{ weather()?.current?.icon_num }}.png"
            [alt]="weather()?.current?.summary"
          />
        </div>

        <div
          class="mb-2 flex justify-between shadow dark:shadow-blue-700 w-full p-3 bg-white border border-gray-200 rounded-lg dark:bg-blue-950 dark:border-blue-950"
        >
          <div>
            <p class="mb-3 text-gray-500 dark:text-gray-400">Wind</p>
            <p class="mb-3 font-bold text-gray-500 dark:text-gray-400">
              {{ weather()?.current?.wind?.speed }} Km/h
            </p>
          </div>
          <img
            src="assets/icons/medium/{{ weather()?.current?.icon_num }}.png"
            [alt]="weather()?.current?.summary"
          />
        </div>

        <div
          class="mb-2 flex justify-between shadow  dark:shadow-blue-700 w-full p-3 bg-white border border-gray-200 rounded-lg dark:bg-blue-950 dark:border-blue-950"
        >
          <div>
            <p class="mb-3 text-gray-500 dark:text-gray-400">Change of rain</p>
            <p class="mb-3 font-bold text-gray-500 dark:text-gray-400">
              {{ weather()?.current?.precipitation?.total }}%
            </p>
          </div>
          <img
            src="assets/icons/medium/{{ weather()?.current?.icon_num }}.png"
            [alt]="weather()?.current?.summary"
          />
        </div>
      </div>
    </div>
  `,
})
export class AirConditionSectionComponent {
  weather = input<Weather | null>(null);
}
