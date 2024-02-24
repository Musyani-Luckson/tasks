const mongoose = require("mongoose")
const Schema = mongoose.Schema;
// 
const dairlySchema = new Schema({
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
dairlySchema.statics.removeTasks = async function () {
    try {
        const result = await this.deleteMany();
        // console.log("Tasks removed:", result.deletedCount);
    } catch (error) {
        // console.error("Error removing tasks:", error);
    }
}

dairlySchema.statics.saveTask = async function () {
    const currentValues = getCurrentDayAndTime();
    const { day, time } = currentValues;
    try {
        const task = await this.create({
            task: `backup`, day, time,
        });
        return task;
    } catch (error) {
        throw new Error(error.message);
    }
}

dairlySchema.statics.getTasks = async function () {
    try {
        const tasks = await this.find();
        return tasks;
    } catch (error) {
        throw new Error(error.message);
    }
}


const DairlyTask = mongoose.model("dairlyTask", dairlySchema);
module.exports = DairlyTask;

function getCurrentDayAndTime() {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const now = new Date();
    const dayOfWeek = daysOfWeek[now.getDay()];
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    return {
        day: dayOfWeek,
        time
    }
}

