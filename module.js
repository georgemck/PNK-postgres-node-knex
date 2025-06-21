//when program exits release the database connection
const cleanup = () => Knex.destroy();
process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);

import pkg from 'knex';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

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
const config = {
  debug: false,
  client: "pg",
  connection: connection,
  searchPath: ["knex", "public"],
  pool: {
    min: 0,
    max: 10,
    createTimeoutMillis: 2999,
    acquireTimeoutMillis: 29999,
    idleTimeoutMillis: 29999,
    reapIntervalMillis: 1000,
    createRetryIntervalMillis: 100,
    propagateCreateError: false
  },
  migrations: {
    directory: `${__dirname}/db/migrations`,
    tableName: "knex_migrations"
  }
};

const Knex = pkg(config);

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
  .then(result => {
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
