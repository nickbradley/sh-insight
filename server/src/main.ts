import {Server} from "./Server";

const port = Number(process.env.PORT) || 8080;
const staticDir = process.env.PUBLIC_DIR || "../dist";
const uploadDir = process.env.UPLOAD_DIR || "/tmp/sh-insight/uploads";

const server = new Server(staticDir, uploadDir);
(async () => {
  await server.start(port);
  console.log(`Server listening on port ${port}.`);
})();
