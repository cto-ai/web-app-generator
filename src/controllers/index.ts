import { ux } from "@cto.ai/sdk";

import { handleReactApp } from "./createReact";
import { handleGatsbyApp } from "./createGatsby";
import { handleNextJstApp } from "./createNext";
import { handleVueApp } from "./createVue";
import { handleExpressApp } from "./createExpress";

const createApplication = async (framework, config) => {
  switch (framework) {
    case "React":
      await handleReactApp(config);
      break;

    case "Next.js":
      await handleNextJstApp(config);
      break;

    case "Gatsby.js":
      await handleGatsbyApp(config);
      break;

    // TODO: Test Vue Support
    // case 'Vue.js':
    //   await handleVueApp(config);
    //   break;

    case "Express.js":
      await handleExpressApp(config);
      break;

    default:
      await ux.print(
        ux.colors.underline(
          "\nWe are working on scaffolding this framework, please stay tune. 💪"
        )
      );
      process.exit(1);
  }
};

export default createApplication;
