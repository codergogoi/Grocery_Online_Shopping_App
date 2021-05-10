const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    orderId: String,
    customerId: String,
    transactionId: String,
    paymentLog: String,
    paymentType: String,
    amount: Number,
    status: String,
},
{
    toJSON: {
        transform(doc, ret){
            delete ret.__v;
        }
    },
    timestamps: true
});

module.exports =  mongoose.model('transaction', TransactionSchema);