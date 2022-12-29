import { query, collection, orderBy, limit, getDocs } from 'firebase/firestore';
import { dbService } from 'api/firebase';
import { ILabData, IMovieData, IPressData, INoticeData } from 'types/dataTypes';
import dayjs from 'dayjs';

export const getPosts = async (category: string) => {
  const queryList = query(collection(dbService, category), limit(3), orderBy('createdAt', 'desc'));
  const data = await getDocs(queryList);
  const dataList: ILabData[] = [];
  data.forEach((docs) => {
    const postData = {
      ...docs.data(),
      date: dayjs(docs.data().createdAt).format('YY-MM-DD'),
      id: docs.id,
    } as ILabData;
    dataList.push(postData);
  });
  return dataList;
};

export const getMovies = async () => {
  const queryList = query(collection(dbService, 'movie'), limit(6), orderBy('createdAt', 'desc'));
  const data = await getDocs(queryList);
  const dataList: IMovieData[] = [];
  data.forEach((docs) => {
    const postData = {
      ...docs.data(),
      date: dayjs(docs.data().createdAt).format('YY-MM-DD'),
      id: docs.id,
    } as IMovieData;
    dataList.push(postData);
  });
  return dataList;
};

export const getPress = async () => {
  const queryList = query(collection(dbService, 'press'), limit(4), orderBy('createdAt', 'desc'));
  const data = await getDocs(queryList);
  const dataList: IPressData[] = [];
  data.forEach((docs) => {
    const postData = {
      ...docs.data(),
      date: dayjs(docs.data().createdAt).format('YY-MM-DD'),
      id: docs.id,
    } as IPressData;
    dataList.push(postData);
  });
  return dataList;
};

export const getNotice = async () => {
  const queryList = query(collection(dbService, 'notice'), limit(4), orderBy('createdAt', 'desc'));
  const data = await getDocs(queryList);
  const dataList: INoticeData[] = [];
  data.forEach((docs) => {
    const postData = {
      ...docs.data(),
      date: dayjs(docs.data().createdAt).format('YY-MM-DD'),
      id: docs.id,
    } as INoticeData;
    dataList.push(postData);
  });
  return dataList;
};
