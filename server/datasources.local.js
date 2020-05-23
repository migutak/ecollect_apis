module.exports = {
    oracle: {
        connector: 'oracle',
        hostname: process.env.DB_HOST || '127.0.0.1',//'172.16.20.2',
        port: process.env.DB_PORT || 1521, //,
        user: process.env.DB_USER || 'ecol',
        password: process.env.DB_PASSWORD || 'ecol',//'DsQSnttm_1',
        database: process.env.DB_DATABASE || 'ORCLCDB.localdomain'// '',
    },
    mysql: {
        connector: 'mysql',
        hostname: process.env.MYSQL_HOST || '127.0.0.1',
        port: process.env.MYSQL_PORT || 3305, //,
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || 'root',
        database: process.env.MYSQL_DATABASE || 'wf_workflow'
    }
}