//when program exits release the database connection
const cleanup = () => Knex.destroy();
process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);

let PG_CONNECTION_STRING =
  "postgres://USERNAME:PASSWORD@HOSTSERVER:5432/DATABASENAME";

let connection = {
  connectionString: PG_CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false,
  },
};

connection = {
  host: "HOSTSERVER",
  port: 5432,
  user: "USERNAME",
  database: "DATABASENAME",
  password: "PASSWORD",
  ssl: { rejectUnauthorized: false }
};

let Knex = require("knex")({
  debug: true,
  client: "pg",
  connection: connection,
  pool: { min: 0, max: 7 },
  searchPath: ["knex", "public"],
});

/*
//list all tables
//SELECT table_schema, table_name FROM information_schema.tables WHERE table_type = 'BASE TABLE' AND table_schema NOT IN ('Knex_catalog', 'information_schema');
Knex.select("*")
  .from("information_schema.tables")
  .then((result) => {
    console.log(result);
  });
*/
//list all tables in the public table_schema
Knex.select("*")
  .from("information_schema.tables")
  .where("table_schema", "public")
  .then((result) => {
    console.log(result);
    cleanup();
  });




//insert value into table
// Knex('merge01').insert({ id: 19 }).returning('*').then(console.log);

//read content from table
/*
Knex.select("*")
  .from("public.merge01") //schema.table_name
  .then((result) => {
    console.log(result);
  });
*/


