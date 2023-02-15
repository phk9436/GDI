import { toast } from 'react-toastify';
import { v4 } from 'uuid';
import { deleteObject, getDownloadURL, ref, uploadString } from 'firebase/storage';
import { dbService, storageService } from 'api/firebase';
import { doc, updateDoc } from 'firebase/firestore';

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
  try {
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
  } catch (err) {
    return false;
  }
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
  try {
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
  } catch (err) {
    return false;
  }
};

export const updateMovieData = async (context: { [x: string]: string }) => {
  try {
    await updateDoc(doc(dbService, 'movie', context.id as string), context);
    return true;
  } catch (err) {
    return false;
  }
};

export const updatePressData = async (context: { [x: string]: string }) => {
  try {
    await updateDoc(doc(dbService, 'press', context.id as string), context);
    return true;
  } catch (err) {
    return false;
  }
};

export const updateNoticeData = async (
  context: { [x: string]: string },
  isFileChanged: boolean,
) => {
  try {
    const { id, title, fileId, fileName, fileUrl, content } = context;
    let noticeContext: { [x: string]: string } = {
      title,
    };
    if (isFileChanged) {
      const deleteFileRef = ref(storageService, `notice/${fileId}`);
      await deleteObject(deleteFileRef);
      const fileV4Id = v4();
      const fileRef = ref(storageService, `notice/${fileV4Id}`);
      await uploadString(fileRef, fileUrl, 'data_url');
      const getFileId = fileV4Id;
      noticeContext = {
        ...context,
        fileId: getFileId,
        fileName,
      };
    }
    await updateDoc(doc(dbService, 'notice', id), context);
    await updateDoc(doc(dbService, 'noticeContent', id), { content });
    return true;
  } catch (err) {
    return false;
  }
};

export const updateBoardData = async (context: { [x: string]: string }) => {
  try {
    const { id, title, author, email, content } = context;
    const boardContext: { [x: string]: string } = {
      title,
      author,
    };
    const boardDetailContext: { [x: string]: string } = {
      content,
      email,
    };

    await updateDoc(doc(dbService, 'board', id), boardContext);
    await updateDoc(doc(dbService, 'boardContent', id), boardDetailContext);
    return true;
  } catch (err) {
    return false;
  }
};
