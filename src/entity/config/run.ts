import { Command } from "./command";

export type Run = {
  id: string;
  cwd?: string;
  command: Command[];
};
