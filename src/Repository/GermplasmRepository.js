import axios from "axios";

import { Germplasm } from "../Model/Germplasm";

class GermplasmRepository {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async getGermplasmById(id) {
    const response = await axios.get(`${this.baseURL}/germplasm/${id}`);

    return Germplasm.fromJSON(response.data["germplasm"]);
  }

  async getGermplasmsByWorkflowId(id) {
    const response = await axios.get(
      `${this.baseURL}/germplasm?workflow-id=${id}`
    );

    return response.data["germplasms"].map(Germplasm.fromJSON);
  }

  async createGermplasm(name, workflowId, attributes) {
    const payload = {
      name: name,
      attributes: attributes,
    };
    if (workflowId !== undefined) payload["workflow_id"] = workflowId;

    const response = await axios.post(`${this.baseURL}/germplasm`, payload);

    return Germplasm.fromJSON(response.data["germplasm"]);
  }

  async updateGermplasm(id, name, workflowId, attributes) {
    const payload = {
      name: name,
      attributes: attributes,
    };
    if (workflowId !== undefined) payload["workflow_id"] = workflowId;

    const response = await axios.put(
      `${this.baseURL}/germplasm/${id}`,
      payload
    );

    return Germplasm.fromJSON(response.data["germplasm"]);
  }

  async deleteGermplasm(id) {
    const response = await axios.delete(`${this.baseURL}/germplasm/${id}`);

    return response.data;
  }
}

export { GermplasmRepository };
