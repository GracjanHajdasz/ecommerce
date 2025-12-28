const { prisma } = require('../config/db.js')
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken.js');

const register = async (req, res) => {
    const {email, firstName, lastName, phone, role, password} = req.body;
    
    // Validate required fields
    if (!email || !password) {
        return res.status(400).json({ 
            error: "Email and password are required" 
        });
    }

    //chceck if user exists
    const userExists = await prisma.user.findUnique({
        where: {email: email},
    });

    if(userExists){
        return res.status(400).json({ error: "user already exists"})
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create user
    const user = await prisma.user.create({
        data: {
            email,
            firstName,
            lastName,
            phone,
            role,
            password: hashedPassword,
        }
    })
    //generate JWT token
    const token = generateToken(user.id);

    res.status(201).json({
        status: "success",
        data: {
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
            },
            token,
        }
    })
};

const login = async (req,res) => {
    const {email, password} = req.body;

    // Validate required fields
    if (!email || !password) {
        return res.status(400).json({ 
            error: "Email and password are required" 
        });
    }

    //chceck if user exists
    const user = await prisma.user.findUnique({
        where: {email: email},
    });

    if(!user){
        return res.status(401).json({ error: "Invalid email or password"})
    }

    //check password
    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if(!isPasswordCorrect){
        return res.status(401).json({ error: "Invalid email or password"})
    }

    //generate JWT token
    const token = generateToken(user.id);

    res.status(200).json({
        status: "success",
        data: {
            user: {
                id: user.id,
                email: user.email,
            },
            token,
        }
    })
}

module.exports = {register, login};