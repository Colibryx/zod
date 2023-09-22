import defaultErrorMap from "./locales/en";
import itErrorMap from "./locales/it";
import type { ZodErrorMap } from "./ZodError";

let overrideErrorMap = defaultErrorMap;
export { defaultErrorMap, itErrorMap };

export function setErrorMap(map: ZodErrorMap) {
  overrideErrorMap = map;
}

export function getErrorMap() {
  return overrideErrorMap;
}
