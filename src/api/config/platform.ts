import { Mount, Platform } from "~/entity/config";

export class PlatformConfiguration {
  constructor(readonly platformConfig: Platform[]) {}

  useDockerImage(imageName: string): PlatformConfiguration {
    return this.applyPartial({ dockerImage: imageName });
  }

  useDockerfile(path: string, context: string): PlatformConfiguration {
    return this.applyPartial({
      dockerfile: { path, context },
    });
  }

  mountBind(host: string, guest: string): PlatformConfiguration {
    return this.applyMount({ type: "bind", host, guest });
  }

  mountVolume(guest: string, volumeName?: string): PlatformConfiguration {
    return this.applyMount({ type: "volume", guest, name: volumeName });
  }

  spread(): PlatformConfiguration[] {
    return this.platformConfig.map((c) => new PlatformConfiguration([c]));
  }

  private applyMount(mountObject: Mount) {
    const newMountConfig = this.platformConfig.map((conf) => {
      return { ...conf, mount: [...(conf.mount ?? []), mountObject] };
    });
    return new PlatformConfiguration(newMountConfig);
  }

  private forAllConfiguration(
    configurator: (conf: Platform) => Partial<Platform>
  ): Platform[] {
    return this.platformConfig.map((conf) => {
      const partialConfig = configurator(conf);

      return { ...conf, ...partialConfig };
    });
  }

  private applyPartial(partial: Partial<Platform>): PlatformConfiguration {
    return new PlatformConfiguration(
      this.forAllConfiguration((c) => ({ ...c, ...partial }))
    );
  }
}
