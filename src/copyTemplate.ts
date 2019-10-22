import path from 'path';
import fs from 'fs-extra';
import glob from 'glob';
import { spawnSync } from 'child_process';
import { promisify } from 'util';
import signale from 'signale';

import { textHighlight } from './helpers';

import { PackageJson, CopyTemplate } from './types';

const globPromise = promisify(glob);

const CWD_PATH = process.cwd();
const TEMPLATE_PATH = path.resolve(__dirname, '../template');

export function copyTemplate({ projectName, useNpm }: CopyTemplate) {
  const PROJECT_PATH = path.resolve(CWD_PATH, projectName);
  const chosenPackageManager = useNpm ? 'npm' : 'yarn';

  function createProjectFolder() {
    return fs.pathExists(PROJECT_PATH).then(exists => {
      if (!exists) {
        return fs.mkdir(PROJECT_PATH).then(() => {
          signale.success('Project folder created!');
        });
      }

      throw new Error(`Folder "${PROJECT_PATH}" already exists`);
    });
  }

  function generatePackageJson(): PackageJson {
    const defaultPackage = {
      name: projectName,
      version: '1.0.0',
      scripts: {
        build: 'rollup -c',
        autobuild: 'rollup -c -w',
        dev: 'run-p start autobuild',
        prestart: 'yarn build',
        start: 'node server.js',
      },
      dependencies: {},
      devDependencies: {
        'live-server': '^1.2.1',
        'npm-run-all': '^4.1.5',
        rollup: '^1.12.0',
        'rollup-plugin-commonjs': '^10.0.0',
        'rollup-plugin-livereload': '^1.0.0',
        'rollup-plugin-node-resolve': '^5.2.0',
        'rollup-plugin-svelte': '^5.0.3',
        'rollup-plugin-terser': '^4.0.4',
        svelte: '^3.0.0',
      },
    };

    return defaultPackage;
  }

  function writePackageJson(packageJson: PackageJson) {
    const packageJsonPath = path.resolve(PROJECT_PATH, 'package.json');
    return fs
      .writeJSON(packageJsonPath, packageJson, { spaces: 2 })
      .then(() => {
        signale.success('package.json generate successfully');
      })
      .catch(() => {
        throw new Error('Something went wrong while writing package.json');
      });
  }

  async function getTemplateFiles() {
    function removeFolders(filePath: string) {
      return fs.lstatSync(filePath).isFile();
    }

    const files = await globPromise(`${TEMPLATE_PATH}/**/*`);

    console.log('files', files);

    return files.filter(removeFolders);
  }

  async function copyTemplateFiles(fileList: string[]) {
    fileList.forEach(filePath => {
      const destPath = filePath.replace(TEMPLATE_PATH, PROJECT_PATH);
      fs.copySync(filePath, destPath);
    });

    signale.success('Template files copied');
  }

  function installDependencies() {
    signale.info(`Installing dependencies with ${chosenPackageManager}\n`);

    spawnSync(chosenPackageManager, ['install'], {
      stdio: 'inherit',
      cwd: PROJECT_PATH,
    });
  }

  function onSuccess() {
    signale.log();
    signale.success(`Created "${projectName}" at ${textHighlight(PROJECT_PATH)}
  Inside that directory, you can run several commands:

    ${textHighlight(`${chosenPackageManager} ${useNpm ? 'run dev' : 'dev'}`)}
      Starts the development server.

    ${textHighlight(`${chosenPackageManager} start`)}
      Starts build your app and run a http server (check how it'll look like on production).

    ${textHighlight(
      `${chosenPackageManager} ${useNpm ? 'run build' : 'build'}`
    )}
      Bundles the app into static files for production.

  Good luck! 🥳
    `);
  }

  function onError(err: Error) {
    signale.fatal(err);
  }

  signale.log('\n');
  signale.start('Creating a new Svelte app in', PROJECT_PATH);

  return createProjectFolder()
    .then(generatePackageJson)
    .then(writePackageJson)
    .then(getTemplateFiles)
    .then(copyTemplateFiles)
    .then(installDependencies)
    .then(onSuccess)
    .catch(onError);
}
