const paramMongo = {
    cloud: {
        username: 'root',
        password: 'mongopassword',
        dirAtlas: 'cluster0.5hrf6.mongodb.net',
    }
}

let config;

export default config = {
    mongodb_cloud: {
        uri:`mongodb+srv://${paramMongo.cloud.username}:${paramMongo.cloud.password}@${paramMongo.cloud.dirAtlas}/?retryWrites=true&w=majority`
    }
}