import axios from "axios";

import { YieldTrial } from "../models/YieldTrial";
import { WorkflowType } from "../models/WorkflowType";

class YieldTrialRepository {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async getYieldTrialById(id) {
    const response = await axios.get(`${this.baseURL}/workflow/${id}`);

    return YieldTrial.fromJSON(response.data["workflow"]);
  }

  async getYieldTrialsBySeasonId(id) {
    const response = await axios.get(
      `${this.baseURL}/workflow?type=${WorkflowType.YieldTrial}&season-id=${id}`
    );

    return response.data["workflows"].map(YieldTrial.fromJSON);
  }

  async createYieldTrial(name, seasonId, germplasmIds) {
    const payload = {
      workflow_type: WorkflowType.YieldTrial,
      name: name,
      season_id: seasonId,
    };
    if (germplasmIds !== undefined) payload["germplasm_ids"] = germplasmIds;

    const response = await axios.post(`${this.baseURL}/workflow`, payload);

    return YieldTrial.fromJSON(response.data["workflow"]);
  }

  async updateYieldTrial(id, name, seasonId) {
    const payload = {
      name: name,
      season_id: seasonId,
    };

    const response = await axios.put(`${this.baseURL}/workflow/${id}`, payload);

    return YieldTrial.fromJSON(response.data["workflow"]);
  }

  async deleteYieldTrial(id) {
    const response = await axios.delete(`${this.baseURL}/workflow/${id}`);

    return response.data;
  }
}

export { YieldTrialRepository };
