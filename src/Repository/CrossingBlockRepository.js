import axios from "axios";

import { CrossingBlock } from "../Model/CrossingBlock";
import { WorkflowType } from "../Model/WorkflowType";

class CrossingBlockRepository {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async getCrossingBlockById(id) {
    const response = await axios.get(`${this.baseURL}/workflow/${id}`);

    return CrossingBlock.fromJSON(response.data["workflow"]);
  }

  async getCrossingBlocksBySeasonId(id) {
    const response = await axios.get(
      `${this.baseURL}/workflow?type=${WorkflowType.CrossingBlock}&season-id=${id}`
    );

    return response.data["workflows"].map(CrossingBlock.fromJSON);
  }

  async createCrossingBlock(name, seasonId, germplasmIds) {
    const payload = {
      workflow_type: WorkflowType.CrossingBlock,
      name: name,
      season_id: seasonId,
    };
    if (germplasmIds !== undefined) payload["germplasm_ids"] = germplasmIds;

    const response = await axios.post(`${this.baseURL}/workflow`, payload);

    return CrossingBlock.fromJSON(response.data["workflow"]);
  }

  async updateCrossingBlock(id, name, seasonId) {
    const payload = {
      name: name,
      season_id: seasonId,
    };

    const response = await axios.put(`${this.baseURL}/workflow/${id}`, payload);

    return CrossingBlock.fromJSON(response.data["workflow"]);
  }

  async deleteCrossingBlock(id) {
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

    return CrossingBlock.fromJSON(response.data["workflow"]);
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

    return CrossingBlock.fromJSON(response.data["workflow"]);
  }

  async removeGermplasmAttribute(id, name) {
    const response = await axios.delete(
      `${this.baseURL}/workflow/${id}/germplasm/attribute/${name}`
    );

    return CrossingBlock.fromJSON(response.data["workflow"]);
  }
}

export { CrossingBlockRepository };
