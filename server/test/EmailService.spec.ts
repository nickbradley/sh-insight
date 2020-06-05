import * as fs from "fs-extra";
import {EmailService} from "../src/email/Email.service";
import {Email} from "../src/email/Email";

jest.mock("@sendgrid/mail");

let dataDir: string;
let emails: Email[];

describe("EmailService", () => {
  beforeAll(async () => {
    dataDir = await fs.mkdtemp("/tmp/");
    emails = [
      new Email("000001","test1@example.com", false),
      new Email("000002","test2@example.com", false)
    ];
  });

  describe("create(..)", () => {
    let emailFile: string;
    let service: EmailService;

    beforeAll(() => {
      emailFile = `${dataDir}/emails.txt`;
    });

    beforeEach(() => {
      service = new EmailService(emailFile);
    });

    afterEach(async () => {
      await fs.emptyDir(dataDir);
    });

    it("Should record a single email address.", async () => {
      const email = emails[0];
      await service.create(email.id, email.address, email.canContact);
      await expect(fs.readFile(emailFile, "utf-8")).resolves.toBe(email.toString());
    });

    it("Should record multiple email addresses.", async () => {
      await service.create(emails[0].id, emails[0].address, emails[0].canContact);
      await service.create(emails[1].id, emails[1].address, emails[1].canContact);
      await expect(fs.readFile(emailFile, "utf-8")).resolves.toBe(emails[0].toString() + emails[1].toString());
    });
  });
});
