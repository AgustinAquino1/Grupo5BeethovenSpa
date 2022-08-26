module.exports = (sequelize, dataTypes) => {
    let alias = 'Permission'; // esto debería estar en singular
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        // created_at: dataTypes.TIMESTAMP,
        // updated_at: dataTypes.TIMESTAMP,
        permission_name: {
            type: dataTypes.STRING(255),
            allowNull: false
        }

    };
    let config = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }
    const Permission = sequelize.define(alias,cols,config);

    Permission.associate = function (models) {

        Permission.hasMany(models.User, {
            
            as: "users",
            foreignKey: "permission_id"
        })
    }



    return Permission
};