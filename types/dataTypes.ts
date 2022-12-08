export interface IBoardData {
  date: string;
  img: string;
  title: string;
  id: number;
}

export interface IPressData extends IBoardData {
  press: string;
}