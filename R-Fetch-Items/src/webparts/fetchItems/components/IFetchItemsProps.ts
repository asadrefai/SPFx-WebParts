import { SPHttpClient } from '@microsoft/sp-http';

export interface IFetchItemsProps {
  listName: string;
  spHttpClient: SPHttpClient;
  siteUrl: string;
}
