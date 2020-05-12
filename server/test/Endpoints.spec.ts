import supertest from "supertest";
import {Server} from "../src/Server";
import fs from "fs-extra";

const dataPath = "./test/data";
const staticDir = "/dev/null";
const uploadDir = "/tmp/uploads";


describe("/report", () => {
  let request: supertest.SuperTest<any>;
  beforeEach(() => {
    const server = new Server(staticDir, uploadDir);
    request = supertest(server.app);
  });

  test("POST Valid report.", async () => {
    const reportPath = `${dataPath}/report-short.dat`;
    const report = await fs.readJson(`${dataPath}/report-short.json`);

    const res = await request
      .post("/report")
      .attach("report", reportPath,{contentType: "text/plain"})
      .set('Accept', 'application/json');
    expect(res.status).toBe(201);
    expect(res.body).toStrictEqual(report);
  });
});

describe("/stats", () => {
  let req: supertest.SuperTest<any>;

  beforeEach(() => {
    const server = new Server(staticDir, uploadDir);
    req = supertest(server.app);
  });

  test("GET All stats.", async () => {
    const res = await req
      .get("/stats")
    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual({});
  });
})



