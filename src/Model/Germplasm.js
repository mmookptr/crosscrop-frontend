class Germplasm {
  constructor(id, name, attributes, createdOn, updatedOn) {
    if (id === undefined) throw new Error("Germplasm Id: undefined");
    if (name === undefined) throw new Error("Germplasm name: undefined");
    if (attributes === undefined)
      throw new Error("Germplasm attributes: undefined");

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
      json["attributes"].map(GermplasmAttribute.fromJSON),
      json["created_on"],
      json["updated_on"]
    );
  }

  static fromDatasheetRow(row) {
    const id = row.values.id;
    const name = row.values.name;
    const attributes = row.columns
      .filter(
        (attribute) =>
          !["id", "name", "createdOn", "updatedOn"].includes(attribute.name)
      )
      .map((attribute) => {
        const attributeName = attribute.name;
        const attributeType = attribute.type;
        const value = row.values[attributeName];

        return new GermplasmAttribute(attributeName, attributeType, value);
      });

    const germplasm = new Germplasm(id, name, attributes);

    return germplasm;
  }
}

class GermplasmAttribute {
  constructor(name, type, value) {
    if (name === undefined)
      throw new Error("GermplasmAttribute name: undefined");
    if (type === undefined)
      throw new Error("GermplasmAttribute type: undefined");
    if (value === undefined)
      throw new Error("GermplasmAttribute value: undefined");

    this.name = name;
    this.type = type;
    this.value = value;
  }

  static fromJSON(json) {
    return new GermplasmAttribute(json.name, json.type, json.value);
  }
}

export { Germplasm, GermplasmAttribute };
