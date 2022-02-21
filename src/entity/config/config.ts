import { Platform } from "./platform";
import { Run } from "./run";

export type Configuration = {
  platforms: Platform[];
  runs: Run[];
};
