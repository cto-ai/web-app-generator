import { ux, sdk } from '@cto.ai/sdk';
import { insertTokenInUrl } from './../utils/insertTokenInUrl';
import { track } from '../utils/tracker';

import { GithubTypes as G } from '../types';
import { UserInfo } from '../types';

/**
 * handles git configuration. (no git information on the running container)
 * @param {string} projectName => the folder name ex. "my-cool-app"
 * @param {string} userFullName => ex. "Luke Skywalker"
 * @param {string} userEmail => ex. luke_skywalker@cto.ai
 * @returns void. ||  throw error.
 */
const configGitLocally = async ({
  projectName,
  userFullName,
  userEmail
}: G.GlobalGitConfig) => {
  await track({
    event: `Configure Git on new project`
  });

  // handles the git initialization for new app
  try {
    await sdk.exec(`cd ${projectName} && git init`);
  } catch (error) {
    await track({
      event: `Error, initializing git on project ${projectName}`
    });

    sdk.log('error git init', error);
    ux.print(`gitInit result err ${error}`);
    throw `error initializing git for project ${projectName}`;
  }

  // Configure git locally (limited to the scope of folder) to avoid touching user global configuration.
  try {
    await sdk.exec(
      `cd ${projectName} && git config --local user.name "${userFullName}"`
    );
    await sdk.exec(
      `cd ${projectName} && git config --local user.email "${userEmail}"`
    );
    await sdk.exec(
      `cd ${projectName} && git config --local commit.gpgsign false`
    );
  } catch (error) {
    await track({
      event: `Error, error configuring git global config`
    });

    sdk.log('error configuring git globally', error);
    throw 'error configuring git';
  }

  await track({
    event: `Done, Git configuration completed`
  });
};

/**
 * Handles the git initialization and push of a newly created repo.
 * These values come from `gitHub.repos.createForAuthenticatedUser()`
 *
 * @param {string} projectName => ex. "super-app"
 * @param {string} repoFullName => ex. lukeskywalker/super-app
 * @param {string} userFullName => ex. "Luke Skywalker"
 * @param {string} userEmail => ex. luke_skywalker@cto.ai
 * @param {string} token => user personal access token
 * @returns void. ||  throw error.
 */
export const initializeAndPushRepo = async ({
  projectName,
  repoFullName,
  userFullName,
  userEmail,
  token
}: G.InitPushRepo) => {
  await track({
    event: `Initialize  Git remote connection`
  });

  // initialize git
  await configGitLocally({ projectName, userFullName, userEmail }).catch(
    error => {
      throw error;
    }
  );

  // git add && commit
  await sdk
    .exec(`cd ${projectName} && git add . && git commit -m 'powered by cto.ai'`)
    .catch(async error => {
      await track({
        event: `Error, git add || commit on project ${projectName}`
      });

      sdk.log('gitAdd error => ', error);
      throw `error git add || commit for project ${projectName}`;
    });

  const urlWithToken = insertTokenInUrl(repoFullName, token);

  // Add remote repo to local.
  await sdk
    .exec(`cd ${projectName} && git remote add origin ${urlWithToken}`)
    .catch(async error => {
      await track({
        event: `Error, adding remote connection to ${repoFullName}`
      });

      sdk.log('addRemoteRepo error => ', error);
      throw `error adding remote connection to ${repoFullName}`;
    });

  // push newly created project to remote repo.
  await sdk
    .exec(`cd ${projectName} && git push -u origin master`)
    .catch(async error => {
      await track({
        event: `Error, adding remote connection to ${repoFullName}`
      });

      sdk.log('pushing error => ', error);
      throw `error pushing to ${repoFullName}`;
    });

  await track({
    event: `Done, repository successfully configured and pushed to github`
  });
};

/**
 * Creates a repo using the ocktokit object.
 *
 * @param {object} github => Initialized from index.ts
 * @param {string} projectName => ex. my-awesome-app
 * @param {string} projectDescription => best app ever made
 * @param {string} projectVisibility => public or private
 * @returns data containing the newly created repo.
 */
export const createRepository = async ({
  github,
  projectName,
  projectDescription,
  projectVisibility
}: G.RepoConfig) => {
  await track({
    event: `Creating github repository`
  });

  const options = {
    name: projectName,
    description: projectDescription,
    private: projectVisibility === 'Private'
  };

  const newRepo = await github.repos
    .createForAuthenticatedUser(options)
    .catch(async error => {
      await track({
        event: `Error, creating repository`
      });

      ux.print(`Oh no, ${ux.colors.red(error.message)}`);
      process.exit(1);
    });

  await track({
    event: `Done, new repository created`
  });
  return newRepo.data;
};

/**
 * Uses ocktokit to get the user information (user already initialized).
 *
 * @param {object} github => Initialized from index.ts
 * @returns UserInfo
 */
export const getUserGithubInfo = async (gitHub): Promise<UserInfo> => {
  await track({
    event: 'Authenticating user on Github'
  });

  const user = await gitHub.request('/user').catch(async error => {
    await track({
      event: `Error, authenticating user`
    });

    await ux.print(`Oh no, ${ux.colors.red(error.message)}`);
    await ux.print('\nPlease check your access token and try again 💪');
    process.exit(1);
  });

  await track({
    event: 'Done, Authentication successful'
  });

  return {
    userFullName: user.data.name,
    userEmail: user.data.email,
    githubUserName: user.data.login
  };
};
