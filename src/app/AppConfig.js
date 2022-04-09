class AppConfig {
  constructor() {
    this.BaseURL = "http://localhost:3377";
  }
}

const appConfig = new AppConfig();

export { appConfig as AppConfig };
