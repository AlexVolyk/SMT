const Express = require('express');
// Imports Express dependency into the application
const app = Express();
// Top level function allowing access to all if its methods
const controllers = require("./controllers")

const dbConnection = require('./db')

const middlewares = require('./middleware')


app.use(Express.json())

// app.listen(3000, () => {
//     console.log(`[Server] is running`)
// });


// app.use('/test', (req, res) => {
//     res.send(`Test endpoint hit /test!`)
// });

dbConnection.authenticate()
    .then(() => dbConnection.sync())
    // .sync() syncs models or schemas to database
    .then(() => {
        app.listen(3000, () => {
            console.log(`[Server] is running on 3000`)
        })
    })
    .catch((err) => {
        console.log(`[Server] crashed ${err}`)
    })

        
    app.use(middlewares.CORS)
    app.use("/user", controllers.userController)
    app.use("/pies", controllers.pieController)
