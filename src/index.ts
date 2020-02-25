const { Octokit } = require('@octokit/rest');
import { ux } from '@cto.ai/sdk';
import { track } from './utils/tracker';
import { saveState } from './utils/saveState';

import { getLogo } from './constants/logo';

import {
  confirmStart,
  getAccessToken,
  listOfFrameworks,
  reqProjectDescription,
  reqProjectName,
  reqProjectVisibility
} from './constants/prompts';

import {
  connectToGithub,
  createRepoDone,
  creatingRepo,
  gitHubConnectionOk,
  intro,
  linkToNewApp,
  preRequisites,
  successMessage
} from './constants/messages';

import createApplication from './controllers';
import { createRepository, getUserGithubInfo } from './utils/github';

import { GithubTypes as G } from './types';

export const main = async () => {
  const logo = getLogo();
  await ux.print(logo);

  // intro / description
  await track({
    event: 'Start, Op initialized'
  });

  await ux.print(intro);

  // Prerequisites
  await ux.print(preRequisites);

  // Confirmation
  const { confirm } = await ux.prompt(confirmStart);
  if (!confirm) {
    await track({
      event: 'User exit, Did not start'
    });

    await ux.print('\nBye, 👋');
    process.exit(1);
    return;
  }

  await track({
    event: 'User ready to start'
  });

  const { token } = await ux.prompt(getAccessToken);
  await saveState('githubToken', token);
  await track({
    event: 'User enter access token'
  });

  await ux.spinner.start(connectToGithub);

  const github = new Octokit({
    auth: token
  });

  const { userFullName, userEmail, githubUserName } = await getUserGithubInfo(
    github
  );

  try {
    await saveState('userFullName', userFullName);
    await saveState('userEmail', userEmail);
    await saveState('githubUserName', githubUserName);
  } catch (error) {
    ux.print(error);
  }

  await ux.print(gitHubConnectionOk);
  await ux.spinner.stop('');

  // Guide to scaffold the App.
  const { framework } = await ux.prompt(listOfFrameworks);
  await track({
    event: `framework selected = ${framework}`
  });

  const { projectName } = await ux.prompt(reqProjectName);
  const { projectDescription } = await ux.prompt(reqProjectDescription);
  const { projectVisibility } = await ux.prompt(reqProjectVisibility);
  await track({
    event: `Project visibility = ${projectVisibility}`
  });

  await ux.spinner.start(creatingRepo);

  const repoConfiguration: G.RepoConfig = {
    github,
    projectName,
    projectDescription,
    projectVisibility
  };

  const newRepo = await createRepository(repoConfiguration);

  try {
    await saveState('repoFullName', newRepo.full_name);
    await saveState('repoHtmlUrl', newRepo.html_url);
    await saveState('repoGitUrl', newRepo.git_url);
    await saveState('repoSshUrl', newRepo.ssh_url);
    await saveState('repoCloneUrl', newRepo.clone_url);
  } catch (error) {
    ux.print(error);
  }

  await ux.spinner.stop('');
  ux.print(createRepoDone(newRepo.full_name));

  const appConfiguration = {
    projectName,
    userFullName,
    userEmail,
    repoFullName: newRepo.full_name,
    token
  };

  // this is a switch that will trigger a build for a given framework
  await createApplication(framework, appConfiguration);

  // if an error was encountered, the previews func takes care of it
  await ux.print(successMessage(framework));
  await ux.print(linkToNewApp(newRepo.html_url));

  await ux.print('\n');
  await track({
    event: `Web App Generator Op Completed Successfully`
  });
};

main();
