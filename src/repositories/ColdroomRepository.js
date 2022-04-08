import axios from "axios";

import { Coldroom } from "../models/Coldroom";

class ColdroomRepository {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async getColdroom() {
    const response = await axios.get(`${this.baseURL}/coldroom`);

    return Coldroom.fromJSON(response.data["coldroom"]);
  }

  async addGermplasm(germplasmIds) {
    const payload = {
      germplasm_ids: germplasmIds,
    };

    const response = await axios.post(
      `${this.baseURL}/coldroom/add-germplasm`,
      payload
    );

    return Coldroom.fromJSON(response.data["coldroom"]);
  }
}

export { ColdroomRepository };
