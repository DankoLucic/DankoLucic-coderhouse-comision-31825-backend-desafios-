import express from "express"
import { engine } from 'express-handlebars';
import cors from "cors";
//==============MINIMIST==============
import parseArgs from "minimist"
//====================================

import { sessionHandler as session } from "./middlewares/session.js"
import { passportMiddleware, passportSessionHandler } from "./middlewares/passport.js"

import { usersRouter } from "./routers/usersRouter.js"
import { authRouter } from "./routers/authRouter.js"
import { dataRouter } from "./routers/dataRouter.js"
import { viewsRouter } from "./routers/viewsRouter.js"
import { infoRouter } from "./routers/infoRouter.js"
import { randomsRouter } from "./routers/randomsRouter.js"

import { runCluster } from "./cluster/cluster.js"

import { numCPUs } from "./cluster/cluster.js";


const app = express()

//=================================================
//handlebars
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')

//=================================================
//middleware
app.use(express.static("public"))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(session)
app.use(passportMiddleware)
app.use(passportSessionHandler)


//=================================================
//rutes
app.use("/api/users",usersRouter)
app.use("/auth", authRouter)
app.use("/api/data", dataRouter)
app.use("/", viewsRouter)
app.use("/info", infoRouter)
app.use("/api/randoms", randomsRouter)

//========MINIMIST=================================
const args = parseArgs(process.argv.slice(2))
// const arg = parseArgs(["--PORT","8080"])

//=================================================
//listen

export let count = [];



export function createServer(){

    const server = app.listen(
        //===MINIST=========
        (args.PORT || 8080) , 
        () => {
            console.log(`Worker ${process.pid} puerto ${server.address().port}`)
            count.push(1)
        })
    

}

// node server.js --CLUSTER --PORT 8080
export let counterProcess = 1;

if(args.CLUSTER){
    runCluster()
    counterProcess = numCPUs
} else{
    createServer()
}














