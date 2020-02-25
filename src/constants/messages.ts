import { ux, sdk } from '@cto.ai/sdk';

const blueWelcome = `${ux.colors.bgBlueBright(
  'Welcome to the CTO.ai web app generator'
)}`;

export const intro = `
\n👋  ${blueWelcome} 👋
This Op will allow you to create Web Applications with ease!
\nHow does it work?
You will choose your framework, add some basic information and we will spin up and push a newly minted app to your github account.
Currently, the Op supports the following frameworks:
* React.js
* Gatsby
* Next.js
* Express.js`;

const underlinePrerequisites = `${ux.colors.bold.underline(
  '\nℹ️  Prerequisites:'
)}`;

const boldRepo = `${ux.colors.bold.magentaBright('`repo`')}`;
const boldAdmin = `${ux.colors.bold.magentaBright('`admin`')}`;
const linkGithubToken = `${ux.colors.cyanBright(
  'https://github.com/settings/tokens/new'
)}`;

export const preRequisites = `\n${underlinePrerequisites}
\n🔑  Access token for GitHub interactions.
\nFollow the link to create an access token -> ${linkGithubToken}
\n⚠️  Remember to select ${boldRepo} and ${boldAdmin} scopes to grant privileges to this access token.
Save your token on a safe place, as you won't be able to access it again`;

export const gitHubConnectionOk = `\n✅  Connection has been established. \n\nLets get your project all set up.`;

export const successMessage = (name: string) =>
  ux.colors.underline(
    `\n\n✅  Success, your ${name} App has been created and deployed to Github.`
  );

export const linkToNewApp = (url: string) =>
  `\nCheck it out on ${ux.colors.bold.underline(url)}\n`;

// spinners
export const connectToGithub = `⚙  Establishing connection to Github`;

export const creatingRepo = `🔨🔧  Creating a new repository, please wait...`;

export const createRepoDone = (name: string) =>
  `✅  New ${name} repository created.`;
