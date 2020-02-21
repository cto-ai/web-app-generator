import { sdk } from '@cto.ai/sdk';
import { track } from './tracker';

export const saveState = async (keyName: string, keyValue: string) => {
  const key = `WebGen_${keyName}`;

  try {
    await sdk.setState(key, keyValue);
  } catch (error) {
    await track({ event: 'Error setting state' });
    throw `Something is off 🤔...state is not persisted, please check your configuration`;
  }
};
