const mongoose = require(`mongoose`);

const DB_connection = async () => {
    try {
        const url = process.env.DB_URL;
        await mongoose.connect(url)
    } catch (error) {
        console.log(`Error`);
    }
};

module.exports = DB_connection;

// const DB_URL =
// mongoose.connect(DB_URL)
//     .then((results) => {
//         const port = process.env.PORT || 7700;
//         app.listen(7700, () => {
//         });
//     })
//     .catch((error) => { console.log(`Error`) })
