import mongoose from 'mongoose'
import getConfig from 'next/config';

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
const mongoURL =serverRuntimeConfig.mongourl;

interface iconnection {
    isConnected?:boolean
}

const connection:iconnection = {isConnected: false}

async function connectToDatabase() {

    if (connection.isConnected) {
    return
    }

    /* connecting to our database */
    const db = await mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    })

    connection.isConnected = db.connections[0].readyState==1?true: false;
}

export default connectToDatabase