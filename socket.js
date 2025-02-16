require("dotenv").config();

const getLogger = require("./src/utils/logger");
const logger = getLogger("SOCKET.IO");
const chalk = require("chalk");

const EventEmitter = require("events");
const errorModel = require("./src/models/error.model");
const eventEmitter = new EventEmitter();

const socket = (io) => {
    if (io.listeners("connection").length > 0) {
        console.log(io.listeners("connection").length);
        return; // Prevent duplicate listeners
    }

    const socketPath = io._path
    logger.info("⚡ Socket.io is running at " + chalk.magenta(chalk.underline(`${process.env.APP_BASE_URL}${socketPath}`)));

    io.on("connection", (socket) => {
        logger.info("⚡ A user connected");

        socket.on("disconnecting", () => {
            logger.info("⚡ A user is disconnecting");
        });
        socket.on("disconnect", () => {
            logger.info("⚡ A user disconnected");
        });
        socket.on("error", async (error) => {
            logger.error(error);
            await errorModel.create({
                code: "SOCKET_ERROR",
                message: error,
                file: "socket.js",
                function: "socket.on('error')",
                stackTrace: "Error in socket.io",
            })
        });

        eventEmitter.on("checkExpiredMedicine", async (expiredMedicines) => {
            socket.emit("expiredMedicines", expiredMedicines);
        })
    });

}


module.exports = { eventEmitter, socket };