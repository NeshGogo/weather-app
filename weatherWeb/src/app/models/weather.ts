export interface Weather {
  lat: string;
  lon: string;
  elevation: number;
  timezone: string;
  units: string;
  current: {
    icon: string;
    icon_num: number;
    summary: string;
    temperature: number;
    wind: {
      speed: number;
      angle: number;
      dir: string;
    };
    precipitation: {
      total: number;
      type: string;
    };
    cloud_cover: number;
  };
  hourly: {
    data: [
      {
        date: Date;
        weather: string;
        icon: number;
        summary: string;
        temperature: number;
        wind: {
          speed: number;
          dir: string;
          angle: number;
        };
        cloud_cover: {
          total: number;
        };
        precipitation: {
          total: number;
          type: string;
        };
      }
    ];
  };
  daily: {
    data: [
      {
        day: string;
        weather: string;
        icon: number;
        summary: string;
        all_day: {
          weather: string;
          icon: number;
          temperature: number;
          temperature_min: number;
          temperature_max: number;
          wind: {
            speed: number;
            dir: string;
            angle: number;
          };
          cloud_cover: {
            total: number;
          };
          precipitation: {
            total: number;
            type: string;
          };
        };
        morning: string;
        afternoon: string;
        evening: string;
      }
    ];
  };
}
