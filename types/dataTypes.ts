export interface IData {
  id?: string;
  createdAt?: string;
  date?: string;
  title?: string;
}

export interface IBoardData extends IData {
  content?: string | undefined;
  thumbnailId?: string;
  thumbnailData?: string;
  fileId?: string;
  fileName?: string;
}

export interface ILabData extends IBoardData {
  author?: string;
  year?: string;
}

export interface IForumData extends IBoardData {
  place?: string;
  forumDate?: string;
}

export interface IMovieData extends IData {
  ytbDate?: string;
  ytbFrom?: string;
  ytbThumbnail?: string;
  ytbUrl?: string;
}

export interface IPressData extends IData {
  pressUrl?: string;
  pressFrom?: string;
  pressDate?: string;
}

export interface INoticeData extends IData {
  content?: string | undefined;
  fileId?: string;
  fileName?: string;
}
