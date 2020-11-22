const mongoose = require("mongoose");
const shortid = require("shortid");

const shortUrlSchema = new mongoose.Schema({
    base:{ /*base url*/
        type: String,
        required: true
    },
    short:{ /*short url*/
        type:String,
        required:true,
        default: shortid.generate /*generate short url id*/
    },
    visits:{
        type: Number,
        required: true,
        default: 0
    },
    created:{
        type: Date,
        default: Date.now()
    }
});

const model = mongoose.model('ShortUrl', shortUrlSchema);
module.exports = model;