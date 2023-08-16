module.exports = (sequelize, DataTypes) => {
    const reaple = sequelize.define(
        "reaple",
        {
            name: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            contents: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
        },
        {
            sequelize,
            tableName: "reaple",
            timestamps: true,
        }
    );
    reaple.associate = (models) => {
        reaple.belongsTo(models.team, {
            foreignKey: "team_uuid",
        })
    }
    return reaple;
};