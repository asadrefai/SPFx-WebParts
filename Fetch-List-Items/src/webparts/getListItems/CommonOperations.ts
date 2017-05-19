import { PageContext } from '@microsoft/sp-page-context';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

export interface IListItem {
  Title?: string;
  Id: number;
}

export class CommonOperations {
    
    getListItems (listName: string, itemCount: number, spContext: PageContext) {
        return "<div>Hi, this is test...</div><br /><div class='status'></div><div><ul class='items'></ul></div>";
    }

    readItems(listName: string, spHttpClient: SPHttpClient, spContext: PageContext): void {
        console.log("reading items...");
        spHttpClient.get(`${spContext.web.absoluteUrl}/_api/web/lists/getbytitle('${listName}')/items?$select=Title,Id`,
        SPHttpClient.configurations.v1,
        {
            headers: {
                'Accept': 'application/json;odata=nometadata',
                'odata-version': ''
            }
        }).then((response: SPHttpClientResponse): Promise<{ value: IListItem[] }> => {
            return response.json();
        }).then((response: { value: IListItem[] }): void => {
            console.log(`Successfully loaded ${response.value.length} items`, response.value);
            this.updateStatus(`Successfully loaded ${response.value.length} items`, response.value);
        }, (error: any): void => {
        console.log('Loading all items failed with error: ' + error);
      });
      
  }

  private updateStatus(status: string, items: IListItem[] = []): void {
    document.querySelector('.status').innerHTML = status;
    this.updateItemsHtml(items);
  }

  private updateItemsHtml(items: IListItem[]): void {
    const itemsHtml: string[] = [];
    for (let i: number = 0; i < items.length; i++) {
      itemsHtml.push(`<li>${items[i].Title} (${items[i].Id})</li>`);
    }

    document.querySelector('.items').innerHTML = itemsHtml.join('');
  }

}