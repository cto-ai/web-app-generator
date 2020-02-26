import { sdk, ux } from '@cto.ai/sdk';
import { track } from '../utils/tracker';

const bannerLink =
  '![official-banner-v3](https://user-images.githubusercontent.com/22829270/75378425-8053e600-5888-11ea-85c2-c4f6f90d6f72.png)';

export const insertBanner = async (projectName: string) => {
  try {
    await track({
      event: `Adding cto.ai banner to Readme`
    });

    const folderStr: any = await sdk.exec(`cd ${projectName} && ls`);

    if (folderStr.stdout.includes('README.md')) {
      await sdk.exec(
        `cd ${projectName} && echo "$(echo -n "${bannerLink}" | cat - README.md)" > README.md`
      );
    } else {
      await sdk.exec(
        `cd ${projectName} && touch README.md && echo "${bannerLink}" >> README.md`
      );
    }
  } catch (error) {
    await track({
      event: `Error, adding Readme`
    });

    throw `error adding Readme`;
  }
};
