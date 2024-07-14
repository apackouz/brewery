import { SerializableError } from "../types/types";

export const toSerializeError = (error: unknown): SerializableError => {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack,
    };
  } else {
    return {
      name: "UnknownError",
      message: "An unknown error occurred",
    };
  }
};
