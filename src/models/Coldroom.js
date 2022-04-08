import { Germplasm } from "./Germplasm";

class Coldroom {
  constructor(germplasms) {
    if (germplasms === undefined)
      throw new Error("Coldroom germplasms: undefined");

    this.germplasms = germplasms;
  }

  static fromJSON(json) {
    const germplasms = json["germplasms"].map(Germplasm.fromJSON);
    const coldroom = new Coldroom(germplasms);

    return coldroom;
  }
}

export { Coldroom };
