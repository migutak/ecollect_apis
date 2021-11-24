module.exports = {
    oracle: {
        connector: 'oracle',
        hostname: process.env.DB_HOST || '127.0.0.1',
        port: process.env.DB_PORT || 1564, //1523, 
        user: process.env.DB_USER || 'ecol',
        password: process.env.DB_PASSWORD || 'ecol',//'DsQSnttm_1',
        database: process.env.DB_DATABASE || 'ORCLCDB.localdomain'// 'ECOLTST',
    }
}
