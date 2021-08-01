import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useStorage = () => {
  const [communityId, setCommunityId] = useState<number>(0);

  useEffect(() => {
    const getData = async () => {
      try {
        const value: string = await AsyncStorage.getItem('@communityId') || '';
        const anId: number = parseInt(value) || 0;
        if (anId !== communityId) {
          setCommunityId(anId);
        }
      } catch (e) {
        console.warn('Error reading value, skip:', e);
      }
    };

    getData().then();
  }, []);

  const getCommunityID = useCallback(() => {
    return communityId;
  }, [communityId]);

  const setCommunityID = useCallback((anId: number) => {
    if (anId !== communityId) {
      const storeData = async (value: string) => {
        try {
          await AsyncStorage.setItem('@communityId', value);
          setCommunityId(anId);
        } catch (e) {
          console.warn('Saving error, skip:', e);
        }
      };

      storeData(`${anId}`).then();
    }
  }, [communityId]);

  return {
    getCommunityID,
    setCommunityID,
  };
};

export default useStorage;
