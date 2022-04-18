class Season {
  constructor(id, year, seasonNo) {
    this.id = id;
    this.year = year;
    this.seasonNo = seasonNo;
  }

  get name() {
    return `Year ${this.year} Season${this.seasonNo}`;
  }

  static fromJSON(json) {
    return new Season(json["id"], json["year"], json["season_no"]);
  }
}

export { Season };
