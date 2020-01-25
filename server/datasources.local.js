module.exports = {
    oracle: {
        connector: 'oracle',
        hostname: process.env.DB_HOST || '68.183.63.158',
        port: process.env.DB_PORT || 1521,
        user: process.env.DB_USER || 'ecol',
        password: process.env.DB_PASSWORD || 'ecol',
        database: process.env.DB_DATABASE || 'ORCLCDB.localdomain',
    }
}