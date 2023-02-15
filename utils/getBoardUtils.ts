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
import { ILabData } from 'types/dataTypes';
import dayjs from 'dayjs';

export const getBoardData: (
  category: string,
  countCategory: string,
  limitNum: number,
  isNext: boolean,
  lastData: QueryDocumentSnapshot | undefined,
  prevData: QueryDocumentSnapshot | undefined,
) => Promise<
  [ILabData[], QueryDocumentSnapshot<DocumentData>[], DocumentSnapshot<DocumentData>] | false
> = async (category, countCategory, limitNum, isNext, lastData, prevData) => {
  try {
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
    const dataList: ILabData[] = [];
    data.forEach((docs) => {
      const postData = {
        ...docs.data(),
        date: dayjs(docs.data().createdAt).format('YY-MM-DD'),
        id: docs.id,
      } as ILabData;
      dataList.push(postData);
    });

    const total = await getDoc(doc(dbService, 'meta', countCategory));

    return [dataList, data.docs, total];
  } catch (err) {
    return false;
  }
};
