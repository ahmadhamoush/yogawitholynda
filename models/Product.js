const { Schema, models, model } = require("mongoose");

const ProductSchema = new Schema({
    name: String,
    description: Array,
    color: String,
    image: String,
    price: Number,
    category: String
})
const Product = models ?.Product || model('Product', ProductSchema)

export default Product