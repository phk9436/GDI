import { query, collection, orderBy, limit, getDocs } from 'firebase/firestore';
import { dbService } from 'api/firebase';
import { IBoardData } from 'types/dataTypes';

export const getLabPosts = async () => {
  const queryList = query(collection(dbService, 'lab'), limit(3), orderBy('createdAt', 'desc'));
  const data = await getDocs(queryList);
  const dataList: IBoardData[] = [];
  data.forEach((docs) => {
    const postData = { ...docs.data(), id: docs.id } as IBoardData;
    dataList.push(postData);
  });
  return dataList;
};
