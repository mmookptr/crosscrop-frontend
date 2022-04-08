class Germplasm {
  constructor(id, name, attributes, createdOn, updatedOn) {
    if (id === undefined) throw new Error("Germplasm Id: undefined");
    if (name === undefined) throw new Error("Germplasm name: undefined");
    if (attributes === undefined)
      throw new Error("Germplasm attributes: undefined");
    if (createdOn === undefined)
      throw new Error("Germplasm createdOn: undefined");

    this.id = id;
    this.name = name;
    this.attributes = attributes;
    this.createdOn = createdOn;
    this.updatedOn = updatedOn;
  }

  static fromJSON(json) {
    return new Germplasm(
      json["id"],
      json["name"],
      json["attributes"],
      json["created_on"],
      json["updated_on"]
    );
  }
}

export { Germplasm };
