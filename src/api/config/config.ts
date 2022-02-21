import { PlatformConfiguration } from "./platform";

export class AndromedaConfiguration {
  createPlatform(): PlatformConfiguration {
    return new PlatformConfiguration([{}]);
  }

  for(...config: PlatformConfiguration[]): PlatformConfiguration {
    return new PlatformConfiguration(config.flatMap((c) => c.platformConfig));
  }
}

export const andromeda = new AndromedaConfiguration();
