import {fastify} from "fastify";

const server = fastify();

server.get("/", async (request, reply) => {
  return {hello: "world"};
});

server.listen({
  port: 3000,
}).then(() => {
  console.log("Server is running on http://localhost:3000");
})