const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const DairlyTask = require(`./dairlyTask`);

const dairlyTask = new Schema({
    task: {
        type: String,
        default: ``
    },
    day: {
        type: String,
        default: ``
    },
    time: {
        type: String,
        default: ``
    },
});
// 
const weeklySchema = new Schema({
    tasks: [dairlyTask],
    weeks: {
        type: Number,
        default: 0
    }
});

weeklySchema.statics.saveWeeklyTask = async function () {
    const tasks = await DairlyTask.getTasks();
    try {
        const weeklyTasks = [];
        tasks.forEach(task => {
            weeklyTasks.push({
                task: task.task,
                day: task.day,
                time: task.time
            });
        });

        const week = await this.create({
            tasks: weeklyTasks
        });
        // await DairlyTask.removeTasks();
        return week;
    } catch (error) {
        throw new Error(error.message);
    }
}

const WeeklyTask = mongoose.model("weeklytask", weeklySchema);
module.exports = WeeklyTask;
