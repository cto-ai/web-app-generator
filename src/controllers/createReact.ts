import { ux, sdk } from '@cto.ai/sdk';
import { initializeAndPushRepo } from '../utils/github';
import { track } from '../utils/tracker';

import { GithubTypes as G } from '../types';

export const handleReactApp = async ({
  projectName,
  userFullName,
  userEmail,
  repoFullName,
  token
}: G.CreateApp) => {
  await ux.spinner.start(`🚧 Setting up a new React App. 🚧`);
  await ux.print(
    `This should take ~4 minutes, go grab a ☕ \nWork in progress...`
  );

  await track({
    event: `Building, React app`
  });

  await sdk.exec(`npx create-react-app ${projectName}`).catch(async e => {
    await track({
      event: `Error, creating React application`
    });
    sdk.log('npx error ', e);
  });

  await initializeAndPushRepo({
    projectName,
    userFullName,
    userEmail,
    repoFullName,
    token
  }).catch(async error => {
    await ux.print(`Oh no, ${ux.colors.red(error)}`);
    process.exit(1);
  });

  await track({
    event: `Done, React app created`
  });

  await ux.spinner.stop('\n✅ New React App');
};
