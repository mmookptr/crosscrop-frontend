import { Germplasm, GermplasmAttribute } from "../Model/Germplasm";

class GermplasmCrosser {
  static cross(germplasms, n) {
    let result = [];

    for (let i = 0; i < germplasms.length; ++i) {
      for (let j = 0; j < germplasms.length; ++j) {
        if (i === j) continue;

        const maleGermplasm = germplasms[i];
        const femaleGermplasm = germplasms[j];

        const attributes = [
          new GermplasmAttribute("male name", "string", maleGermplasm.name),
          new GermplasmAttribute(
            "male id",
            "number",
            parseInt(maleGermplasm.id)
          ),
          new GermplasmAttribute("female name", "string", femaleGermplasm.name),
          new GermplasmAttribute(
            "female id",
            "number",
            parseInt(femaleGermplasm.id)
          ),
        ];

        result.push(new Germplasm(null, "", attributes, null, null));
      }
    }

    while (result.length > n) {
      const deleteIndex = Math.floor(Math.random() * result.length);

      result = result.filter((_, i) => i !== deleteIndex);
    }

    return result;
  }
}

export { GermplasmCrosser };
