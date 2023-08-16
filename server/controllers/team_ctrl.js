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
                    attributes: ["name", "contents"]
                }).then((datas) => {
                    res.send({
                        name: data.name,
                        profileImg: data.profileImg,
                        readmeURL: data.readmeURL,
                        title: data.title,
                        description: data.description,
                        likeNameList: data.heart,
                        reapleList: datas
                    });
                })
                    .catch((e) => {
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

        db.team.findOne({
            attributes : ["heart"],
            where : {
            uuid : teamUuid
        }}).then((data)=>{
            const team_list = JSON.parse(data.heart);
            if(team_list.length >=10){
                res.send({isAvailable : false});
            }
            else{
                res.send({isAvailable:true});
            }
        })

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
            .then((data) => {
                console.log(data);
                const team_list = JSON.parse(data.heart);
                team_list.forEach(team => {
                    like_team_list.push(team);
                });
                console.log(team_list);
                var is_team_name = false;
                if (like_team_list.includes(like_team_name)) {  //좋아요한 팀 존재 체크
                    console.log("Team name already exists in heart");
                    res.status(400).send({ error: "error" });
                    is_team_name = true;
                    return;
                }

                if (like_team_list.length >= 10 || is_team_name) {
                    res.status(400).send({ error: "error" });
                    return;
                } else {
                    like_team_list.push(req.body.likeTeamName);

                    db.team
                        .update({
                            heart: JSON.stringify(like_team_list),
                        },
                            {
                                where: { uuid: teamUuid, },
                            }).then((data) => {
                                console.log(data);
                                res.send(data);

                            })
                        .catch((error) => { console.log(error) });
                }
            })



    },

    dislikeTeam: async (req, res, next) => {
        let likeTeam_info = req.body;
        logger.info(JSON.stringify(req.body));

        const teamUuid = req.body.uuid;
        const dislike_team_name = req.body.dislikeTeamName;
        const like_team_list = [];
        db.team.findOne({
            attributes: ["heart"],
            where: {
                uuid: teamUuid
            }
        })
            .then((data) => {
                const team_list = JSON.parse(data.heart);
                team_list.forEach(team => {
                    like_team_list.push(team);
                });
                console.log(team_list);
                console.log(req.body.dislikeTeamName);
                var is_team_name = false;
                if (team_list.includes(req.body.dislikeTeamName)) {  //좋아요한 팀 존재 체크
                    const filtered_team_list = team_list.filter(teamName => teamName !== req.body.dislikeTeamName);
                    
                    db.team.update({
                        heart : JSON.stringify(filtered_team_list)
                    },{
                        where : {
                            uuid : teamUuid
                        }
                    }).then((data)=>{
                        res.send(data);
                    }).catch((e)=>{
                        next(e);
                    })
                }
                else{
                    res.status(400).send({message : "isAleady removed"});
                }

            })

    },

    getAuth: async (req, res, next) => {
        let likeTeam_info = req.body;
        logger.info(JSON.stringify(req.body));

        const name = req.body.name;
        const pw = req.body.pw;

        db.team.findOne({
            where: {
                name: name
            }
        }).then((data) => {
            if (data.pw === pw) {
                res.send({
                    uuid: data.uuid
                });
            }
            else {
                res.send({
                    uuid: "error"
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
                profileImg: profileImg,
                readmeURL: readmeURL,
                title: title,
                description: description,

            },
            {
                where: {
                    uuid: uuid
                }
            }

        )
            .then((data) => {
                res.send(data);
            })
            .catch((e) => {
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