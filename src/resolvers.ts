import { getObject, createObject, freeObject } from "./index";

export default {
  Query: {},
  Mutation: {
    getObject() {
      return getObject();
    },
    createObject(parent: any, args: { input: { value: number } }) {
      return createObject(args.input.value);
    },
    freeObject(parent: any, args: { input: { value: number } }) {
      return freeObject(args.input.value);
    },
  },
};
