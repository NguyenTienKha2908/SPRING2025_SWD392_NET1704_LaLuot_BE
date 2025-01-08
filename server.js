const chalk = require("chalk");
const app = require("./src/app");
const getLogger = require("./src/utils/logger");
const logger = getLogger("SERVER");

const PORT = process.env.PORT || 8386;

const server = app.listen(PORT, () => {
  logger.info(
    `Server is running at ${chalk.magenta(
      chalk.underline("http://localhost:" + PORT)
    )}`
  );
});

process.on("SIGINT", () => {
  server.close(() => {
    logger.info(chalk.magenta("Server closed"));
    process.exit(0);
  });
});
