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
      `${this.baseURL}/coldroom/germplasm`,
      payload
    );

    return Coldroom.fromJSON(response.data["coldroom"]);
  }

  async addGermplasmAttribute(name, type) {
    const payload = {
      name: name,
      type: type,
    };

    const response = await axios.post(
      `${this.baseURL}/coldroom/germplasm/attribute`,
      payload
    );

    return Coldroom.fromJSON(response.data["coldroom"]);
  }

  async removeGermplasmAttribute(name) {
    const response = await axios.delete(
      `${this.baseURL}/coldroom/germplasm/attribute/${name}`
    );

    return Coldroom.fromJSON(response.data["coldroom"]);
  }
}

export { ColdroomRepository };
