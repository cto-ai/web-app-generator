import { ux, sdk } from '@cto.ai/sdk';
import { initializeAndPushRepo } from '../utils/github';

import { GithubTypes as G } from '../types';

export const handleVueApp = async ({
  projectName,
  userFullName,
  userEmail,
  repoFullName,
  token
}: G.CreateApp) => {
  await ux.spinner.start(
    `🚧 Setting up a new Vue.js App. 🚧This should take ~4 minutes, go grab a ☕ `
  );

  const vueResult: any = await sdk
    .exec(`npm create-vue-app ${projectName}`)
    .catch(e => sdk.log('vue create error ', e));

  await ux.print(`Vue  print result ${vueResult.stdout}`);
  await ux.print(`Vue  print result err ${vueResult.stderr}`);

  await sdk.log('vue log result ok =', vueResult.stdout);
  await sdk.log('vue log result err =', vueResult.stderr);

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

  await ux.spinner.stop('\n☑️ New Vue App');
};
