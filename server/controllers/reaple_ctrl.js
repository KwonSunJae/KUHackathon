const { where } = require("sequelize");
const db = require("../models");
const reaple = require("../models/reaple");
const logger = require("../modules/winton");

const reaples = {

};


const process = {
    writeReaple: async (req, res, next) => {
        const name = req.body.name;
        const teamUuid = req.body.teamUuid;
        const contents = req.body.contents;

        if (!teamUuid) {
            res.json({ results: false, message: "No teamUuid" });
            return;
        }
        else {
            db.reaple
                .create({
                    name: name,
                    teamUuid: teamUuid,
                    contents, contents,
                },).then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    },
};



module.exports = {
    reaples,
    process,
};