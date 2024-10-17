const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    role: { type: String, default: 'admin' } // Default role can be 'admin'
});

module.exports = mongoose.model('Admin', AdminSchema);
