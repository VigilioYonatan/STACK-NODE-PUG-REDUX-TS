import { NextFunction, Request, Response } from "express";
import { dateNow, uniqueID } from "~/helpers/helper";
import fs from "fs";
import path from "path";

const logEvents = async (message: string, logFileName: string) => {
    const dateTime = `${dateNow()}`;
    const logItem = `${dateTime}\t${uniqueID()}\t${message}\n`;
    try {
        if (!fs.existsSync(path.join(__dirname, "..", "..", "logs"))) {
            await fs.promises.mkdir(path.join(__dirname, "..", "..", "logs"));
        }

        await fs.promises.appendFile(
            path.join(__dirname, "..", "..", "logs", logFileName),
            logItem
        );
    } catch (error) {
        console.log(error);
    }
};

const logger = (req: Request, _res: Response, next: NextFunction) => {
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, `reqLog.log`);
    console.log(`${req.method} ${req.path}`);
    next();
};

const errorHandler = (err: Error, req: Request, res: Response) => {
    logEvents(
        `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
        "errLog.log"
    );
    console.log(err.stack);

    const status = res.statusCode ? res.statusCode : 500;
    res.status(status);
    res.json({ message: err.message });
};

export { logEvents, logger, errorHandler };