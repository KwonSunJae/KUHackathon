const { where } = require("sequelize");
const db = require("../models");
const reaple = require("../models/reaple");
const team = require("../models/team");
const logger = require("../modules/winton");


const teams = {


    getMain: async (req, res, next) => {

        const allTeams = await db.team.findAll({
            attributes: ["name", "title", "profileImg", "uuid"],
        });

        // teams 배열 생성
        const teams = allTeams.map(team => ({
            name: team.name,
            title: team.title,
            profileImg: team.profileImg,
            uuid: team.uuid,
        }));
        return res.status(200).json({ teams: teams });
    },

    getTeam: async (req, res, next) => {
        let teamUuid = req.params.uuid;
        if (!teamUuid) {
            res.json({ results: false, message: "No request params" });
            return;
        }


        db.team.findOne({ //likeUuidList , reapleList
            attributes: ["name", "profileImg", "readmeURL", "title", "description", "heart"],
        })
            .then((data) => {
                db.reaple.findAll({
                    attributes : ["name", "contents"]
                }).then((datas)=>{
                    res.send({
                        name : data.name,
                        profileImg : data.profileImg,
                        readmeURL : data.readmeURL,
                        title : data.title,
                        description: data.description,
                        likeNameList : data.heart,
                        reapleList : datas
                    });
                })
                .catch((e)=>{
                    next(e);
                })
                
            })
            .catch((err) => {
                next(err);
            });
    },


    isLikeAvailable: async (req, res, next) => {
        const teamUuid = req.params.uuid;
        if (!teamUuid) {
            res.json({ results: false, message: "No request params" });
            return;
        }

        const like_team_list = await team.findOne({ //heart한 팀들 가져오기
            attributes: ["heart"],
            where: {
                uuid: teamUuid,
            },
        });

        const is_team_name = 0;
        if (like_team_list.includes(like_team_name)) {  //좋아요한 팀 존재 체크
            console.log("Team name already exists in heart");
            is_team_name = 1;
        }

        if (like_team_list.length >= 10 || is_team_name) {
            return res.status(400).json({ isAvailable: false });
        } else {
            return res.status(200).json({ isAvailable: true });
        }

    }
};


const process = {
    likeTeam: async (req, res, next) => {
        let likeTeam_info = req.body;
        logger.info(JSON.stringify(req.body));

        const teamUuid = req.body.uuid;
        const like_team_name = req.body.likeTeamName;

        let like_team_list = [];
        db.team.findOne({ //heart한 팀들 가져오기
            attributes: ["heart"],
            where: {
                uuid: teamUuid,
            },
        })
        .then((data)=>{
            
            
        })
        
        const currentHeart = like_team_list.heart ? JSON.parse(like_team_list.heart) : [];
        like_team_list = [];
        currentHeart.forEach(teamName => {
            like_team_list.push(teamName);
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
                        where: { uuid: teamUuid, },
                    }).catch((error) => { console.log(error) });
        }

    },

    dislikeTeam: async (req, res, next) => {
        let likeTeam_info = req.body;
        logger.info(JSON.stringify(req.body));

        const teamUuid = req.body.uuid;
        const dislike_team_name = req.body.dislikeTeamName;

        const like_team_list = await team.findOne({ //heart한 팀들 가져오기
            attributes: ["heart"],
            where: {
                uuid: teamUuid,
            },
        });

        const filtered_team_list = like_team_list.filter(teamName => teamName !== dislike_team_name);

        if (like_team_list.length === filtered_team_list.length) { //제외된 팀이 없으면 dislike 불가
            console.log("Team not found in heart");
            return res.status(404).json({ message: "Team not found in heart" });
        } else {
            db.team
                .update({
                    heart: JSON.stringify(filtered_team_list),
                },
                    {
                        where: { uuid: team_uuid, },
                    })
                .catch((error) => { console.log(error) });
        }

    },

    getAuth: async (req, res, next) => {
        let likeTeam_info = req.body;
        logger.info(JSON.stringify(req.body));

        const name = req.body.name;
        const pw = req.body.pw;

        db.team.findOne({
            where : {
                name : name
            }
        }).then((data)=>{
            if(data.pw === pw){
                res.send({
                    uuid : data.uuid
                });
            }
            else{
                res.send({
                    uuid : "error"
                });
            }
        })
    },

    updateTeam: async (req, res, next) => {
        let likeTeam_info = req.body;
        logger.info(JSON.stringify(req.body));

        const uuid = req.body.uuid;
        const profileImg = req.body.profileImg;
        const readmeURL = req.body.readmeURL;
        const title = req.body.title;
        const description = req.body.description;
        db.team.update(
            {
                profileImg : profileImg,
                readmeURL : readmeURL,
                title : title,
                description : description,

            },
            {where : {
                uuid : uuid
            }}

        )
        .then((data)=>{
            res.send(data);
        })
        .catch((e)=>{
            next(e);
        })
    },
    addTeam: async (req, res, next) => {
        let user_info = req.body;
        logger.info(JSON.stringify(req.body));

        let flag = false;
        if (user_info == null) {
            res.json({ results: false, message: "No request body" });
            return;
        }
        db.team
            .create({
                name: user_info.name,
                pw: user_info.pw,

            })
            .then((results) => {

                console.log(results);
                res.status(200).json({ result: results });
            })
            .catch((err) => {
                next(err);
                res.status(503).json("error");
            });

    }


}


module.exports = {
    teams,
    process,
};