let db;

export const initializeDB = () => {
  const request = indexedDB.open('ECommerceDB', 1);

  request.onupgradeneeded = () => {
    db = request.result;
    if (!db.objectStoreNames.contains('users')) {
      db.createObjectStore('users', { keyPath: 'username' });
    }
  };

  request.onsuccess = () => {
    db = request.result;
  };

  request.onerror = () => {
    console.error('Error opening IndexedDB');
  };
};

export const addUser = (username, password) => {
  return new Promise((resolve) => {
    const transaction = db.transaction(['users'], 'readwrite');
    const store = transaction.objectStore('users');
    const request = store.add({ username, password });

    request.onsuccess = () => {
      resolve(true);
    };

    request.onerror = () => {
      resolve(false);
    };
  });
};

export const authenticateUser = (username, password) => {
  return new Promise((resolve) => {
    const transaction = db.transaction(['users'], 'readonly');
    const store = transaction.objectStore('users');
    const request = store.get(username);

    request.onsuccess = () => {
      if (request.result && request.result.password === password) {
        resolve(true);
      } else {
        resolve(false);
      }
    };

    request.onerror = () => {
      resolve(false);
    };
  });
};