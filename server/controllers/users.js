const router = require("express").Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/user.model")

router.get("/profile", async (req, res) => {
    const token = req.headers["x-access-token"]
    if(!token) {
        return res.status(400).send("Not authenticated")
    }
    try {
        const tokenData = jwt.verify(token, process.env.JWT_KEY)
        return res.status(200).send(tokenData)
    }
    catch(ex) {
        return res.status(400).send("Invalid token")
    }
})

router.post("/login", async (req, res) => {
    console.log(req.body)
    try {
        const {email, password} = req.body
        if(!email || !password) {
            return res.status(400).json({message: "Mandatory fileds are missing"})
        }

        const user = await User.findOne({email: email})
        if(!user) {
            return res.status(400).json({message: "User not found"})
        }
        const passwordsMatch = await bcrypt.compare(password, user.password) 
        if(!passwordsMatch) {
            return res.status(400).json({message: "Wrong password"})
        }

        // User ok, generate JWT
        const token = jwt.sign({id: user._id}, process.env.JWT_KEY)
        res.json({
            token,
            username: user.username
        })
    }
    catch(err) {
        return res.status(500).json({error: err.message})
    }
})

router.post("/register", async (req, res) => {
    try {
        let {email, password, passwordRepeat, username} = req.body
        // Validations 
        if(!email || !password || !passwordRepeat) {
            return res.status(400).json({message: "Mandatory fileds are missing"})
        }
        if(password.length < 5) {
            return res.status(400).json({message: "Password needs at least 5 characters"})
        }
        if(password !== passwordRepeat) {
            return res.status(400).json({message: "Passwords do not match"})
        }
        // Check if email already exists
        const emailExists = await User.findOne({email: email})
        
        if(emailExists) {
            return res.status(400).json({message: "Email already in use"})
        }

        if(!username) {
            username = email
        }

        const salt = await bcrypt.genSalt()
        const passwordHashed = await bcrypt.hash(password, salt)

        const newUser = new User({
            email: email,
            password: passwordHashed,
            username: username,
        })
        const saved = await newUser.save()
        res.json(saved)
    }
    catch(err) {
        return res.status(500).json({error: err.message})
    }

})

module.exports = router
