const cron = require("node-cron");
const getLogger = require("../utils/logger");
const ItemService = require("../services/item.service");
const systemModel = require("../models/system.model");
const logger = getLogger("CRON_JOB");

const cronJobs = {
    checkExpiredMedicine: {
        name: "Check expired medicine",
        interval: "0 0 * * *", // Every day at 00:00
        task: null,
        callback: async () => {
            logger.info("Checking expired medicine...");
            try {
                const expiredMedicines = await ItemService.checkExpiredMedicine();
                logger.info(`Found ${expiredMedicines.length} expired medicines`);
            } catch (error) {
                logger.error("Error checking expired medicine", error);
            }
        }
    }
}

const startCronJobs = () => {
    Object.keys(cronJobs).forEach(async (job) => {
        if (cronJobs[job].task) {
            logger.info(`${cronJobs[job].name} is already running, stopping...`);
            cronJobs[job].task.stop();
        }

        cronJobs[job].task = cron.schedule(cronJobs[job].interval, cronJobs[job].callback);
        const system = await systemModel.findOne();
        if (cronJobs[job].name === "Check expired medicine")
            cronJobs[job].interval = system.checkExpiredMedicineInterval;

        logger.info(`${cronJobs[job].name} started with interval ${cronJobs[job].interval}`);
    })
}

const updateCronJobInterval = (job, interval) => {
    if (!cronJobs[job]) {
        logger.error(`${job} not found`);
        return;
    }

    cronJobs[job].interval = interval;
    startCronJobs();
}

module.exports = {
    startCronJobs,
    updateCronJobInterval
}