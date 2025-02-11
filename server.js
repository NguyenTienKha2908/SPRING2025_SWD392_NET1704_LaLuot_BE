const chalk = require("chalk");
const app = require("./src/app");
const getLogger = require("./src/utils/logger");
const logger = getLogger("SERVER");

const PORT = process.env.NODE_ENV === "dev" ? process.env.DEV_APP_PORT : process.env.PRO_APP_PORT;

const server = app.listen(PORT, () => {
  logger.info(
    `Server is running at ${chalk.magenta(
      chalk.underline(`${process.env.APP_BASE_URL}/api/v1`)
    )}`
  );
});

process.on("SIGINT", () => {
  server.close(() => {
    logger.info(chalk.magenta("Server closed"));
    process.exit(0);
  });
});