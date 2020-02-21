import { sdk } from '@cto.ai/sdk';

export const track = async trackingData => {
  const metadata = {
    op: `Web_Generator`,
    ...trackingData
  };

  await sdk.track(['track', 'cto.ai-demo-app', 'web_generator'], metadata);
};
