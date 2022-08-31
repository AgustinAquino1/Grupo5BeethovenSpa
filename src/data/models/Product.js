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
        category_id: dataTypes.BIGINT(10).UNSIGNED,
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
        },
        image:{
            type: dataTypes.STRING(500),
        },
        image1:{
            type: dataTypes.STRING(500),
        },
        image2:{
            type: dataTypes.STRING(500),
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

        Product.belongsTo(models.Category, {
            
         
            foreignKey: "category_id",
        })
    }



    return Product
};