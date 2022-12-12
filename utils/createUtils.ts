import { dbService, storageService } from 'api/firebase';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { addDoc, collection, doc, increment, updateDoc } from 'firebase/firestore';
import { v4 } from 'uuid';
import dayjs from 'dayjs';

interface IcreateLabProps {
  title: string;
  author: string;
  year: string;
  content: string | undefined;
  fileUrl: string;
  fileName: string;
  thumbnailName: string;
  thumbnailUrl: string;
}

export const createLab = async (context: IcreateLabProps) => {
  const createdAt = dayjs(new Date()).format('YY-MM-DD');

  const fileV4Id = v4();
  const fileRef = ref(storageService, `lab/${fileV4Id}`);
  const fileDataString = await uploadString(fileRef, context.fileUrl, 'data_url');
  const fileData = await getDownloadURL(fileDataString.ref);
  const fileId = fileV4Id;

  const thumbnailV4Id = v4();
  const thumbnailRef = ref(storageService, `lab/${thumbnailV4Id}`);
  const thumbnailDataString = await uploadString(thumbnailRef, context.thumbnailUrl, 'data_url');
  const thumbnailData = await getDownloadURL(thumbnailDataString.ref);
  const thumbnailId = thumbnailV4Id;

  const postContext = {
    ...context,
    createdAt,
    view: 0,
    thumbnailData,
    thumbnailId,
    fileData,
    fileId,
  };

  await addDoc(collection(dbService, 'lab'), postContext);
  await updateDoc(doc(dbService, 'meta', 'labCount'), {
    //전체 게시물 개수
    total: increment(1),
  });
};
