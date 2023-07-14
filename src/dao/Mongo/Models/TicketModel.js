import mongoose from "mongoose";

const collection = "Tickets";


const Schema = new mongoose.Schema({
  code: { type: String, unique: true },
  purchase_datetime: { type: Date, default: Date.now },
  amount: Number,
  purchaser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Ticket = mongoose.model(collection, Schema);

export default Ticket;
