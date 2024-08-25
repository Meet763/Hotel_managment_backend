const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    prize: {
        type: Number,
        required: true
    },
    taste: {
        type: String,
        enum: ['spicy', 'sour', 'medium'],
        required: true
    },
    is_drink: {
        type: Boolean,
        default: false
    },
    ingredients: {
        type: [String],
        default: []
    },
    num_sales: {
        type: Number,
        default: 0
    }
 
})

const menuItem = mongoose.model('menu', menuItemSchema)
module.exports = menuItem;