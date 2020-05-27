

import Command from 'common-bin'

class Program extends Command {
    constructor() {
        super();
        this.yargs.scriptName('eumi');
        this.usage = 'Usage: [command] [options]';
        this.version = require('../package.json').version;
    }
}



new Program().start();
