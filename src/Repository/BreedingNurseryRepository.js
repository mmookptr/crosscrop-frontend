import axios from "axios";

import { BreedingNursery } from "../Model/BreedingNursery";
import { WorkflowType } from "../Model/WorkflowType";

class BreedingNurseryRepository {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async getBreedingNurseryById(id) {
    const response = await axios.get(`${this.baseURL}/workflow/${id}`);

    return BreedingNursery.fromJSON(response.data["workflow"]);
  }

  async getBreedingNurseriesBySeasonId(id) {
    const response = await axios.get(
      `${this.baseURL}/workflow?type=${WorkflowType.BreedingNursery}&season-id=${id}`
    );

    return response.data["workflows"].map(BreedingNursery.fromJSON);
  }

  async createBreedingNursery(name, seasonId, germplasmIds) {
    const payload = {
      workflow_type: WorkflowType.BreedingNursery,
      name: name,
      season_id: seasonId,
    };
    if (germplasmIds !== undefined) payload["germplasm_ids"] = germplasmIds;

    const response = await axios.post(`${this.baseURL}/workflow`, payload);

    return BreedingNursery.fromJSON(response.data["workflow"]);
  }

  async updateBreedingNursery(id, name, seasonId) {
    const payload = {
      name: name,
      season_id: seasonId,
    };

    const response = await axios.put(`${this.baseURL}/workflow/${id}`, payload);

    return BreedingNursery.fromJSON(response.data["workflow"]);
  }

  async deleteBreedingNursery(id) {
    const response = await axios.delete(`${this.baseURL}/workflow/${id}`);

    return response.data;
  }

  async addGermplasm(id, germplasmIds) {
    const payload = {
      germplasm_ids: germplasmIds,
    };

    const response = await axios.post(
      `${this.baseURL}/workflow/${id}/germplasm`,
      payload
    );

    return BreedingNursery.fromJSON(response.data["workflow"]);
  }

  async addGermplasmAttribute(id, name, type) {
    const payload = {
      name: name,
      type: type,
    };

    const response = await axios.post(
      `${this.baseURL}/workflow/${id}/germplasm/attribute`,
      payload
    );

    return BreedingNursery.fromJSON(response.data["workflow"]);
  }

  async removeGermplasmAttribute(id, name) {
    const response = await axios.delete(
      `${this.baseURL}/workflow/${id}/germplasm/attribute/${name}`
    );

    return BreedingNursery.fromJSON(response.data["workflow"]);
  }
}

export { BreedingNurseryRepository };
