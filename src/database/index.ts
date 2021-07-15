import fs from "fs";
import path from "path";
import type { Object } from "../types/interface";

const fileToSave = path.resolve(__dirname, "data.txt");

export type ObjectsType = Array<Object>;

export function readObjects(): ObjectsType {
  try {
    const readFile = fs.readFileSync(fileToSave, "utf-8");
    return JSON.parse(readFile);
  } catch (error) {
    return [];
  }
}

export function writeObjects(objects: ObjectsType) {
  fs.writeFileSync(fileToSave, JSON.stringify(objects));
}
