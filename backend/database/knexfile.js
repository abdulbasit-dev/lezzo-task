// Update with your config settings.

module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: "localhost",
      database: 'node_lezzo-store',
      user: 'root',
      password: '',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};
