const express = require("express")
const Joi = require("joi")
const ruta = express.Router()

let users = [
    {id: 1, nom: "Grover"},
    {id: 2, nom: "Pablo"},
    {id: 3, nom: "Ana"}
]

ruta.get("/", (req, res) =>{
    res.send(users)
})

ruta.get("/:id", (req, res) =>{
    // res.send(req.params.id)
    let us = existeUser(req.params.id)
    if(!us) {
        res.status(404).send("El usuario no ha sido encontrado")
        return
    }
    else res.send(us)
})

// ruta.get("/api/usuarios/:year/:month", (req, res) =>{
//     res.send(req.params)     // Sale {"year": ..., "month": ...}
// })

// ruta.get("/api/usuarios/:id?nom=Marco&aPat=Mtz", (req, res) =>{
//     res.send(req.query)     // Sale {"nom":"Marco", "aPat":"Mtz"}
// })

ruta.post("/", (req, res) =>{
    var {error, value} = validarUser(req.body.nombre )

    if(error){
        let msg = error.details[0].message
        res.status(404).send(msg)
        return
    }else{
        let usuario = {
            id: users.length+1,
            nom: req.body.nombre
        }
        users.push(usuario)
        res.send(usuario)
    }

    // if(!req.body.nombre || req.body.nombre.length <= 2){
    //     // Codigo 400 Bad Request
    //     res.status(404).send("Debe ingresar un nombre con un mínimo de 3 letras")
    //     return
    // }else{
    //     let usuario = {
    //         id: users.length+1,
    //         nom: req.body.nombre
    //     }
    //     users.push(usuario)
    
    //     res.send(usuario)
    // }
})

ruta.put("/:id", (req, res) =>{
    // Encontrar si existe el usuario
    let us = existeUser(req.params.id)
    if(!us){
        res.status(404).send("El usuario no ha sido encontrado")
        return
    }else{
        var {error, value} = validarUser(req.body.nombre )
        
        if(error){
            let msg = error.details[0].message
            res.status(404).send(msg)
            return
        }else{
            us.nom = value.nombre
            res.send(us)
        }
    }
})

ruta.delete("/:id", (req, res) =>{
    let us = existeUser(req.params.id)
    if(!us){
        res.status(404).send("El usuario no ha sido encontrado")
        return
    }else{
        let index = users.indexOf(us)
        users.splice(index, 1)
        res.send(users)
    }
})

function existeUser(a){
    let us = users.find(x =>{
        x.id === parseInt(a)
    })
    return us
}

async function validarUser(a){
    const schema = Joi.object({
        nombre: Joi.string()
            .min(3)
            .required()
    })
    return(await schema.validate({nombre: a}))
}

module.exports = ruta