![](https://raw.githubusercontent.com/cto-ai/web-app-generator/master/assets/banner.png)

# Web App Generator 🚀

This Op will scaffold code for some of the most popular Web Application Frameworks.

## Requirements

To run this or any other Op, install the [Ops Platform](https://cto.ai/platform).

Find information about how to run and build Ops via the [Ops Platform Documentation](https://cto.ai/docs/overview)

This Op requires an access token for GitHub interactions. To create a GitHub access token:

1. Create an access token with the `repo` and `admin` scopes following the [instructions here](https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line).
2. Copy the access token and provide it when prompted running the Op for the first time.

Note: Your remote `origin` must be set to a valid GitHub repo.

## Usage

To run this Op in the CLI:

```bash
  ops run @cto.ai/generate
```

To run this Op in Slack:

```bash
  /ops run @cto.ai/generate
```

You will be guided through selecting what framework of Web Application you want to create.

After all the prompts have been completed, the Op will build and push a new application to your Github account.

## Frameworks

Currently, the web generator Op supports the following frameworks:

- React.js
- Gatsby
- Next.js
- Express.js

We are working on adding support for Vue,js and Angular. If you want to a see a new framework on the list, please let us know.

## Workflows

This Op can be chained with other Ops to create a reusable and composable workflow.

This Op uses the [sdk.setState()](https://cto.ai/docs/sdk-api/sdk#sdksetstate) functionality to persist data and allow the next Op in workflow sequence to access persisted data. This state data is only available during the duration of the workflow and is destroyed with the workflow is complete.

The following keys are saved in state:

- "WebGen_userFullName"
- "WebGen_userEmail"
- "WebGen_githubToken"
- "WebGen_githubUserName"
- "WebGen_repoFullName"
- "WebGen_repoHtmlUrl"
- "WebGen_repoGitUrl"
- "WebGen_repoSshUrl"
- "WebGen_repoCloneUrl"

To access these keys/values (next Op in workflow) you must use [`sdk.getState()`](https://cto.ai/docs/sdk-api/sdk#sdkgetstate)

## Local Development / Running from Source

**1. Clone the repo:**

```bash
git clone <git url>
```

**2. Navigate into the directory and install dependencies:**

```bash
cd web_generator
```

**3. Run the Op from your current working directory with:**

```bash
ops run . --build
```

## Contributing

See the [Contributing Docs](CONTRIBUTING.md) for more information.

## Contributors

<table>
  <tr>
    <td align="center"><a href="https://github.com/jmariomejiap"><img src="https://avatars3.githubusercontent.com/u/22829270?s=400&u=8b174cca1b78aaeea49f8db44fe7050d9d7e4227&v=4" width="100px;" alt=""/><br /><sub><b>Mario Mejia</b></sub></a><br/></td>
    <td align="center"><a href="https://github.com/CalHoll"><img src="https://avatars3.githubusercontent.com/u/21090765?s=400&v=4" width="100px;" alt=""/><br /><sub><b>Calvin Holloway</b></sub></a><br/></td>
  </tr>
</table>

## LICENSE

[MIT](LICENSE.txt)
