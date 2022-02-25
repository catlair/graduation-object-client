import { refreshToken } from '@/services/login';
import SecureLS from 'secure-ls';

const ls = new SecureLS({ encodingType: 'aes', encryptionSecret: 'sadskladjhk' });

export const getAccessToken = (): string => {
  return ls.get('user-token')?.accessToken;
};
export const getRefreshToken = () => {
  return ls.get('user-token')?.refreshToken;
};
export const getTokens = () => {
  return ls.get('user-token');
};
export const setTokens = (tokenResult: API.TokenResult) => {
  ls.set('user-token', tokenResult);
};
export const removeTokens = () => {
  ls.remove('user-token');
};
export const refreshTokens = async () => {
  const tokens = await refreshToken(getRefreshToken());
  setTokens(tokens);
  return tokens;
};
