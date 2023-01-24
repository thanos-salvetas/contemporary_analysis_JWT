const router = require("express").Router()
const jwt = require("jsonwebtoken")
const Task = require("../models/task.model")

router.get("/", async (req, res) => {
    try {
        // ### TODO
        // check if there is a token
        // decode token 
        // get user id (as uid)
        // { user_id : { $eq uid }}
        const tasks = await Task.find({})
        res.json(tasks)
    }
    catch(err) {
        return res.status(500).json({error: err.message})
    }
})

router.post("/add", async (req, res) => {
    // ### TODO
    // find token, if any and decode
    // get user id form token as uid
    try {
        let {name} = req.body 
        let newTask = new Task({
            name: name,
            completed: false,
            user_id: uid,
        })
        const saved = await newTask.save()
        res.json(saved)
    }
    catch(err) {
        return res.status(500).json({error: err.message})
    }
})

// tasks/complete req -> task id and make completed true

module.exports = router