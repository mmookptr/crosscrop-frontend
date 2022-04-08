import { Germplasm } from "./Germplasm";
import { Season } from "./Season";

class Workflow {
  constructor(id, name, germplasms, season, createdOn, updatedOn) {
    if (id === undefined) throw new Error("Workflow Id: undefined");
    if (name === undefined) throw new Error("Workflow name: undefined");
    if (germplasms === undefined)
      throw new Error("Workflow germplasms: undefined");
    if (season === undefined) throw new Error("Workflow season: undefined");
    if (createdOn === undefined)
      throw new Error("Workflow createdOn: undefined");

    this.id = id;
    this.name = name;
    this.germplasms = germplasms;
    this.season = season;
    this.createdOn = createdOn;
    this.updatedOn = updatedOn;
  }

  static fromJSON(json) {
    const germplasms = json["germplasms"].map(Germplasm.fromJSON);
    const season = Season.fromJSON(json["season"]);
    const workflow = new Workflow(
      json["id"],
      json["name"],
      germplasms,
      season,
      json["updated_on"],
      json["created_on"]
    );

    return workflow;
  }
}

export { Workflow };
