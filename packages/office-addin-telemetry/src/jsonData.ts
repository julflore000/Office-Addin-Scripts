
import * as chalk from "chalk";
import * as fs from "fs";

/**
 * Allows developer to create prompts and responses in other applications before object creation
 * @param groupName Event name sent to telemetry structure
 * @param telemetryEnabled Whether user agreed to data collection
 * @returns boolean of whether the program should prompt
 */
export function promptForTelemetry(groupName: string, jsonFilePath): boolean {
    try {
        const jsonData: any = readTelemetryJsonData(jsonFilePath);
        if (jsonData) {
            return !groupNameExists(jsonData, groupName);
        }
        return true;
    } catch (err) {
        console.log(chalk.default.red(err));
    }
}

/**
 * Reads data from the telemetry json config file
 * @param jsonFilePath Path to the json config file
 * @returns parsed object from json file if it exists
 */
export function readTelemetryJsonData(jsonFilePath: string): any {
    if (fs.existsSync(jsonFilePath)) {
        const jsonData = fs.readFileSync(jsonFilePath, "utf8");
        return JSON.parse(jsonData.toString());
    }
}

/**
 * Writes data to the telemetry json config file
 * @param jsonData telemetry json data to write to the json config file
 * @param jsonFilePath Path to the json config file
 */
export function writeTelemetryJsonData(jsonData: any, jsonFilePath: string): void {
    fs.writeFileSync(jsonFilePath, JSON.stringify((jsonData), null, 2));
}

/**
 * Writes new telemetry json config file if one doesn't already exist
 * @param groupName telemetry group name to write to the json config file
 * @param telemetryEnabled specifies whether opted into telemetry collection
 * @param jsonFilePath Path to the json config file
 */
export function writeNewTelemetryJsonFile(groupName: string, telemetryEnabled, jsonFilePath: string): void {
    let jsonData = {};
    jsonData[groupName] = telemetryEnabled;
    jsonData = { telemetryInstances: jsonData };
    writeTelemetryJsonData(jsonData, jsonFilePath);
}

/**
 * Checks to see if a give group name exists in the specified json data
 * @param jsonData telemetry json data to search
 * @param groupName group name to search for in the specified json data
 * @returns boolean of whether group name exists
 */
export function groupNameExists(jsonData: any, groupName: string): boolean {
    return Object.getOwnPropertyNames(jsonData.telemetryInstances).includes(groupName);
}
