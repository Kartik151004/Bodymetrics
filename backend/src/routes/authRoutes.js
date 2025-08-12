const router = require("express").Router();
const { User, validateSignup, validateLogin } = require("../models/UserSchema");
const bcrypt = require("bcrypt");
//signup
router.post("/signup", async (req, res) => {
    try {
        const { error } = validateSignup(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }

        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists with this email"
            });
        }

        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({
            success: false,
            message: "Server error during registration"
        });
    }
});

//login
router.post("/login", async (req, res) => {
    try {
        const { error } = validateLogin(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }

        const { email, password } = req.body;

        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                age: user.age,
                weight: user.weight,
                height: user.height,
                gender: user.gender,
                activityLevel: user.activityLevel
            }
        });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({
            success: false,
            message: "Server error during login"
        });
    }
});

//user profile
router.get("/user/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                age: user.age,
                weight: user.weight,
                height: user.height,
                gender: user.gender,
                activityLevel: user.activityLevel
            }
        });
    } catch (error) {
        console.error("Get User Error:", error);
        res.status(500).json({
            success: false,
            message: "Server error while fetching user"
        });
    }
});


router.put("/user/:id", async (req, res) => {
    try {
        const { name, age, weight, height, gender, activityLevel } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                name,
                age,
                weight,
                height,
                gender,
                activityLevel
            },
            { new: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.json({
            success: true,
            message: "Profile updated successfully",
            user: {
                id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                age: updatedUser.age,
                weight: updatedUser.weight,
                height: updatedUser.height,
                gender: updatedUser.gender,
                activityLevel: updatedUser.activityLevel
            }
        });
    } catch (error) {
        console.error("Update User Error:", error);
        res.status(500).json({
            success: false,
            message: "Server error while updating profile"
        });
    }
});

module.exports = router;
