module.exports = (sequelize, dataTypes) => {
    let alias = "Cart" 
    let cols = { 
        id: { 
            type : dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        }, 
        products: {
            type: dataTypes.TEXT,
            allowNull: false
            
        },
        user_id: dataTypes.BIGINT(10).UNSIGNED,

    }
    let config = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }
    const Cart = sequelize.define(alias,cols,config)
    Cart.associate = function (models) {

        Cart.belongsTo(models.User, {
            
            as: "cart",
            foreignKey: "user_id",
       })
    }
    return Cart   
}