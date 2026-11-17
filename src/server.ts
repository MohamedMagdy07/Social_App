import http from "http";
import {createApp} from "./app";
import mongoose from "mongoose";
import {env} from "./common/lib/config/env";
import logger from "./common/pkg/logger/logger";

const app = createApp();
const server = http.createServer(app);
server.listen(env.app_port, () => {
    logger.info(`Server started on port ${env.app_port}`);
});


async function shutdown() {
    logger.info(`Shutting down...`);

    // Force exit if connections don't close within 3 seconds
    setTimeout(() => {
        logger.error("Forcing shutdown due to hung connections.");
        process.exit(1);
    }, 3000);

    server.close(async () => {
        await mongoose.connection.close();
        process.exit(0);
    });
}

process.on('SIGINT', shutdown);

process.on('SIGTERM', shutdown);