const { Schema, model, models } = require("mongoose");

const CollectionSchema = new Schema({
    name: String,
    image: String,
    featured: Boolean,
    description:String,
    href:String,
})
const Collection = models?.Collection || model('Collection', CollectionSchema)
export default Collection