import defaultErrorMap from "./locales/en.ts";
import itErrorMap from "./locales/it.ts";
import type { ZodErrorMap } from "./ZodError.ts";

let overrideErrorMap = defaultErrorMap;
export { defaultErrorMap, itErrorMap };

export function setErrorMap(map: ZodErrorMap) {
  overrideErrorMap = map;
}

export function getErrorMap() {
  return overrideErrorMap;
}
