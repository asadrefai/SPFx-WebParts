import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'fetchItemsStrings';
import FetchItems from './components/FetchItems';
import { IFetchItemsProps } from './components/IFetchItemsProps';
import { IFetchItemsWebPartProps } from './IFetchItemsWebPartProps';

export default class FetchItemsWebPart extends BaseClientSideWebPart<IFetchItemsWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IFetchItemsProps> = React.createElement(
      FetchItems,
      {
        spHttpClient: this.context.spHttpClient,
        siteUrl: this.context.pageContext.web.absoluteUrl,
        listName: this.properties.listName
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
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
                PropertyPaneTextField('listName', {
                  label: "Enter list name"
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
