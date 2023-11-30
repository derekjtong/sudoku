import mongoose from "mongoose";
const url = "mongodb://localhost:27017/sudoku";

function makeDB() {
    mongoose.connect(url).then(() => {
        console.log('Conected to db..')
    }).catch((err) => {
       console.log('Error...')
    })
}
export default makeDB;



