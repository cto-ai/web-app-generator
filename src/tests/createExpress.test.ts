import "mocha";
import sinon from "sinon";
import { expect } from "chai";
import { ux, sdk } from "@cto.ai/sdk";

describe("create express app", () => {
  let printStub: sinon.SinonStub;
  let spinnerStub: sinon.SinonStub;
  let execStub: sinon.SinonStub;

  beforeEach(() => {
    printStub = sinon.stub(ux, "print");
    spinnerStub = sinon.stub(ux.spinner, "start");
    execStub = sinon.stub(sdk, "exec");
  });
  afterEach(() => {
    printStub.restore();
    spinnerStub.restore();
    execStub.restore();
  });
  it("test express app TODO", async () => {
    // TODO: Testing here
    // const result = await handleExpressApp(appConfiguration);

    expect(true).to.equal(true);
  });
});
