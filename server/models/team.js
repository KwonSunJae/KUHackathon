module.exports = (sequelize, DataTypes) => {
    const team = sequelize.define(
        "team",
        {
            uuid: {
                type: DataTypes.TEXT,
                allowNull: false,
                primaryKey: true,
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
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            readmeURL: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            title: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            heart: {
                type: DataTypes.TEXT,
                allowNull: false,
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