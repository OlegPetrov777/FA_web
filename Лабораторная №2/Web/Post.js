const mongoose = require("mongoose")

const PostSchema = mongoose.Schema({
    name: String,
    number: String,
    email: String,
    gender: String,
    birthDate: String,
    periodLife: Number,
    profession: String,
    periodWork: Number,
    bankAccount: Boolean,
    immovable: Boolean,
    policy: Boolean
})

module.exports = mongoose.model('Post', PostSchema)