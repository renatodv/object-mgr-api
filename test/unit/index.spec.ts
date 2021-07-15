import { getObject, createObject, freeObject } from "../../src/index";
import { readObjects, writeObjects } from "../../src/database";
import type { ObjectsType } from "../../src/database";

afterEach(() => {
  jest.clearAllMocks();
});

jest.mock("../../src/database");
const mockedReadObjects = readObjects as jest.Mock<ObjectsType>;
const mockedWriteObjects = writeObjects as jest.Mock<void>;

describe("index", () => {
  describe("getObject", () => {
    it("should return an object if there are freed objects, and change free to false", () => {
      const objects = [{ value: 1, free: true }];
      mockedReadObjects.mockImplementation(() => objects);
      expect(getObject()).toEqual({ value: 1, free: false });
    });
    it("should throw an error when there are no objects", () => {
      mockedReadObjects.mockImplementation(() => []);
      expect(() => getObject()).toThrow("There are no more free objects.");
    });
    it("should throw an error when there are no free objects", () => {
      const objects = [{ value: 1, free: false }];
      mockedReadObjects.mockImplementation(() => objects);
      expect(() => getObject()).toThrow("There are no more free objects.");
    });
  });
  describe("createObject", () => {
    it("should return an object as freed when it does not exist yet", () => {
      mockedReadObjects.mockImplementation(() => []);
      expect(createObject(1)).toEqual({ value: 1, free: true });
    });
    it("should add to the current objects when it does not exist yet", () => {
      mockedReadObjects.mockImplementation(() => []);
      mockedWriteObjects.mockImplementation();
      createObject(1);
      expect(mockedWriteObjects).toHaveBeenCalledWith([
        { value: 1, free: true },
      ]);
    });
    it("should throw an error when the object already exists", () => {
      const objects = [{ value: 1, free: true }];
      mockedReadObjects.mockImplementation(() => objects);
      expect(() => createObject(1)).toThrow("The object already exists.");
    });
  });
  describe("freeObject", () => {
    it("should return the object with free as true", () => {
      const objects = [{ value: 1, free: false }];
      mockedReadObjects.mockImplementation(() => objects);
      expect(freeObject(1)).toEqual({ value: 1, free: true });
    });
    it("should update the objects with free as true", () => {
      const objects = [{ value: 1, free: false }];
      mockedReadObjects.mockImplementation(() => objects);
      mockedWriteObjects.mockImplementation();
      freeObject(1);
      expect(mockedWriteObjects).toHaveBeenCalledWith([
        { value: 1, free: true },
      ]);
    });
    it("should throw an error when the object does not exist", () => {
      mockedReadObjects.mockImplementation(() => []);
      expect(() => freeObject(1)).toThrow(
        "The object you are trying to free does not exist."
      );
    });
  });
});
