import { Command, flags } from '@oclif/command';
import { copyTemplate } from './copyTemplate';

class GenerateSvelteApp extends Command {
  static description = 'describe the command here';

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({ char: 'v' }),
    help: flags.help({ char: 'h' }),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({ char: 'n', description: 'name to print' }),
    npm: flags.boolean({
      description: 'Sets to install dependencies using npm instead yarn',
    }),
  };

  async run() {
    const { flags } = this.parse(GenerateSvelteApp);

    if (flags.name) {
      await copyTemplate({ projectName: flags.name, useNpm: flags.npm });
    }
  }
}

export = GenerateSvelteApp;
