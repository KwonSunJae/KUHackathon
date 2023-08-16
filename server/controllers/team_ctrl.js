const { where } = require("sequelize");
const db = require("../models");
const reaple = require("../models/reaple");
const logger = require("../modules/winton");

const team = {
    getTeam: async (req, res, next) => {
        let teamUuid = req.params.team_uuid;
        if (!teamUuid) {
            res.json({ results: false, message: "No request params" });
            return;
        }

        const likeNameList = db.team.findOne({ //heart 누른팀들 저장
            attributes: ["heart"],
            where: { uuid: teamUuid },
        })

        const likeNames = likeNameList.split(","); //heart 누른 팀들 리스트
        //heart 누른팀의 uuid들 저장
        const likeUuidList = await likeNames.map(async (name) => {
            const teamInfo = await team.findOne({
                attributes: ["uuid"],
                where: {
                    name: name,
                },
            });
        });


        db.team
            .findOne({ //likeUuidList , reapleList
                attributes: ["name", "profileImg", "readmeURL", "title", "description"],
                include: [
                    {
                        model: reaple,
                        attributes: ["name", "contents"],
                    },
                ],
                where: { uuid: teamUuid },
            })
            .then((data) => {
                res.send({ data, likeUuidList });
            })
            .catch((err) => {
                next(err);
            });
    },


};


const process = {
    likeTeam: async (req, res, next) => {
        let likeTeam_info = req.body;
        logger.info(JSON.stringify(req.body));

        const team_uuid = req.body.uuid;
        const like_team_name = req.body.likeTeamName;

        const like_team_list = await team.findOne({ //heart한 팀들 가져오기
            attributes: ["heart"],
            where: {
                uuid: team_uuid,
            },
        });

        const is_team_name = 0;
        if (like_team_list.includes(like_team_name)) {  //좋아요한 팀 존재 체크
            console.log("Team name already exists in heart");
            is_team_name = 1;
        }


        if (like_team_list.length >= 10 || is_team_name) {
            return res.status(400).json({ error: "좋아요 불가" });
        } else {
            like_team_list.push(like_team_name);
            db.team
                .update({
                    heart: JSON.stringify(like_team_list),
                },
                    {
                        where: { uuid: team_uuid, },
                    }).catch((error) => { console.log(error) });
        }

    },

    dislikeTeam: async (req, res, next) => {
        let likeTeam_info = req.body;
        logger.info(JSON.stringify(req.body));

        const team_uuid = req.body.uuid;
        const dislike_team_name = req.body.dislikeTeamName;

        const like_team_list = await team.findOne({ //heart한 팀들 가져오기
            attributes: ["heart"],
            where: {
                uuid: team_uuid,
            },
        });

        const filtered_team_list = like_team_list.filter(teamName => teamName !== dislike_team_name);

        if (like_team_list.length === filteredHeart.length) {
            console.log("Team not found in heart");
            return res.status(404).json({ message: "Team not found in heart" });
        }

        if (like_team_list.length >= 10 || is_team_name) {
            return res.status(400).json({ error: "좋아요 불가" });
        } else {
            like_team_list.push(like_team_name);
            db.team
                .update({
                    heart: JSON.stringify(like_team_list),
                },
                    {
                        where: { uuid: team_uuid, },
                    }).catch((error) => { console.log(error) });
        }

    },
};



module.exports = {
    team,
    process,
};