import "mocha";
import sinon from "sinon";
import { ux, sdk } from "@cto.ai/sdk";

import { main } from "../index";

describe("main op", () => {
  let printStub: sinon.SinonStub;
  let spinnerStub: sinon.SinonStub;
  let execStub: sinon.SinonStub;
  let promptStub: sinon.SinonStub;
  let processExit: sinon.SinonStub;

  beforeEach(() => {
    processExit = sinon.stub(process, "exit");
    printStub = sinon.stub(ux, "print");
    spinnerStub = sinon.stub(ux.spinner, "start");
    execStub = sinon.stub(sdk, "exec");
    promptStub = sinon.stub(ux, "prompt").returns(
      Promise.resolve({
        confirm: false
      })
    );
  });
  afterEach(() => {
    printStub.restore();
    spinnerStub.restore();
    execStub.restore();
    promptStub.restore();
    processExit.restore();
  });
  it("Op execution should stop if user is not ready", async () => {
    await main();

    sinon.assert.called(process.exit);
  });
});
