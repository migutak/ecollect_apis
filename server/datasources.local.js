module.exports = {
    oracle: {
        connector: 'oracle',
        hostname: process.env.DB_HOST || 'copkprdcont3-scan.co-opbank.co.ke',//'52.117.54.217',
        port: process.env.DB_PORT || 1559, //1523,
        user: process.env.DB_USER || 'ecol',
        password: process.env.DB_PASSWORD || 'L#TTc011',//'DsQSnttm_1',
        database: process.env.DB_DATABASE || 'ECOLLECT'// 'ECOLTST',
    }
}
