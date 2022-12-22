import { query, collection, orderBy, limit, getDocs } from 'firebase/firestore';
import { dbService } from 'api/firebase';
import { IBoardData, IMovieData } from 'types/dataTypes';
import dayjs from 'dayjs';

export const getPosts = async (category: string) => {
  const queryList = query(collection(dbService, category), limit(3), orderBy('createdAt', 'desc'));
  const data = await getDocs(queryList);
  const dataList: IBoardData[] = [];
  data.forEach((docs) => {
    const postData = {
      ...docs.data(),
      date: dayjs(docs.data().createdAt).format('YY-MM-DD'),
      id: docs.id,
    } as IBoardData;
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
