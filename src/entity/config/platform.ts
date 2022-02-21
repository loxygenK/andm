import { Command } from "./command";
import { Mount } from "./mount";

export type Platform = {
  dockerImage?: string;
  dockerfile?: DockerfileConfigration;
  mount?: Mount[];
  build?: Command;
};

export type DockerfileConfigration = {
  path: string;
  context: string;
};
