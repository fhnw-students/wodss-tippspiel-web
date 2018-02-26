import { validate } from "validate.js";

export type Validator = (value: any) => undefined | string[];

export const isEmail = (value: any): undefined | string[] => {
  const result = validate({ value }, {
      value: {
        email: true
      }
    });
  return (result) ? result.value : result;
};
