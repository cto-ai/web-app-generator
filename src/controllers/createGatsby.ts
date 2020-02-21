import { ux, sdk } from '@cto.ai/sdk';
import { initializeAndPushRepo } from '../utils/github';
import { track } from '../utils/tracker';

import { GithubTypes as G } from '../types';

export const handleGatsbyApp = async ({
  projectName,
  userFullName,
  userEmail,
  repoFullName,
  token
}: G.CreateApp) => {
  await ux.spinner.start(`🚧 Setting up a new Gatsby App. 🚧`);
  await ux.print(
    `This should take ~4 minutes, go grab a ☕ \nWork in progress...`
  );

  await track({
    event: `Building, Gatsby app`
  });

  await sdk.exec(`gatsby new ${projectName}`).catch(async e => {
    await track({
      event: `Error, creating Gatsby application`
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
    event: `Done, Gatsby app created`
  });

  await ux.spinner.stop('\n✅ New Gatsby App');
};
