import { Hash } from './Hash';

export type PackageJson = {
  name: string;
  version: string;
  scripts: Hash<string>;
  dependencies: Hash<string>;
  devDependencies: Hash<string>;
};
