import { assert, expect, test } from "vitest";
import fs from "fs";
import yaml from "js-yaml";

const currentTourFile = fs.readFileSync("data/currentTour.yaml", "utf8");
const currentTourData = yaml.load(currentTourFile);
const currentTourStagesLocation =
  "data/" + currentTourData.currentTourLocation + "/stages/";

const files = fs
  .readdirSync(currentTourStagesLocation)
  .filter((element) => !element.startsWith(".")); //filter hidden files

const cyclistsJSON = yaml.load(
  fs.readFileSync(
    "data/" + currentTourData.currentTourLocation + "/cyclists.yaml",
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


/*test("Finished stages have same number of stageResults as in tour config defined", () => {
  
  //Read tour config
  const currentTourConfigJSON = yaml.load(fs.readFileSync("data" + currentTourData.currentTourLocation + "/tourConfig.yaml", "utf8"));

  files.forEach((file) => {
    let stageDataJSON = yaml.load(
      fs.readFileSync(currentTourStagesLocation + file, "utf8")
    );

    if (stageDataJSON.status === "finished") {
      expect(stageDataJSON.stageResults.length).toEqual(currentTourConfigJSON.scoring.length)
    }
  });
});
*/

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
