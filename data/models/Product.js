module.exports = (sequelize, dataTypes) => {
    let alias = 'Product'; // esto debería estar en singular
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
            type: dataTypes.STRING(255),
            allowNull: false
        },
        category: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        pet_size: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        pet_type: {
            type: dataTypes.STRING(500),
        },
        pet_age: {
            type: dataTypes.STRING(500),
        },
        breed: {
            type: dataTypes.STRING(500),
        },
        f_image:{
            type: dataTypes.STRING(500),
            allowNull: false
        },
        image:{
            type: dataTypes.STRING(500),
            allowNull: false
        },
        image1:{
            type: dataTypes.STRING(500),
            allowNull: false
        },
        image2:{
            type: dataTypes.STRING(500),
            allowNull: false
        },
        color:{
            type: dataTypes.STRING(500),
        },
        description:{
            type: dataTypes.STRING(1000),
            allowNull: false
        },
        price:{
            type: dataTypes.INTEGER,
            allowNull: false
        },
        stock:{
            type: dataTypes.INTEGER,
            allowNull: false
        },
        brand:{
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
    const Product = sequelize.define(alias,cols,config);

    Product.associate = function (models) {

        Product.belongsToMany(models.User, {
            
            as: "users",
            foreignKey: "product_id",
            through: "order",
            otherKey: "user_id",
            timestamps: false
        })
    }



    return Product
};