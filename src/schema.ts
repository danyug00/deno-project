import { query } from "./db.ts";

const typeDefs = `
    type Task{
        id: ID!
        title: String!
        completed: Boolean!
    }

    type Query {
        tasks: [Task!]!
        task(id: ID!): Task
    }

    type Mutation {
        addTask(title: String!): Task!
        toggleTask(id: ID!, completed: Boolean!); Task!
        deleteTask(id: ID!): Boolean!
    }
` ;

const resolvers = {
    Query: {
        tasks: async () => {
            const result = await query("SELECT * FROM tasks;");
            return result.rows;
        },
        task: async (_: any, { id } : { id:string }) => {
            const result = await query("SELECT * FROM tasks WHERE id = $1", [id]);
            return result.rows[0];
        },
    },
    Mutation: {
        addTask: async (_: any, { title }: { title: string}) => {
            const result = await query("INSERT INTO task (title) VALUES ($1) RETURNING *;", [title]);
            return result.rows[0];
        },
        toggleTask: async (_:any, { id, completed }: { id:string, completed: boolean}) => {
            const resutl = await query("UPDATE tasks SET completed = $1 WHERE id = $2 RETURNING *;", [completed, id]);
            return resutl.rows[0];
        },
        deleteTask: async (_: any, { id }: { id: string }) => {
            await query("DELETE FROM tasks WHERE id = $1;", [id]);
            return true;
        },
    },
};

export { typeDefs, resolvers };