const cron = require("node-cron");
const getLogger = require("../utils/logger");
const ItemService = require("../services/item.service");
const systemModel = require("../models/system.model");
const WarehouseService = require("../services/warehouse.service");
const logger = getLogger("CRON_JOB");

const CRON_INTERVAL = {
    MINUTELY: "* * * * *",
    HOURLY: "0 * * * *",
    DAILY: "0 0 * * *",
    WEEKLY: "0 0 * * 0",
    MONTHLY: "0 0 1 * *"
}

const cronJobs = {
    checkExpiredMedicine: {
        name: "Check expired medicine",
        interval: CRON_INTERVAL.HOURLY, // Every day at 00:00
        task: null,
        callback: async () => {
            logger.info("🕒 Checking expired medicine...");
            try {
                const expiredMedicines = await ItemService.checkExpiredMedicine();
                logger.info(`🕒 Found ${expiredMedicines.length} expired medicines`);
            } catch (error) {
                logger.error("❌ Error checking expired medicine", error);
            }
        }
    },
    checkStockRequestDateInterval: {
        name: "Check stock request date",
        interval: CRON_INTERVAL.HOURLY, // Every day at 00:00
        task: null,
        callback: async () => {
            logger.info("🕒 Checking stock request date...");
            try {
                const stockRequests = await WarehouseService.checkStockRequestDate();
                logger.info(`🕒 Found ${stockRequests.length} stock requests not done exceeding the deadline`);
            } catch (error) {
                logger.error("❌ Error checking stock request date", error);
            }
        }
    }
}

const startCronJobs = () => {
    Object.keys(cronJobs).forEach(async (job) => {
        if (cronJobs[job].task) {
            logger.info(`🕒 ${cronJobs[job].name} is already running, stopping...`);
            cronJobs[job].task.stop();
        }

        const system = await systemModel.findOne();
        if (cronJobs[job].name === "Check expired medicine")
            cronJobs[job].interval = system.checkExpiredMedicineInterval;
        else if (cronJobs[job].name === "Check stock request date")
            cronJobs[job].interval = system.checkStockRequestDateInterval;

        cronJobs[job].task = cron.schedule(cronJobs[job].interval, cronJobs[job].callback);
        logger.info(`🕒 ${cronJobs[job].name} started with interval ${cronJobs[job].interval}`);
    })
}

const updateCronJobInterval = (job, interval) => {
    if (!cronJobs[job]) {
        logger.error(`❌ ${job} not found`);
        return;
    }

    cronJobs[job].interval = interval;
    startCronJobs();
}

module.exports = {
    startCronJobs,
    updateCronJobInterval,
    CRON_INTERVAL
}