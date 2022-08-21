const db = require('../../data/models');
const sequelize = db.sequelize;
const Users = db.User;

const apiUsersController = {
    list : (req, res) => {
        Users.findAll()
            .then(users => { 
             let usersData = []
                users.forEach((user,i) => {
                   usersData[i] = {
                    id:user.id,
                    name:user.name,
                    email:user.email,
                    url:"api/users/"+user.id
                           }
                })
                              
                let respuesta = {
                    count:{
                        status: 200,
                        total: usersData.length,
                        url: "api/users"
                    },
                   data: usersData
                    
                   
                }
                
                res.json(respuesta)
            })
    },
    detail : (req, res) => {
        let userId = req.params.id
        
        Users.findByPk(userId)
            .then(user => {
                let respuesta = {
                    meta:{
                        status: 200,
                        url: "api/users/"+userId
                    },
                    data: {
                        id: user.id,
                        name: user.name,
                        surname: user.surname,
                        birth: user.birth,
                        adress:  user.adress,
                        email: user.email,
                        permission_id: user.permission_id,
                        avatar:  "/img/users/"+user.avatar                   
                    }
                }
                res.json(respuesta)
            });
    },

    

}

module.exports = apiUsersController;