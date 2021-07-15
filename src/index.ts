import { UserInputError } from "apollo-server";

import { Object } from "./types/interface";
import { readObjects, writeObjects } from "./database/";

export function getObject(): Object | null {
  const objects = readObjects();
  const object = objects.find((object) => object.free);
  if (object) {
    object.free = false;
    writeObjects(objects);
    return object;
  }
  throw new UserInputError("There are no more free objects.");
}

export function createObject(value: number): Object {
  const objects = readObjects();
  if (objects.find((object) => object.value === value)) {
    throw new UserInputError("The object already exists.");
  }
  const object = { value, free: true };
  objects.push(object);
  writeObjects(objects);
  return object;
}

export function freeObject(value: number): Object {
  const objects = readObjects();
  const object = objects.find((object) => object.value === value);
  if (object) {
    object.free = true;
    writeObjects(objects);
    return object;
  }
  throw new UserInputError("The object you are trying to free does not exist.");
}
