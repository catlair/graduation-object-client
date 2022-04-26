import { refreshToken } from '@/services/login';
import { MyStorage } from '@/utils/storage';

const secretKey = 'sadskladjhk';
const initSotrageType = Number(localStorage.getItem('autoLogin'))
  ? 'localStorage'
  : 'sessionStorage';

export const storage = new MyStorage(secretKey, {
  encAlgorithm: 'AES',
  storageType: initSotrageType,
});
const TOKEN_KEY = 'user-token';

export const getAccessToken = (): string => {
  return storage.get(TOKEN_KEY)?.accessToken;
};
export const getRefreshToken = () => {
  return storage.get(TOKEN_KEY)?.refreshToken;
};
export const getTokens = () => {
  return storage.get(TOKEN_KEY);
};
export const setTokens = (tokenResult: API.TokenResult) => {
  storage.set(TOKEN_KEY, tokenResult);
};
export const removeTokens = () => {
  storage.remove(TOKEN_KEY);
};
export const refreshTokens = async () => {
  const tokens = await refreshToken(getRefreshToken());
  setTokens(tokens);
  return tokens;
};
