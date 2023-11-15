const { model, Schema } = require("mongoose");

const MessageSchema = new Schema({
    subject: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
});

module.exports= model("Message",MessageSchema)