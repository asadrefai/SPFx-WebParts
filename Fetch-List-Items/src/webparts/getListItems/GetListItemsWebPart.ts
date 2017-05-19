import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './GetListItems.module.scss';
import * as strings from 'getListItemsStrings';
import { IGetListItemsWebPartProps } from './IGetListItemsWebPartProps';

//----//
import { CommonOperations } from './CommonOperations'

export default class GetListItemsWebPart extends BaseClientSideWebPart<IGetListItemsWebPartProps> {

  public render(): void {
    
      let objListOps = new CommonOperations();
      
      this.domElement.innerHTML = objListOps.getListItems(this.properties.listName, this.properties.itemCount, this.context.pageContext)
      objListOps.readItems(this.properties.listName, this.context.spHttpClient, this.context.pageContext)
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('listName', {
                  label: "Please provide List Name"
                }),
                PropertyPaneTextField('itemCount', {
                  label: "How many items you want to pull?"
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
