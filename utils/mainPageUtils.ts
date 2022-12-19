import { query, collection, orderBy, limit, getDocs } from 'firebase/firestore';
import { dbService } from 'api/firebase';
import { IBoardData } from 'types/dataTypes';
import dayjs from 'dayjs';

export const getLabPosts = async () => {
  const queryList = query(collection(dbService, 'lab'), limit(3), orderBy('createdAt', 'desc'));
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

export const getForumPosts = async () => {
  const queryList = query(collection(dbService, 'forum'), orderBy('createdAt', 'desc'));
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
