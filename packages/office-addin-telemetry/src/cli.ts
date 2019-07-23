import * as commander from "commander";
import * as commands from "./command";
commander.name("office-addin-telemetry");
commander.version(process.env.npm_package_version || "(version not available)");
commander
    .version("0.0.1");
commander
    .command("help")
    .description(`This package allows for sending telemetry event and exception data to the selected telemetry infrastructure (e.g. ApplicationInsights).`)
    .action(commands.help);

    commander.on("command:*", function() {
        console.error(`The command syntax is not valid.\n`);
        process.exitCode = 1;
        commander.help();
    });

    if (process.argv.length > 2) {
        commander.parse(process.argv);
    } else {
        commander.help();
    }
