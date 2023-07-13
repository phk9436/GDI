import { toast } from 'react-toastify';
import { dbService, storageService } from 'api/firebase';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { doc, increment, setDoc, updateDoc } from 'firebase/firestore';
import { v4 } from 'uuid';
import dayjs from 'dayjs';

interface IcreateLabProps {
  title: string;
  author: string;
  year: string;
  content: string | undefined;
  fileUrl: string;
  fileName: string;
  thumbnailUrl: string;
}

interface IcreateForumProps {
  title: string;
  place: string;
  forumDate: string;
  content: string | undefined;
  fileUrl: string;
  fileName: string;
  thumbnailUrl: string;
}

interface ICreateMovieProps {
  title: string;
  ytbUrl: string;
  ytbFrom: string;
  ytbDate: string;
  ytbThumbnail: string;
}

interface ICreatePressProps {
  title: string;
  pressUrl: string;
  pressFrom: string;
  pressDate: string;
}

interface ICreateNoticeProps {
  title: string;
  fileUrl: string;
  fileName: string;
  content: string | undefined;
}

interface ICreateBoardProps {
  title: string;
  email: string;
  author: string;
  password: string;
  content: string | undefined;
}

interface ISetThumbnailUrl {
  (value: React.SetStateAction<string>):void;
}

interface IUploadThumbnail {
  (e: React.ChangeEvent<HTMLInputElement>, setThumbnailUrl: ISetThumbnailUrl): void;
}

export const uploadThumbnail: IUploadThumbnail = (e, setThumbnailUrl) => {
  const { files } = e.target;
  if (!files?.length) {
    toast('파일을 등록해주세요');
    return;
  }
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
    toast('파일을 등록해주세요');
    return;
  }
  setFileName(files[0].name);
  const reader = new FileReader();
  reader.readAsDataURL(files[0]);
  reader.onloadend = () => setFileUrl(reader.result as string);
};

export const createLab = async (context: IcreateLabProps) => {
  try {
    const createdAt = dayjs(new Date()).format('YYYYMMDDHHmmss');
    const fileV4Id = v4();
    const fileRef = ref(storageService, `lab/${fileV4Id}`);
    await uploadString(fileRef, context.fileUrl, 'data_url');
    const fileId = fileV4Id;

    const thumbnailV4Id = v4();
    const thumbnailRef = ref(storageService, `lab/${thumbnailV4Id}`);
    const thumbnailDataString = await uploadString(thumbnailRef, context.thumbnailUrl, 'data_url');
    const thumbnailData = await getDownloadURL(thumbnailDataString.ref);
    const thumbnailId = thumbnailV4Id;

    const boardId = v4();

    const postContext = {
      title: context.title,
      author: context.author,
      year: context.year,
      createdAt,
      thumbnailData,
      thumbnailId,
      fileName: context.fileName,
      fileId,
      boardId,
    };

    await setDoc(doc(dbService, 'lab', boardId), postContext);
    await setDoc(doc(dbService, 'labContent', boardId), {
      content: context.content,
    });
    await updateDoc(doc(dbService, 'meta', 'labCount'), {
      //전체 게시물 개수
      total: increment(1),
    });
    return true;
  } catch (err) {
    return false;
  }
};

export const createForum = async (context: IcreateForumProps) => {
  try {
    const createdAt = dayjs(new Date()).format('YYYYMMDDHHmmss');

    let fileId = '';
    if (context.fileUrl) {
      const fileV4Id = v4();
      const fileRef = ref(storageService, `forum/${fileV4Id}`);
      await uploadString(fileRef, context.fileUrl, 'data_url');
      fileId = fileV4Id;
    }

    const thumbnailV4Id = v4();
    const thumbnailRef = ref(storageService, `forum/${thumbnailV4Id}`);
    const thumbnailDataString = await uploadString(thumbnailRef, context.thumbnailUrl, 'data_url');
    const thumbnailData = await getDownloadURL(thumbnailDataString.ref);
    const thumbnailId = thumbnailV4Id;

    const boardId = v4();

    const postContext = {
      title: context.title,
      place: context.place,
      forumDate: context.forumDate,
      createdAt,
      thumbnailData,
      thumbnailId,
      fileName: context.fileName,
      fileId,
    };

    await setDoc(doc(dbService, 'forum', boardId), postContext);
    await setDoc(doc(dbService, 'forumContent', boardId), {
      content: context.content,
    });
    await updateDoc(doc(dbService, 'meta', 'forumCount'), {
      //전체 게시물 개수
      total: increment(1),
    });
    return true;
  } catch (err) {
    return false;
  }
};

export const createMovie = async (context: ICreateMovieProps) => {
  try {
    const createdAt = dayjs(new Date()).format('YYYYMMDDHHmmss');
    const boardId = v4();
    await setDoc(doc(dbService, 'movie', boardId), { ...context, createdAt });
    await updateDoc(doc(dbService, 'meta', 'movieCount'), {
      //전체 게시물 개수
      total: increment(1),
    });
    return true;
  } catch (err) {
    return false;
  }
};

export const createPress = async (context: ICreatePressProps) => {
  try {
    const createdAt = dayjs(new Date()).format('YYYYMMDDHHmmss');
    const boardId = v4();
    await setDoc(doc(dbService, 'press', boardId), { ...context, createdAt });
    await updateDoc(doc(dbService, 'meta', 'pressCount'), {
      //전체 게시물 개수
      total: increment(1),
    });
    return true;
  } catch (err) {
    return false;
  }
};

export const createNotice = async (context: ICreateNoticeProps) => {
  try {
    const createdAt = dayjs(new Date()).format('YYYYMMDDHHmmss');

    let fileId = '';
    if (context.fileUrl) {
      const fileV4Id = v4();
      const fileRef = ref(storageService, `notice/${fileV4Id}`);
      await uploadString(fileRef, context.fileUrl, 'data_url');
      fileId = fileV4Id;
    }

    const boardId = v4();

    const postContext = {
      title: context.title,
      createdAt,
      fileName: context.fileName,
      fileId,
      boardId,
    };

    await setDoc(doc(dbService, 'notice', boardId), postContext);
    await setDoc(doc(dbService, 'noticeContent', boardId), {
      content: context.content,
    });
    await updateDoc(doc(dbService, 'meta', 'noticeCount'), {
      //전체 게시물 개수
      total: increment(1),
    });
    return true;
  } catch (err) {
    return false;
  }
};

export const createBoard = async (context: ICreateBoardProps) => {
  try {
    const createdAt = dayjs(new Date()).format('YYYYMMDDHHmmss');
    const boardId = v4();
    const postContext = {
      title: context.title,
      createdAt,
      author: context.author,
      password: context.password,
    };

    await setDoc(doc(dbService, 'board', boardId), postContext);
    await setDoc(doc(dbService, 'boardContent', boardId), {
      content: context.content,
      email: context.email,
    });
    await updateDoc(doc(dbService, 'meta', 'boardCount'), {
      //전체 게시물 개수
      total: increment(1),
    });
    return true;
  } catch (err) {
    return false;
  }
};
