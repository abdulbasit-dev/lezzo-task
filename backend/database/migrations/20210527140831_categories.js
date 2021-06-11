exports.up = function (knex) {
  return knex.schema.createTable('categories', table => {
    table.increments('c_id');
    table.integer('store_id').unsigned().references('stores.s_id');
    table.string('name');
    table.binary('image');
    // table.integer('created_by').unsigned().references('users.id');
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('categories');
};
