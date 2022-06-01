import fastDeepEqual from "fast-deep-equal";
import fs from "fs";

const data: Input = [
  {
    subscribeId: "123",
    unitId: "22328840-1418-13",
    buildingId: 22328840,
    params: {
      area: 75,
      disposition: "3+1",
      municipalityCode: 554782,
      ownership: "private",
      floor: 5,
      terrace: 10,
      cellar: 2,
      bathroomCondition: "bad",
      kitchenCondition: "bad",
      year: 1973,
      elevator: true,
      floorsCount: 10,
      constructionType: "panel",
    },
  },
  {
    subscribeId: "123",
    unitId: "22328840-1418-13",
    buildingId: 22328840,
    params: {
      area: 75,
      disposition: "3+1",
      municipalityCode: 554782,
      ownership: "private",
      floor: 5,
      terrace: 10,
      cellar: 2,
      bathroomCondition: "bad",
      kitchenCondition: "bad",
      year: 1973,
      elevator: true,
      floorsCount: 10,
      constructionType: "panel",
    },
  },
  {
    subscribeId: "123",
    unitId: "22328840-1418-13",
    buildingId: 22328840,
    params: {
      area: 75,
      disposition: "3+1",
      municipalityCode: 554782,
      ownership: "private",
      floor: 5,
      terrace: 10,
      cellar: 2,
      bathroomCondition: "bad",
      kitchenCondition: "bad",
      year: 1973,
      elevator: true,
      floorsCount: 10,
      constructionType: "panel",
    },
  },
  {
    subscribeId: "123",
    unitId: "22328840-1419-21",
    buildingId: 22328840,
    params: {
      area: 75,
      disposition: "3+1",
      municipalityCode: 554782,
      ownership: "private",
      floor: 10,
      terrace: 14,
      cellar: 2,
      bathroomCondition: "newish",
      kitchenCondition: "excellent",
      year: 1973,
      elevator: true,
      floorsCount: 10,
      constructionType: "panel",
    },
  },
  {
    subscribeId: "123",
    unitId: "22328840-1418-13",
    buildingId: 22328840,
    params: {
      area: 75,
      disposition: "3+1",
      municipalityCode: 554782,
      ownership: "private",
      floor: 5,
      terrace: 10,
      cellar: 2,
      bathroomCondition: "bad",
      kitchenCondition: "bad",
      year: 1973,
      elevator: true,
      floorsCount: 10,
      constructionType: "panel",
    },
  },
  {
    subscribeId: "123",
    unitId: "22328840-1418-6",
    buildingId: 22328840,
    params: {
      area: 75.1,
      disposition: "3+kk",
      municipalityCode: 554782,
      ownership: "private",
      floor: 3,
      year: 1973,
      elevator: true,
      floorsCount: 10,
      constructionType: "panel",
    },
  },
  {
    subscribeId: "123",
    unitId: "22328840-1418-13",
    buildingId: 22328840,
    params: {
      area: 75,
      disposition: "3+1",
      municipalityCode: 554782,
      ownership: "private",
      floor: 5,
      terrace: 10,
      cellar: 2,
      bathroomCondition: "bad",
      kitchenCondition: "bad",
      year: 1973,
      elevator: true,
      floorsCount: 10,
      constructionType: "panel",
    },
  },
  {
    subscribeId: "123",
    unitId: "22328840-1418-V7f5b0cc1fd",
    buildingId: 22328840,
    virtual: true,
    params: {
      area: 80,
      disposition: "3+1",
      municipalityCode: 554782,
      ownership: "private",
      floor: 5,
      terrace: 9,
      bathroomCondition: "bad",
      kitchenCondition: "bad",
      year: 1973,
      elevator: true,
      floorsCount: 10,
      constructionType: "panel",
    },
  },
  {
    subscribeId: "123",
    unitId: "22328840-1418-13",
    buildingId: 22328840,
    params: {
      area: 75,
      disposition: "3+1",
      municipalityCode: 554782,
      ownership: "private",
      floor: 5,
      terrace: 10,
      cellar: 2,
      bathroomCondition: "bad",
      kitchenCondition: "bad",
      year: 1973,
      elevator: true,
      floorsCount: 10,
      constructionType: "panel",
    },
  },
  {
    subscribeId: "123",
    unitId: "22328840-1418-Ve3944bafd9",
    buildingId: 22328840,
    virtual: true,
    params: {
      area: 80,
      disposition: "3+1",
      municipalityCode: 554782,
      ownership: "private",
      floor: 5,
      year: 1973,
      elevator: true,
      floorsCount: 10,
      constructionType: "panel",
    },
  },
  {
    subscribeId: "123",
    unitId: "22328840-1418-V7f5b0cc1fd",
    buildingId: 22328840,
    virtual: true,
    params: {
      area: 80,
      disposition: "3+1",
      municipalityCode: 554782,
      ownership: "private",
      floor: 5,
      terrace: 9,
      bathroomCondition: "bad",
      kitchenCondition: "bad",
      year: 1973,
      elevator: true,
      floorsCount: 10,
      constructionType: "panel",
    },
  },
  {
    subscribeId: "123",
    unitId: "22328840-1418-V823e947c81",
    buildingId: 22328840,
    virtual: true,
    params: {
      area: 75,
      disposition: "3+1",
      municipalityCode: 554782,
      ownership: "private",
      floor: 5,
      terrace: 12,
      bathroomCondition: "bad",
      kitchenCondition: "bad",
      year: 1973,
      elevator: true,
      floorsCount: 10,
      constructionType: "panel",
    },
  },
];

type Data = {
  subscribeId: string;
  unitId: string;
  buildingId: number;
  params: Record<string, any>;
  virtual?: boolean;
  duplicate?: boolean;
  duplicateBasedOn?: string;
};

type Input = Data[];

const markDuplicateUnitSubscribes = <T extends Data>(input: T[]) => {
  input.forEach((unit1) => {
    if (unit1.duplicate) return;

    if (!unit1.virtual) {
      input.forEach((unit2) => {
        if (unit1 !== unit2 && unit1.unitId === unit2.unitId) {
          unit2.duplicate = true;
          unit2.duplicateBasedOn = "id";
        }
      });
    } else {
      input.forEach((unit2) => {
        if (unit1 === unit2 || unit1.buildingId !== unit2.buildingId) return;
        if (fastDeepEqual(unit1.params, unit2.params)) {
          unit2.duplicate = true;
          unit2.duplicateBasedOn = "params";
        }
      });
    }
  });
};

markDuplicateUnitSubscribes(data);

fs.writeFileSync("output.json", JSON.stringify(data, null, 2));
