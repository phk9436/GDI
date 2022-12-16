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

interface IcreateForumProps {
  title: string;
  place: string;
  forumDate: string;
  content: string | undefined;
  fileUrl: string;
  fileName: string;
  thumbnailName: string;
  thumbnailUrl: string;
}

export const uploadThumbnail: (
  e: React.ChangeEvent<HTMLInputElement>,
  setThumbnailName: (value: React.SetStateAction<string>) => void,
  setThumbnailUrl: (value: React.SetStateAction<string>) => void,
) => void = (e: React.ChangeEvent<HTMLInputElement>, setThumbnailName, setThumbnailUrl) => {
  const { files } = e.target;
  if (!files?.length) {
    alert('파일을 등록해주세요');
    return;
  }
  setThumbnailName(files[0].name);
  const reader = new FileReader();
  reader.readAsDataURL(files[0]);
  reader.onloadend = () => setThumbnailUrl(reader.result as string);
};

export const uploadFile: (
  e: React.ChangeEvent<HTMLInputElement>,
  setFileName: (value: React.SetStateAction<string>) => void,
  setFileUrl: (value: React.SetStateAction<string>) => void,
) => void = (e: React.ChangeEvent<HTMLInputElement>, setFileName, setFileUrl) => {
  const { files } = e.target;
  if (!files?.length) {
    alert('파일을 등록해주세요');
    return;
  }
  setFileName(files[0].name);
  const reader = new FileReader();
  reader.readAsDataURL(files[0]);
  reader.onloadend = () => setFileUrl(reader.result as string);
};

export const createLab = async (context: IcreateLabProps) => {
  const createdAt = dayjs(new Date()).format('YYYYMMDDhhmmss');
  const date = dayjs(new Date()).format('YY-MM-DD');
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
    date,
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

export const createForum = async (context: IcreateForumProps) => {
  const createdAt = dayjs(new Date()).format('YYYYMMDDhhmmss');
  const date = dayjs(new Date()).format('YY-MM-DD');

  let fileId = '';
  let fileData = '';
  if (context.fileUrl) {
    const fileV4Id = v4();
    const fileRef = ref(storageService, `forum/${fileV4Id}`);
    const fileDataString = await uploadString(fileRef, context.fileUrl, 'data_url');
    fileData = await getDownloadURL(fileDataString.ref);
    fileId = fileV4Id;
  }

  const thumbnailV4Id = v4();
  const thumbnailRef = ref(storageService, `forum/${thumbnailV4Id}`);
  const thumbnailDataString = await uploadString(thumbnailRef, context.thumbnailUrl, 'data_url');
  const thumbnailData = await getDownloadURL(thumbnailDataString.ref);
  const thumbnailId = thumbnailV4Id;

  const postContext = {
    ...context,
    createdAt,
    date,
    view: 0,
    thumbnailData,
    thumbnailId,
    fileData,
    fileId,
  };

  await addDoc(collection(dbService, 'forum'), postContext);
  await updateDoc(doc(dbService, 'meta', 'forumCount'), {
    //전체 게시물 개수
    total: increment(1),
  });
};
