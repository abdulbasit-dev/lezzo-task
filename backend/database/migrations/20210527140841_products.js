exports.up = function (knex) {
  return knex.schema.createTable('products', table => {
    table.increments('p_id');
    table.integer('store_id').unsigned().references('stores.s_id');
    table.integer('category_id').unsigned().references('categories.c_id');
    table.string('name');
    table.string('price_type');
    table.integer('price');
    table.binary('image');
    // table.integer('created_by').unsigned().references('users.id');
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  knex.schema.dropTableIfExists('products');
};
