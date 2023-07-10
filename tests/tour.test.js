import { assert, expect, test } from "vitest";
import fs from "fs";
import yaml from "js-yaml";

const currentTourFile = fs.readFileSync("currentTour.yaml", "utf8");

const currentTourData = yaml.load(currentTourFile);

// Current tour location is not empty
test("currentTour not null", () => {
  expect(currentTourData.currentTourLocation).toBeTruthy();
});

//There are stages in the current tour location
test("Stages present in current tour", () => {
  const currentTourStagesLocation =
    currentTourData.currentTourLocation + "/stages/";

  const files = fs
    .readdirSync(currentTourStagesLocation.slice(1))
    .filter((element) => !element.startsWith(".")); //filter hidden files
  expect(files).not.toHaveLength(0);
});
