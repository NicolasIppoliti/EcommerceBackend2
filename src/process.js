import { Command } from 'commander';

const program = new Command();

program
    .option('-m, --mode <mode>', 'set mode for the application', 'development')
    .parse(process.argv);

export default program;