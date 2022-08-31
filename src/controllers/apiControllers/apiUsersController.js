const db = require('../../data/models');
const sequelize = db.sequelize;
const Users = db.User;

const apiUsersController = {
    list : (req, res) => {
        const pageAsNumber = Number.parseInt(req.query.page)
        const sizeAsNumber = Number.parseInt(req.query.limit)
        let page= 0;
        if(!Number.isNaN(pageAsNumber) && pageAsNumber> 0){
            page = pageAsNumber
        }

        let size = 10
        if(!Number.isNaN(sizeAsNumber) && sizeAsNumber>= 0 && sizeAsNumber<=21){
            size= sizeAsNumber
        }
        Users.findAndCountAll({
            limit: size,
            offset: page*size})
            .then(usersRows => { 
                const users = usersRows.rows

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
                        total: usersRows.count,
                        url: "api/users",
                        totalPages: Math.ceil(users.count / size),
                        nextUrl: page >=0  && (page != ((Math.ceil(usersRows.count / size))-1))? `http://localhost:3000/api/users?page=${page+1}&limit=${size}` : "",
                        previousUrl: page && (page != 0) ? `http://localhost:3000/api/users?page=${page-1}&limit=${size}` : "",
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