declare interface IGetListItemsStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'getListItemsStrings' {
  const strings: IGetListItemsStrings;
  export = strings;
}
