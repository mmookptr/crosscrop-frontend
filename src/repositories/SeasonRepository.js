import axios from "axios";

import { Season } from "../models/Season";

class SeasonRepository {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async getSeason() {
    const response = await axios.get(`${this.baseURL}/season`);

    return response.data["seasons"].map(Season.fromJSON);
  }

  async getSeasonById(id) {
    const response = await axios.get(`${this.baseURL}/season/${id}`);

    return Season.fromJSON(response.data["season"]);
  }

  async createSeason(year, seasonNo) {
    const payload = {
      year: year,
      seasonNo: seasonNo,
    };

    const response = await axios.post(`${this.baseURL}/season`, payload);

    return Season.fromJSON(response.data["season"]);
  }

  async updateSeason(id, year, seasonNo) {
    const payload = {
      year: year,
      seasonNo: seasonNo,
    };

    const response = await axios.put(`${this.baseURL}/season/${id}`, payload);

    return Season.fromJSON(response.data["season"]);
  }

  async deleteSeason(id) {
    const response = await axios.delete(`${this.baseURL}/season/${id}`);

    return response.data;
  }
}

export { SeasonRepository };
