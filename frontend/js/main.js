// Import modules
import { Utilities } from "../modules/utilities.js"
const utilities = new Utilities();
// 
const dairlyEle = utilities.getDom(`#dairlyTasks`);
const weeklyEle = utilities.getDom(`#weeklyTasks`);
// 
const url1 = `/weeklyTtasks`;
const url2 = `/dairlyTtasks`;
// 
utilities.fetchData(url1, {}, res => {
    if (res.data) {
        const { data: { weeks } } = res;
        weeklyFunc(weeks)
    }
})
// 
utilities.fetchData(url2, {}, res => {
    if (res.data) {
        const { data: { dairly } } = res;
        dairlyFunc(dairly, dairlyEle)
    }
})

function weeklyFunc(items) {
    let weekCount = 0;
    items.map(item => {
        weekCount+=1
        weeklyEle.appendChild(utilities.setDom(`div`, {
            class: `list-group-item  outer`,
            data: {
                text: weekCount
            }
        }))
        dairlyFunc(item.tasks, weeklyEle);
    })
}
// 
function dairlyFunc(items, parent) {
    items.map(item => {
        const day = dayTask(item)
        parent.appendChild(day);
    })
}
// 
function dayTask(item) {
    const { day, task, time } = item;
    const nameEle = utilities.setDom(`div`, {
        class: `nameEle h5 `,
        data: {
            text: day
        }
    });
    const taskEle = utilities.setDom(`div`, {
        class: `taskEle`,
        data: {
            text: task
        }
    });
    const timeEle = utilities.setDom(`div`, {
        class: `timeEle`,
        data: {
            text: time
        }
    });

    return utilities.setDom(`div`, {
        class: `list-group-item  outer`,
        data: {
            append: [
                nameEle,
                taskEle,
                timeEle
            ]
        }
    });
}