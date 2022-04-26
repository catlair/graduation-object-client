import { EncryptStorage } from 'encrypt-storage';
import type { EncryptStorageOptions, EncryptStorageTypes } from 'encrypt-storage';

type StorageType = EncryptStorageOptions['storageType'];

export class MyStorage {
  storageType: StorageType;
  storage: EncryptStorageTypes;
  private secretKey: string;
  private options: EncryptStorageOptions;

  constructor(secretKey: string, options?: EncryptStorageOptions) {
    this.secretKey = secretKey;
    this.options = options || {};
    this.storageType = (options && options.storageType) || 'sessionStorage';
    this.storage = new EncryptStorage(secretKey, options);
  }

  set(key: string, value: any) {
    this.storage.setItem(key, value);
  }

  get<T = any>(key: string): T | undefined {
    return this.storage.getItem(key);
  }

  remove(key: string) {
    this.storage.removeItem(key);
  }

  clear() {
    this.storage.clear();
  }

  changeStorageType(storageType: StorageType) {
    if (storageType === this.storageType) {
      return;
    }
    // 清空原来的storage
    this.clear();
    this.storage = new EncryptStorage(this.secretKey, { ...this.options, storageType });
  }
}
