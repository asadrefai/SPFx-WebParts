import { IListItem } from './IListItem';

export interface IFetchItemsState {
  status: string;
  items: IListItem[];
}