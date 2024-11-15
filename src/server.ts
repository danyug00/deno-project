import { Application } from "https://deno.land/x/oak/mod.ts";
import { graphql } from "graphql";
import { typeDefs, resolvers } from "./schema.ts";

// Crear el servidor de aplicación
const app = new Application();

// Middleware para manejar las solicitudes GraphQL
app.use(async (context) => {
    // Solo procesamos solicitudes en /graphql
    if (context.request.url.pathname === "/graphql") {
        const body = await context.request.body; // Obtener el cuerpo de la solicitud como JSON
        const { query } = await body.value; // Obtener la consulta GraphQL del cuerpo de la solicitud
  
      // Ejecutar la consulta GraphQL
      const response = await graphql({
        schema: {
          typeDefs,
          resolvers,
        },
        source: query, // Extraer la consulta del cuerpo
      });
  
      context.response.body = response;
    } else {
      // Ruta por defecto
      context.response.body = "Hello, Deno!";
    }
  });

// Iniciar el servidor
console.log("Server running on http://localhost:8000");
await app.listen({ port: 8000 });