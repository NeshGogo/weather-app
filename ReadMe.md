# Weather App

**Description**

This weather app provides real-time weather information for any location worldwide. It leverages a reliable weather API to fetch accurate data, including:

- **Current Weather:**
  - Temperature
  - Humidity
  - Wind speed and direction
  - Weather condition (e.g., sunny, rainy, cloudy)
- **Forecast:**
  - Daily forecasts for the next several days
  - Hourly forecasts for the current day

**Features**

- Intuitive User Interface
- Accurate Weather Data
- Location-Based Weather
- Dark Mode

**Required technologies**
- .Net 8
- Docker
- Angular
- NodeJS
- Tailwind
- Redis

**Getting Started**

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/neshgogo/weather-app.git

   ```
2. **To use this application, you'll need API keys from both Meteosource and Google AI Studio:**
    - Get your Meteosource key at [Meteosource](https://www.meteosource.com).
    - Get your Gemini key at [Google AI Studio](https://aistudio.google.com).
  
3. **In your backend project, add your Meteosource and Gemini API keys to the `appsettings.Development.json` file. For production, consider using a more secure approach like Azure Key Vault or environment variables.**

4. **Run `docker-compose up` at `weather-app` folder to start the containers.

5. **Install Dependencies:**

    ```bash
    cd weatherWeb
    npm install
    ```
6. **Run the App:**
    ```
    ng serve
    ```
7. **Access the app:** Navigate to `http://localhost:4200` in your web browser.
    

### APP Design by @albert2297
![App Design](./Resources/design.jpg)
