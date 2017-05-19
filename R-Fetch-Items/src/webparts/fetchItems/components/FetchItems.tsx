import * as React from 'react';
import styles from './FetchItems.module.scss';
import { IFetchItemsProps } from './IFetchItemsProps';
import { escape } from '@microsoft/sp-lodash-subset';

import { IFetchItemsState } from './IFetchItemsState';
import { IListItem } from './IListItem';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

export default class FetchItems extends React.Component<IFetchItemsProps, IFetchItemsState> {

  constructor(props: IFetchItemsProps, state: IFetchItemsState) {
    super(props);
    this.state = {
      status: 'Ready',
      items: []
    };
  }

  public componentWillReceiveProps(nextProps: IFetchItemsProps): void {
    this.setState({
      status: 'Ready',
      items: []
    });
  }

  public render(): React.ReactElement<IFetchItemsState> {

    const items: JSX.Element[] = this.state.items.map((item: IListItem, i: number): JSX.Element => {
      return (
        <li>{item.Title} ({item.Id}) </li>
      );
    });
    
    
    return (
      <div>
        <div>This is test</div>
        <div className={`ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}`}>
            <div className='ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1'>
              <a href="#" className={`${styles.button}`} onClick={() => this.readItems()}>
                <span>Read all items</span>
              </a>
            </div>
          </div>
        <div>
              {this.state.status}
              {items.length}
              <ul>
                {items}
              </ul>
        </div>
      </div>
    );
    
  }

  private readItems(): void {
    this.setState({
      status: 'Loading all items...',
      items: []
    });

    this.props.spHttpClient.get(`${this.props.siteUrl}/_api/web/lists/getbytitle('${this.props.listName}')/items?$select=Title,Id`,
      SPHttpClient.configurations.v1,
      {
        headers: {
          'Accept': 'application/json;odata=nometadata',
          'odata-version': ''
        }
      })
      .then((response: SPHttpClientResponse): Promise<{ value: IListItem[] }> => {
        return response.json();
      })
      .then((response: { value: IListItem[] }): void => {
        console.log(`Successfully loaded ${response.value.length} items`);
        this.setState({
          status: `Successfully loaded ${response.value.length} items`,
          items: response.value
        });
      }, (error: any): void => {
        this.setState({
          status: 'Loading all items failed with error: ' + error,
          items: []
        });
      });
  }
}
