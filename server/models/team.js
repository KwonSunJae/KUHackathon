const { v4: uuidv4 } = require('uuid'); // uuid 모듈에서 v4 함수를 가져옴

module.exports = (sequelize, DataTypes) => {
    const team = sequelize.define(
        "team",
        {
            uuid: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true,
                defaultValue: () => uuidv4(), // uuidv4 함수를 사용하여 자동 생성
            },
            name: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            pw: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            profileImg: {
                type: DataTypes.TEXT,
                allowNull: true,
                
            },
            readmeURL: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            title: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            heart: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
        },
        {
            sequelize,
            tableName: "team",
            timestamps: true,
        }
    );
    team.associate = (models) => {
        team.hasMany(models.reaple, {
            foreignKey: "team_uuid",
            onDelete: "cascade",
            allowNull: "false",
        });
    };
    return team;
};