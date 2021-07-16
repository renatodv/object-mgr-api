import { UserInputError } from "apollo-server";

import { Object } from "./types/interface";
import { readObjects, writeObjects } from "./database/";

/**
 * Gets the object the first free object from our objects file.
 * If there are no objects it returns an error.
 */
export function getObject(): Object | null {
  const objects = readObjects();
  const object = objects.find((object) => object.free);
  if (object) {
    object.free = false;
    writeObjects(objects);
    return object;
  }
  throw new UserInputError("There are no more freed objects.");
}

/**
 * Creates a new object and set it as free.
 * It returns an error in case the object already exists.
 * @param {int} value - the value of the object.
 */
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

/**
 * Frees the passed object.
 * It returns an error in case the object does not exist.
 * @param {int} value - the value of the object.
 */
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
