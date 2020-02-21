/**
 * Insert token in github url
 * @param {string} fullNme (username)
 * @param {string} token
 * @returns url with token
 */

export const insertTokenInUrl = (fullName: string, token: string): string => {
  return `https://${token}@github.com/${fullName}.git`;
};
