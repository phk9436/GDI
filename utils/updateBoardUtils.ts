import { v4 } from 'uuid';
import { deleteObject, getDownloadURL, ref, uploadString } from 'firebase/storage';
import { dbService, storageService } from 'api/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { IMovieData } from 'types/dataTypes';

export const updateLabData: (
  id: string,
  category: string,
  title: string,
  content: string,
  author: string,
  year: string,
  isFileChanged: boolean,
  isThumnailChanged: boolean,
  fileId: string,
  fileUrl: string,
  fileName: string,
  thumbnailId: string,
  thumbnailUrl: string,
) => Promise<boolean> = async (
  id,
  category,
  title,
  content,
  author,
  year,
  isFileChanged,
  isThumbnailChanged,
  fileId,
  fileUrl,
  fileName,
  thumbnailId,
  thumbnailUrl,
) => {
  if (!content || !title || !author || !year) {
    alert('항목이 모두 채워지지 않았습니다');
    return false;
  }
  let context: { [x: string]: string } = {
    title,
    author,
    year,
  };
  if (isFileChanged) {
    const deleteFileRef = ref(storageService, `${category}/${fileId}`);
    await deleteObject(deleteFileRef);
    const fileV4Id = v4();
    const fileRef = ref(storageService, `${category}/${fileV4Id}`);
    await uploadString(fileRef, fileUrl, 'data_url');
    const getFileId = fileV4Id;
    context = {
      ...context,
      fileId: getFileId,
      fileName,
    };
  }
  if (isThumbnailChanged) {
    const deleteThumbnailRef = ref(storageService, `${category}/${thumbnailId}`);
    await deleteObject(deleteThumbnailRef);
    const thumbnailV4Id = v4();
    const thumbnailRef = ref(storageService, `${category}/${thumbnailV4Id}`);
    const thumbnailDataString = await uploadString(thumbnailRef, thumbnailUrl, 'data_url');
    const thumbnailData = await getDownloadURL(thumbnailDataString.ref);
    const getThumbnailId = thumbnailV4Id;
    context = {
      ...context,
      thumbnailId: getThumbnailId,
      thumbnailData,
    };
  }
  await updateDoc(doc(dbService, category, id), context);
  await updateDoc(doc(dbService, `${category}Content`, id), { content });
  return true;
};

export const updateForumData: (
  id: string,
  category: string,
  title: string,
  place: string,
  forumDate: string,
  content: string,
  isFileChanged: boolean,
  isThumnailChanged: boolean,
  fileId: string,
  fileUrl: string,
  fileName: string,
  thumbnailId: string,
  thumbnailUrl: string,
) => Promise<boolean> = async (
  id,
  category,
  title,
  place,
  forumDate,
  content,
  isFileChanged,
  isThumbnailChanged,
  fileId,
  fileUrl,
  fileName,
  thumbnailId,
  thumbnailUrl,
) => {
  if (!content || !title || !place || !forumDate) {
    alert('항목이 모두 채워지지 않았습니다');
    return false;
  }
  let context: { [x: string]: string } = {
    title,
    place,
    forumDate,
  };
  if (isFileChanged) {
    if (fileId) {
      const deleteFileRef = ref(storageService, `${category}/${fileId}`);
      await deleteObject(deleteFileRef);
    }
    const fileV4Id = v4();
    const fileRef = ref(storageService, `${category}/${fileV4Id}`);
    await uploadString(fileRef, fileUrl, 'data_url');
    const getFileId = fileV4Id;
    context = {
      ...context,
      fileId: getFileId,
      fileName,
    };
  }
  if (isThumbnailChanged) {
    const deleteThumbnailRef = ref(storageService, `${category}/${thumbnailId}`);
    await deleteObject(deleteThumbnailRef);
    const thumbnailV4Id = v4();
    const thumbnailRef = ref(storageService, `${category}/${thumbnailV4Id}`);
    const thumbnailDataString = await uploadString(thumbnailRef, thumbnailUrl, 'data_url');
    const thumbnailData = await getDownloadURL(thumbnailDataString.ref);
    const getThumbnailId = thumbnailV4Id;
    context = {
      ...context,
      thumbnailId: getThumbnailId,
      thumbnailData,
    };
  }
  await updateDoc(doc(dbService, category, id), context);
  await updateDoc(doc(dbService, `${category}Content`, id), { content });
  return true;
};

export const updateMovieData = async (context: { [x: string]: string }) => {
  const { id, title, ytbDate, ytbUrl, ytbThumbnail, ytbFrom } = context;
  if (!title || !ytbDate || !ytbUrl || !ytbThumbnail || !ytbFrom) {
    alert('항목이 모두 채워지지 않았습니다');
    return false;
  }
  await updateDoc(doc(dbService, 'movie', id as string), context);
  return true;
};

export const updatePressData = async (context: { [x: string]: string }) => {
  const { id, title, pressUrl, pressFrom, pressDate } = context;
  if (!title || !pressUrl || !pressFrom || !pressDate) {
    alert('항목이 모두 채워지지 않았습니다');
    return false;
  }
  await updateDoc(doc(dbService, 'press', id as string), context);
  return true;
};
