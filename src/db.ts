import { Pool } from "postgres";

const POOL_CONNECTIONS = 5;
const dbPool = new Pool({
    user: "postgres",
    password: "0407",
    database: "task_app",
    hostname: "localhost",
    port: 5432,
}, POOL_CONNECTIONS);

export async function query(sql: string, params: any[] = []) {
    const client = await dbPool.connect();
    try{
        return await client.queryObject(sql, ...params);
    } finally {
        client.release();
    }
}