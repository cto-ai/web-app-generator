import { ux, sdk } from '@cto.ai/sdk';
import { initializeAndPushRepo } from '../utils/github';
import { track } from '../utils/tracker';

import { GithubTypes as G } from '../types';

export const handleNextJstApp = async ({
  projectName,
  userFullName,
  userEmail,
  repoFullName,
  token
}: G.CreateApp) => {
  await ux.spinner.start(`🚧 Setting up a new Next.js App. 🚧`);
  await ux.print(
    `This should take ~4 minutes, go grab a ☕ \nWork in progress...`
  );

  await track({
    event: `Building, Next.js app`
  });

  await sdk.exec(`npx create-next-app ${projectName}`).catch(async e => {
    await track({
      event: `Error, creating Next.js application`
    });
    sdk.log('npx error ', e);
  });

  await track({
    event: `Done, Next.js app created`
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
    event: `Done, Next.js app created`
  });

  await ux.spinner.stop('\n✅ New Next.js App');
};
