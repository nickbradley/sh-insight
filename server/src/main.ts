import {Server} from "./Server";

const port = Number(process.env.PORT) || 8080;
const staticDir = process.env.PUBLIC_DIR || "../dist";
const dataDir = process.env.DATA_DIR || "/tmp/sh-insight/";
let allowCORS = false;
if (process.env.NODE_ENV !== 'production') {
  allowCORS = true;
}

const server = new Server(staticDir, dataDir, allowCORS);
(async () => {
  await server.start(port);
  console.log(`Server listening on port ${port}.`);
})();
