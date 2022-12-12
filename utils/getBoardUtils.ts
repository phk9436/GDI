import {
  query,
  collection,
  orderBy,
  limit,
  getDocs,
  getDoc,
  doc,
  startAfter,
  QueryDocumentSnapshot,
  endBefore,
  limitToLast,
  DocumentData,
  DocumentSnapshot,
} from 'firebase/firestore';
import { dbService } from 'api/firebase';
import { IBoardData } from 'types/dataTypes';

export const getBoardData: (
  category: string,
  countCategory: string,
  limitNum: number,
  isNext: boolean,
  lastData: QueryDocumentSnapshot | undefined,
  prevData: QueryDocumentSnapshot | undefined,
) => Promise<
  [IBoardData[], QueryDocumentSnapshot<DocumentData>[], DocumentSnapshot<DocumentData>]
> = async (category, countCategory, limitNum, isNext, lastData, prevData) => {
  let queryList;
  if (isNext) {
    queryList = query(
      collection(dbService, category),
      limit(limitNum),
      orderBy('createdAt', 'desc'),
      startAfter(lastData),
    );
  } else {
    queryList = query(
      collection(dbService, category),
      limitToLast(limitNum),
      orderBy('createdAt', 'desc'),
      endBefore(prevData),
    );
  }
  const data = await getDocs(queryList);
  const dataList: IBoardData[] = [];
  data.forEach((docs) => {
    const postData = { ...docs.data(), id: docs.id } as IBoardData;
    dataList.push(postData);
  });

  const total = await getDoc(doc(dbService, 'meta', countCategory));

  return [dataList, data.docs, total];
};
