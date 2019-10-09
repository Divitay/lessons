module.exports = {
  'client': 'pg',
  'connection': {
    'host': process.env.DB_HOST || 'postgres',
    'user': process.env.DB_USER || 'main',
    'port': process.env.DB_PORT || '5432',
    'password': process.env.DB_PASSWORD || 'main',
    'database': process.env.DB_DATABASE || 'main'
  },
  pool: {
    min: 2,
    max: 7
  },
  asyncStackTraces: true,
  acquireConnectionTimeout: 30000,
  migrations: {
    tableName: 'migrations',
    directory: '../storage/db/migrations',
    stub: '../storage/db/templates/migration.js'
  },
  seeds: {
    directory: '../storage/db/seeds',
    stub: '../storage/db/templates/seed.js'
  }
}
