if(process.env.NODE_ENV !== 'production'){
    require("dotenv").config();
}

module.exports = {
    DB_ATLAS_PASS: process.env.DB_ATLAS_PASS,
    LOCAL_DB_URL: process.env.LOCAL_DB_URL
}