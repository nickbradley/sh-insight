import Util from "../src/Util";

test("GenerateShortId()", () => {
  const id = Util.generateShortId();
  expect(id).toHaveLength(6);
  expect(id).toEqual(expect.stringMatching(/^([0-9]|[a-z])+([0-9a-z]+)$/i));
});

test("sendEmail(..)", async () => {
  const options = {
    from: '"Nick C. Bradley" <nick@ncbradley.com>',
    to: "nickbradley@live.ca",
    subject: "Hello",
    text: "Hello world?",
    html: "<b>Hello world?</b>"
  }
  await Util.sendEmail(options);
});
