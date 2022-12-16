export interface IPressData extends IBoardData {
  press: string;
}

export interface IBoardData {
  id?: string;
  createdAt?: string;
  date?: string;
  title?: string;
  author?: string;
  year?: string;
  content?: string | undefined;
  thumbnailId?: string;
  thumbnailUrl?: string;
  fileId?: string;
  fileUrl?: string;
  fileName?: string;
}
