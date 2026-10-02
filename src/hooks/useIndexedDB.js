import { useState, useEffect } from 'react';
import localforage from 'localforage';

// Configure the database namespace
localforage.config({
  name: 'SDE_Tracker',
  storeName: 'tasks_store',
  description: 'Stores offline study progress and rich notes'
});

const useIndexedDB = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(initialValue);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const item = await localforage.getItem(key);
        if (item !== null) {
          setStoredValue(item);
        } else {
          // If database is empty (first time user), save the initial curriculum
          await localforage.setItem(key, initialValue);
        }
      } catch (error) {
        console.error("IndexedDB Load Error:", error);
      } finally {
        setIsLoaded(true);
      }
    };
    loadData();
  }, [key]); // eslint-disable-line react-hooks/exhaustive-deps

  const setValue = async (value) => {
    try {
      // Allow value to be a function (so prev => prev.map(...) still works exactly the same)
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Instantly update React state for snappy UI
      setStoredValue(valueToStore);
      
      // Save to IndexedDB in the background
      await localforage.setItem(key, valueToStore);
    } catch (error) {
      console.error("IndexedDB Save Error:", error);
    }
  };

  return [storedValue, setValue, isLoaded];
};

export default useIndexedDB;