import { v4 } from 'uuid';
import { deleteObject, getDownloadURL, ref, uploadString } from 'firebase/storage';
import { dbService, storageService } from 'api/firebase';
import { doc, updateDoc } from 'firebase/firestore';

export const updateBoardData: (
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
) => Promise<void> = async (
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
    return;
  }
  let context: { [x: string]: string } = {
    title,
    content,
    author,
    year,
  };
  if (isFileChanged) {
    const deleteFileRef = ref(storageService, `${category}/${fileId}`);
    await deleteObject(deleteFileRef);
    const fileV4Id = v4();
    const fileRef = ref(storageService, `${category}/${fileV4Id}`);
    const data = await uploadString(fileRef, fileUrl, 'data_url');
    const fileData = await getDownloadURL(data.ref);
    const getFileId = fileV4Id;
    context = {
      ...context,
      fileId: getFileId,
      fileName,
      fileData,
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
};
