const cron = require('node-cron');
const DairlyTask = require(`./models/dairlyTask`);
const WeeklyTask = require(`./models/weeklyTask`);

// const getLeague = require(`./leagues`)
// 
class Scheduler {
    async #weeklySchedule() {
        const week = await WeeklyTask.saveWeeklyTask();
        // console.log(week)
    }
    async #dairlySchedule() {
        const task = await DairlyTask.saveTask();
    }
    // ...
    runDairly(interval) {
        this.#dairlySchedule();
        cron.schedule(interval, () => {
            this.#dairlySchedule();
        }, {
            // scheduled: true,
            // timezone: "America/Sao_Paulo"
        });
    }

    runWeekly(interval) {
        this.#weeklySchedule();
        cron.schedule(interval, () => {
            this.#weeklySchedule();
        });
    }
}
// 
module.exports = Scheduler;

function getMessageByTime() {
    const currentTime = new Date().getHours();
    if (currentTime < 12) {
        return 'Good morning! Have a great day ahead!';
    } else if (currentTime < 18) {
        return 'Good afternoon! Hope you\'re having a good day!';
    } else {
        return 'Good evening! Hope you had a wonderful day!';
    }
}