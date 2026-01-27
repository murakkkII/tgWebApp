import { openDB } from 'idb';

export const dbPromise = openDB('tgwebapp-db', 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains('users')) {
      const store = db.createObjectStore('users', {
        keyPath: 'id',
      });

      // уникальный ник
      store.createIndex('username', 'username', { unique: true });
    }
  },
});
