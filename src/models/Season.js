class Season {
  constructor(year, seasonNo) {
    this.year = year;
    this.seasonNo = seasonNo;
  }

  static fromJSON(json) {
    return new Season(json["year"], json["season_no"]);
  }
}

export { Season };
