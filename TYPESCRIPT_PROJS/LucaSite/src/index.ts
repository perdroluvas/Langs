import {server} from "./server/Server.ts";

server.listen(process.env.PORT || 3333, () => console.log("App rodando!"));

