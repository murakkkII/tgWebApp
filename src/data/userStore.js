import { dbPromise } from './db';

// получаем или создаём userId
export function getUserId() {
  let id = localStorage.getItem('user_id');

  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem('user_id', id);
  }

  return id;
}

// сохранить пользователя
export async function saveUser(user) {
  const db = await dbPromise;
  return db.put('users', user);
}

// загрузить пользователя
export async function loadUser() {
  const db = await dbPromise;
  const id = getUserId();
  return db.get('users', id);
}

// проверить, свободен ли ник
export async function isUsernameFree(username, currentUserId) {
  const db = await dbPromise;
  const index = db.transaction('users').store.index('username');
  const user = await index.get(username);

  if (!user) return true;
  return user.id === currentUserId; // можно сохранить свой же ник
}
