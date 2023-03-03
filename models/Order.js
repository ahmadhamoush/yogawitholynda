import { model, models, Schema } from 'mongoose'

const OrderSchema = new Schema({
    orderID : String,
    products: Object,
    user: Object,
    paid: { type: Boolean, default: false },
    total: Number,
    subtotal:Number
}, { timestamps: true });

const Order = models?.Order || model('Order', OrderSchema)

export default Order