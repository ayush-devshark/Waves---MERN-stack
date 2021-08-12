const mongoose = require('mongoose');
const validator = require('validator');
require('dotenv').config();

const userSchema = mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('INvalid email');
            }
        },
    },
    password: {
        type: String,
        require: true,
        trim: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    firstname: {
        type: String,
        maxLength: 100,
        trim: true,
        default: '',
    },
    lastname: {
        type: String,
        maxLength: 100,
        trim: true,
        default: '',
    },
    cart: {
        type: Array,
        default: [],
    },
    history: {
        type: Array,
        default: [],
    },
    varified: {
        type: Boolean,
        default: false,
    },
});

userSchema.statics.emailTaken = async function (email) {
    const user = await this.findOne({ email });
    return !!user;
};

const User = mongoose.model('User', userSchema);

module.exports = { User };
