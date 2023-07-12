import { assert, expect, test } from "vitest";
import fs from "fs";
import yaml from "js-yaml";

const currentTourData = yaml.load(
  fs.readFileSync("data/currentTour.yaml", "utf8")
);

// Current tour location is not empty
test("currentTour not null", () => {
  expect(currentTourData.currentTourLocation).toBeTruthy();
});

//There are stages in the current tour location
test("Stages present in current tour", () => {
  const currentTourStagesLocation =
    "data/" + currentTourData.currentTourLocation + "/stages/";

  const files = fs
    .readdirSync(currentTourStagesLocation)
    .filter((element) => !element.startsWith(".")); //filter hidden files
  expect(files).not.toHaveLength(0);
});
