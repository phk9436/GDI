export interface IPressData extends IBoardData {
  press: string;
}

export interface IData {
  id?: string;
  createdAt?: string;
  date?: string;
  title?: string;
  content?: string | undefined;
  thumbnailId?: string;
  thumbnailData?: string;
  fileId?: string;
  fileName?: string;
}

export interface IBoardData extends IData {
  author?: string;
  year?: string;
}

export interface IForumData extends IData {
  place?: string;
  forumDate?: string;
}