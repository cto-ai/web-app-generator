import { ux, Question } from "@cto.ai/sdk";

export const confirmStart: Question<{ confirm: string }> = {
  type: "confirm",
  name: "confirm",
  message: `\nHave you already generated your GitHub token? (You will need it to create the repo and add the code)`
};

export const listOfFrameworks: Question<{ framework: string }> = {
  type: "list",
  name: "framework",
  message: `\nWhat ${ux.colors.bold("Framework")} would you like to use?`,
  choices: [
    "React",
    "Angular (coming soon)",
    "Gatsby.js",
    "Next.js",
    "Vue.js (coming soon)",
    "Express.js"
  ]
};

export const reqProjectName: Question<{ projectName: string }> = {
  type: "input",
  name: "projectName",
  message: `\nWhat is the name of your project? (ex. "cool-react-app")`
};

export const reqProjectDescription: Question<{ projectDescription: string }> = {
  type: "input",
  name: "projectDescription",
  message: `\nPlease provide a project description`
};

export const reqProjectVisibility: Question<{ projectVisibility: string }> = {
  type: "list",
  name: "projectVisibility",
  message: `\nDo you want this project to be ${ux.colors.bold(
    "public"
  )} or ${ux.colors.bold("private")}?`,
  choices: [`Public`, `Private`]
};

export const getAccessToken: Question<{ token: string }> = {
  type: "password",
  name: "token",
  message: `\n\n🔑 ${ux.colors.white("Please enter your GitHub Access Token")}`
};
