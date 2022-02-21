import { Mount, Platform } from "~/entity/config";
import andromeda from "~";

import { PlatformConfiguration } from "~/api/config/platform";

describe("PlatformConfig", () => {
  it("can be generated from `andromeda`", () => {
    const platform = andromeda.createPlatform();

    expect(platform).toBeInstanceOf(PlatformConfiguration);
  });

  it("can create image configuration", () => {
    const dockerImageConfig = andromeda
      .createPlatform()
      .useDockerImage("docker-image");
    const dockerfileConfig = andromeda
      .createPlatform()
      .useDockerfile("Dockerfile", ".");

    expect(dockerImageConfig.platformConfig[0].dockerImage).toBe(
      "docker-image"
    );
    expect(dockerfileConfig.platformConfig[0].dockerfile).toStrictEqual({
      context: ".",
      path: "Dockerfile",
    });
  });

  it("can create mount configuration", () => {
    const mountConfig = andromeda
      .createPlatform()
      .mountBind("./src", "/deploy/src")
      .mountBind("./public", "/deploy/public")
      .mountBind("./package.json", "/deploy/package.json")
      .mountVolume("/deploy/dist")
      .mountVolume("/deploy/node_modules", "container-node_modules");

    expect(mountConfig.platformConfig[0].mount).toStrictEqual([
      { type: "bind", host: "./src", guest: "/deploy/src" },
      { type: "bind", host: "./public", guest: "/deploy/public" },
      { type: "bind", host: "./package.json", guest: "/deploy/package.json" },
      { type: "volume", guest: "/deploy/dist", name: undefined },
      {
        type: "volume",
        guest: "/deploy/node_modules",
        name: "container-node_modules",
      },
    ]);
  });

  it("can apply the configuration to multiple config once", () => {
    const windows = andromeda
      .createPlatform()
      .useDockerImage("some-nice-windows-image");

    const macos = andromeda
      .createPlatform()
      .useDockerImage("some-nice-macos-image");

    const linux = andromeda
      .createPlatform()
      .useDockerImage("some-nice-linux-image")
      .mountBind("~/.dotfiles", "/root/.dotfiles");

    const [mountWin, mountMacos, mountLinux] = andromeda
      .for(windows, macos, linux)
      .mountBind("./src", "/deploy/src")
      .mountVolume("/deploy/node_modules", "container-node_modules")
      .spread();

    const commonlyAppliedMountConfig: Mount[] = [
      { type: "bind", host: "./src", guest: "/deploy/src" },
      {
        type: "volume",
        guest: "/deploy/node_modules",
        name: "container-node_modules",
      },
    ];
    const mountWinExpectation: Platform = {
      dockerImage: "some-nice-windows-image",
      mount: commonlyAppliedMountConfig,
    };
    const mountMacosExpectation: Platform = {
      dockerImage: "some-nice-macos-image",
      mount: commonlyAppliedMountConfig,
    };
    const mountLinuxExpectation: Platform = {
      dockerImage: "some-nice-linux-image",
      mount: [
        { type: "bind", host: "~/.dotfiles", guest: "/root/.dotfiles" },
        ...commonlyAppliedMountConfig,
      ],
    };
    expect(mountWin.platformConfig[0]).toStrictEqual(mountWinExpectation);
    expect(mountMacos.platformConfig[0]).toStrictEqual(mountMacosExpectation);
    expect(mountLinux.platformConfig[0]).toStrictEqual(mountLinuxExpectation);
  });
});
