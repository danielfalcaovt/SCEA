import pg from "pg";

const database = new pg.Client({
  host: "localhost",
  database: "SCEA",
  user: "postgres",
  password: "brbr109br",
  port: 5432
});

database.connect();

async function query(sqlCode: string, params?:any[]) {
  try {
    const response = database.query(sqlCode, params);
    return response
  } catch (error) {
    console.error(error);
    return error
  };
};

export { database, query };
