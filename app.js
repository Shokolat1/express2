// https://api-rest-express2.herokuapp.com/

const debug = require("debug")("app:inicio")
// const dbDebug = require("debug")("app:db")
const express = require("express")
const config = require("config")
// const logger = require("./logger")
// const morgan = require("morgan")
const app = express()
const usuarios = require("./routes/usuarios")

// Configuración de entornos
console.log(`Aplicación ${config.get("nombre")}`)
console.log(`DB Server: ${config.get("configDB.host")}`)

// app.get()       // petición 
// app.post()      // envío de datos
// app.put()       // actualización
// app.delete()    //  eliminación

const port = process.env.PORT || 3000

app.listen(port, ()=>{
    console.log(`Escuchando en el puerto ${port}`)
})

// MIDDLEWARES
app.use(express.json())     // Body
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))
app.use("/api/usuarios", usuarios)

// app.use(function(req, res, next){
//     console.log("Logging...")
//     next()
// })

// app.use(logger)

// app.use(function(req, res, next){
//     console.log("Authenticating...")
//     next()
// })

// Uso de middleware de 3ros - Morgan
// if (app.get("env") === "development") {
//     app.use(morgan("tiny"))
//     console.log("Morgan habilitado")
//     debug("Morgan habilitado")
// }

// Trabajos con la base de datos
debug("Conectando con la Base de Datos")

// --------------------------------------
app.get("/", (req, res) =>{
    res.send("Hola mundo desde Express")
})