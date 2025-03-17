const dotenv = require('dotenv');

dotenv.config();
const env = process.env.NODE_ENV || 'development';
const config = {
    development: {
        db: process.env.MONGO_URI || 'mongodb+srv://appuser:27131013576691@comp229.vr7csru.mongodb.net/COMP308L3',
    },
};
module.exports = config[env];