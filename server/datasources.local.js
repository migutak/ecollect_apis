module.exports = {
    oracle: {
        connector: 'oracle',
        hostname: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 1521, //1523,
        user: process.env.DB_USER || 'ecol',
        password: process.env.DB_PASSWORD || 'ecol',//'DsQSnttm_1',
        database: process.env.DB_DATABASE || 'ecol'// 'ECOLTST',
    }
}
