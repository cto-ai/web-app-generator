import { ux, sdk } from '@cto.ai/sdk';
import { initializeAndPushRepo } from '../utils/github';
import { track } from '../utils/tracker';

import { GithubTypes as G } from '../types';

export const handleExpressApp = async ({
  projectName,
  userFullName,
  userEmail,
  repoFullName,
  token
}: G.CreateApp) => {
  await ux.spinner.start(`🚧 Setting up a new Express App. 🚧`);
  await ux.print(
    `This should take ~2 minutes, go grab a ☕ \nWork in progress...`
  );

  await track({
    event: `Building, Express.js app`
  });

  await sdk.exec(`express ${projectName}`).catch(async e => {
    await track({
      event: `Error, creating Express application`
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
    event: `Done, Express.js app created`
  });

  await ux.spinner.stop('\n✅ New Express App');
};
