module.exports = (sequelize, dataTypes) => {
    let alias = 'Category'; // esto debería estar en singular
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        // created_at: dataTypes.TIMESTAMP,
        // updated_at: dataTypes.TIMESTAMP,
        category_name: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        image: {
            type: dataTypes.STRING(255)
        }

    };
    let config = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }
    const Category = sequelize.define(alias,cols,config);

    Category.associate = function (models) {

        Category.hasMany(models.Product, {
            
            as: "products",
            foreignKey: "category_id",
        })
    }



    return Category
};