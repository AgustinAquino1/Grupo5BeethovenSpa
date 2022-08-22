module.exports = (sequelize, dataTypes) => {
    let alias = 'User'; // esto debería estar en singular
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        // created_at: dataTypes.TIMESTAMP,
        // updated_at: dataTypes.TIMESTAMP,
        name: {
            type: dataTypes.STRING(500),
            allowNull: false
        },
        surname: {
            type: dataTypes.STRING(500),
            allowNull: false
        },
        birth: {
            type: dataTypes.STRING(500),
        },
        adress: {
            type: dataTypes.STRING(500),
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(500),
            allowNull: false
        },
        pass:{
            type: dataTypes.STRING(500),
            allowNull: false
        },
        pass2:{
            type: dataTypes.STRING(500),
            allowNull: false
        },
        permission_id: dataTypes.BIGINT(10).UNSIGNED,
        avatar:{
            type: dataTypes.STRING(500),
            allowNull: false
        }
    };
    let config = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }
    const User = sequelize.define(alias,cols,config);

    User.associate = function (models) {

        User.belongsTo(models.Permission, {
            as: "permission",
            foreignKey: "permission_id",
        })
    }

    return User
};