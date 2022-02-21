export type Mount = BindMount | VolumeMount;

export type BindMount = {
  type: "bind";
  host: string;
  guest: string;
};

export type VolumeMount = {
  type: "volume";
  name?: string;
  guest: string;
};
