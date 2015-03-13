import Hapi from 'hapi';

let server = new Hapi.Server();
server.connection({ port: process.env.PORT || 8081 });

server.start(() => {
  console.info(`Server running at: ${server.info.uri}`);
});
