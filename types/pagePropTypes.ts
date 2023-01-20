import {
  IMovieData,
  INoticeData,
  IPressData,
  IBoardData,
  ILabData,
  IForumData,
} from 'types/dataTypes';

export interface IConfirmProps {
  password: string;
  setPassword: (value: React.SetStateAction<string>) => void;
  checkPassword: () => void;
  isDark?: boolean;
}

export interface IFooterProps {
  isAdminPage: boolean;
}

export interface ILayoutProps {
  children: React.ReactNode;
  isAdminPage: boolean;
  isForbiden: boolean;
}

export interface IRootProps {
  children: React.ReactNode;
}

export interface IMovieItemProps {
  data: IMovieData;
  deleteMovieItem: (id: string) => Promise<void>;
}

export interface INoticeDetailProps {
  data: INoticeData;
  deleteNoticeItem: (id: string, fileId: string | undefined) => Promise<void>;
}

export interface IPressDetailProps {
  data: IPressData;
  deletePressItem: (id: string) => Promise<void>;
}

export interface IBoardItemProps {
  data: IBoardData;
}

export interface IBoardDetailPropsWithDelete extends IBoardItemProps {
  deleteBoardItem: (id: string) => Promise<void>;
}

export interface IBoardDetailPropsWithDeleteAndUpdate extends IBoardItemProps {
  deleteBoardItem: () => void;
  updateBoardItem: () => void;
}

export interface IMainpageProps {
  labList: ILabData[];
  forumList: IForumData[];
  movieList: IMovieData[];
  pressList: IPressData[];
}

export interface IBoardListProps {
  dataList: IBoardData[];
}

export interface ILabListProps {
  dataList: ILabData[];
}

export interface IForumListProps {
  dataList: IForumData[];
}

export interface INoticeListProps {
  dataList: INoticeData[];
}

export interface IMovieListProps {
  dataList: IMovieData[];
}

export interface IPressListProps {
  dataList: IPressData[];
}
