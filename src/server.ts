import http from "http";
import {createApp} from "./app";
import mongoose from "mongoose";
import {env} from "./common/lib/config/env";
import logger from "./common/pkg/logger/logger";
import {cacheProvider} from "./common/lib/cache/init";

const app = createApp();
const server = http.createServer(app);
server.listen(env.app_port, () => {
    logger.info(`Server started on port ${env.app_port}`);
});

let isShuttingDown = false;

async function shutdown() {
    if (isShuttingDown) return;
    isShuttingDown = true;
    logger.info(`Shutting down...`);

    // Force exit if connections don't close within 3 seconds
    setTimeout(() => {
        logger.error("Forcing shutdown due to hung connections.");
        process.exit(1);
    }, 3000).unref();

    server.close(async () => {
        await Promise.allSettled([
            mongoose.connection.close(),
            cacheProvider.close(),
        ]);
        process.exit(0);
    });
}

process.on('SIGINT', shutdown);

process.on('SIGTERM', shutdown);
