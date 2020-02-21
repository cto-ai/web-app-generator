export interface UserInfo {
  userFullName: string;
  userEmail: string;
  githubUserName: string;
}

export namespace GithubTypes {
  export interface RepoConfig {
    github: any;
    projectName: string;
    projectDescription: string;
    projectVisibility: string;
  }

  export interface GlobalGitConfig {
    projectName: string;
    userFullName: string;
    userEmail: string;
  }

  export interface InitPushRepo {
    projectName: string;
    repoFullName: string;
    userFullName: string;
    userEmail: string;
    token: string;
  }

  export interface CreateApp {
    projectName: string;
    userFullName: string;
    userEmail: string;
    repoFullName: string;
    token: string;
  }
}
