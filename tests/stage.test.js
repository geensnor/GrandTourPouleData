import { assert, expect, test } from "vitest";
import fs from "fs";
import yaml from "js-yaml";

const currentTourFile = fs.readFileSync("currentTour.yaml", "utf8");
const currentTourData = yaml.load(currentTourFile);
const currentTourStagesLocation = (
  currentTourData.currentTourLocation + "/stages/"
).slice(1);

const files = fs
  .readdirSync(currentTourStagesLocation)
  .filter((element) => !element.startsWith(".")); //filter hidden files

const cyclistsJSON = yaml.load(
  fs.readFileSync(
    (currentTourData.currentTourLocation + "/cyclists.yaml").slice(1),
    "utf8"
  )
);

const cyclistArray = cyclistsJSON
  .map((obj) => obj.cyclists)
  .reduce((acc, arr) => acc.concat(arr), []);

//A stage can only have one of two statuses: notStarted or finished
test("Status stage only notStarted or finished", () => {
  files.forEach((file) => {
    let stageDataJSON = yaml.load(
      fs.readFileSync(currentTourStagesLocation + file, "utf8")
    );
    expect(["notStarted", "finished"]).toContain(stageDataJSON.status);
  });
});

test("Finished stages have stageResults", () => {
  files.forEach((file) => {
    let stageDataJSON = yaml.load(
      fs.readFileSync(currentTourStagesLocation + file, "utf8")
    );

    if (stageDataJSON.status === "finished") {
      console.log(stageDataJSON.stageResults);
      expect(stageDataJSON.stageResults).toBeTruthy();
    }
  });
});

test("Stagewinners are cyclists in the current tour", () => {
  files.forEach((file) => {
    let stageData = fs.readFileSync(currentTourStagesLocation + file, "utf8");

    let stageDataJSON = yaml.load(stageData);
    if (stageDataJSON.stageResults) {
      expect(cyclistArray).toEqual(
        expect.arrayContaining(stageDataJSON.stageResults)
      );
    }
  });
});
