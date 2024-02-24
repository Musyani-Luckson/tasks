const express = require(`express`);
const app = express();

require(`dotenv`).config();
const DB_connection = require(`./DB_Connection`);
DB_connection();

app.use(express.json());
app.use(express.static(`frontend`));

const Schedular = require(`./backend/Schedular`);
const DairlyTask = require(`./backend/models/dairlyTask`);
const WeeklyTask = require(`./backend/models/weeklyTask`);

const scheduler = new Schedular();

scheduler.runDairly('0 0 0 * * *');
scheduler.runWeekly('0 0 * * sunday');

app.get(`/task`, (req, res) => {
    res.sendFile(`./frontend/views/tasks.html`, {
        root: __dirname
    })
})

app.get(`/weeklyTtasks`, async (req, res) => {
    const weeks = await WeeklyTask.find();
    res.send({ weeks })
})
// 
app.get(`/dairlyTtasks`, async (req, res) => {
    const dairly = await DairlyTask.getTasks();
    res.send({ dairly })
})

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Listening on PORT: [${PORT}]`);
});

