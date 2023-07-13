import { ILabData, IForumData, IPressData, IMovieData, INoticeData } from './dataTypes';

export interface IBoardDetailProps {
  data: ILabData | IForumData;
  path: string;
  category: string;
}

export interface IBoardDetailPropsWithDelete extends IBoardDetailProps {
  deleteBoardItem: (
    id: string,
    fileId: string | undefined,
    thumbnailId: string | undefined,
  ) => Promise<void>;
}

export interface IBoardItemProps extends IBoardDetailProps {
  deleteBoardItem: (
    id: string,
    fileId: string | undefined,
    thumbnailId: string | undefined,
  ) => Promise<void>;
}

export interface IBreadCrumbProps {
  category: string[];
  tap: string[][];
}

export interface IPaginationProps {
  currentPageNum: number;
  totalPageNum: number;
  getNextPage: () => void;
  getPrevPage: () => void;
  isDeleted?: boolean;
}

export interface IHeadmetaProps {
  title: string;
}

export interface IUploadProps {
  htmlFor: string;
}

export interface ILabelFileProps {
  text: string;
  htmlFor: string;
}

export interface IInputHideProps {
  id: string;
  type: string;
  value?: string;
  accept: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface IInputTextProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  inputMode?:
    | 'text'
    | 'search'
    | 'email'
    | 'tel'
    | 'url'
    | 'none'
    | 'numeric'
    | 'decimal'
    | undefined;
  pattern?: string;
}

export interface IBlueButtonProps {
  type: 'button' | 'submit' | 'reset' | undefined;
  text: string;
  disabled: boolean;
}

export interface IUploadButtonProps {
  tap: string[];
}

export interface IRedirectDetailProps {
  href: string;
  text?: string;
  isDark?: boolean;
}

export interface ICardProps extends ILabData {
  path: string;
}

export interface ISectionTopProps {
  title: string;
  href: string;
}

export interface ICardsProps {
  data: ILabData[];
  path: string;
}

export interface ISectPressProps {
  data: IPressData[];
}

export interface ISectForumProps {
  data: IForumData[];
}

export interface ISectLabProps {
  data: ILabData[];
}

export interface ISectMovieProps {
  data: IMovieData[];
}

export interface ISwiperProps {
  data: IMovieData[];
}

export interface IMovieItemProps {
  data: IMovieData;
}

export interface INoticeDetailProps {
  data: INoticeData;
}

export interface INoticeItemProps extends INoticeDetailProps {
  category: string;
}

export interface IPressItemProps {
  data: IPressData;
}