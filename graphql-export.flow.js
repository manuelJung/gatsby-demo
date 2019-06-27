/* @flow */

declare type GraphQLResponseRoot = {
  data?: Query;
  errors?: Array<GraphQLResponseError>;
}

declare type GraphQLResponseError = {
  message: string;            // Required for all errors
  locations?: Array<GraphQLResponseErrorLocation>;
  [propName: string]: any;    // 7.2.2 says 'GraphQL servers may provide additional entries to error'
}

declare type GraphQLResponseErrorLocation = {
  line: number;
  column: number;
}

declare type Query = {
  sitePage: ?SitePage;
  allSitePage: ?SitePageConnection;
  sitePlugin: ?SitePlugin;
  allSitePlugin: ?SitePluginConnection;
  site: ?Site;
  allSite: ?SiteConnection;
  pages: ?pages;
  allPages: ?pagesConnection;
  navigation: ?navigation;
  allNavigation: ?navigationConnection;
  category: ?category;
  allCategory: ?categoryConnection;
}

declare type StringQueryOperatorInput = {
  eq: ?string;
  ne: ?string;
  in: ?Array<string>;
  nin: ?Array<string>;
  regex: ?string;
  glob: ?string;
}

declare type NodeFilterInput = {
  id: ?StringQueryOperatorInput;
  parent: ?NodeFilterInput;
  children: ?NodeFilterListInput;
  internal: ?InternalFilterInput;
}

declare type NodeFilterListInput = {
  elemMatch: ?NodeFilterInput;
}

declare type InternalFilterInput = {
  content: ?StringQueryOperatorInput;
  contentDigest: ?StringQueryOperatorInput;
  description: ?StringQueryOperatorInput;
  fieldOwners: ?StringQueryOperatorInput;
  ignoreType: ?BooleanQueryOperatorInput;
  mediaType: ?StringQueryOperatorInput;
  owner: ?StringQueryOperatorInput;
  type: ?StringQueryOperatorInput;
}

declare type BooleanQueryOperatorInput = {
  eq: ?boolean;
  ne: ?boolean;
  in: ?Array<boolean>;
  nin: ?Array<boolean>;
}

declare type SitePageContextFilterInput = {
  page: ?SitePageContextPageFilterInput;
}

declare type SitePageContextPageFilterInput = {
  title: ?StringQueryOperatorInput;
  objectID: ?StringQueryOperatorInput;
  urlKey: ?StringQueryOperatorInput;
  story: ?SitePageContextPageStoryFilterInput;
}

declare type SitePageContextPageStoryFilterInput = {
  dict: ?SitePageContextPageStoryDictFilterInput;
  grids: ?SitePageContextPageStoryGridsFilterInput;
}

declare type SitePageContextPageStoryDictFilterInput = {
  _123456: ?SitePageContextPageStoryDict_123456FilterInput;
}

declare type SitePageContextPageStoryDict_123456FilterInput = {
  name: ?StringQueryOperatorInput;
  id: ?StringQueryOperatorInput;
  props: ?SitePageContextPageStoryDict_123456PropsFilterInput;
}

declare type SitePageContextPageStoryDict_123456PropsFilterInput = {
  foo: ?StringQueryOperatorInput;
}

declare type SitePageContextPageStoryGridsFilterInput = {
  MOBILE_M: ?SitePageContextPageStoryGridsMOBILE_MFilterInput;
}

declare type SitePageContextPageStoryGridsMOBILE_MFilterInput = {
  components: ?StringQueryOperatorInput;
  css: ?StringQueryOperatorInput;
}

declare type SitePluginFilterInput = {
  id: ?StringQueryOperatorInput;
  parent: ?NodeFilterInput;
  children: ?NodeFilterListInput;
  internal: ?InternalFilterInput;
  resolve: ?StringQueryOperatorInput;
  name: ?StringQueryOperatorInput;
  version: ?StringQueryOperatorInput;
  pluginOptions: ?SitePluginPluginOptionsFilterInput;
  nodeAPIs: ?StringQueryOperatorInput;
  ssrAPIs: ?StringQueryOperatorInput;
  pluginFilepath: ?StringQueryOperatorInput;
  packageJson: ?SitePluginPackageJsonFilterInput;
}

declare type SitePluginPluginOptionsFilterInput = {
  path: ?StringQueryOperatorInput;
  pathCheck: ?BooleanQueryOperatorInput;
}

declare type SitePluginPackageJsonFilterInput = {
  name: ?StringQueryOperatorInput;
  description: ?StringQueryOperatorInput;
  version: ?StringQueryOperatorInput;
  main: ?StringQueryOperatorInput;
  license: ?StringQueryOperatorInput;
  dependencies: ?SitePluginPackageJsonDependenciesFilterListInput;
  devDependencies: ?SitePluginPackageJsonDevDependenciesFilterListInput;
  peerDependencies: ?SitePluginPackageJsonPeerDependenciesFilterListInput;
  keywords: ?StringQueryOperatorInput;
}

declare type SitePluginPackageJsonDependenciesFilterListInput = {
  elemMatch: ?SitePluginPackageJsonDependenciesFilterInput;
}

declare type SitePluginPackageJsonDependenciesFilterInput = {
  name: ?StringQueryOperatorInput;
  version: ?StringQueryOperatorInput;
}

declare type SitePluginPackageJsonDevDependenciesFilterListInput = {
  elemMatch: ?SitePluginPackageJsonDevDependenciesFilterInput;
}

declare type SitePluginPackageJsonDevDependenciesFilterInput = {
  name: ?StringQueryOperatorInput;
  version: ?StringQueryOperatorInput;
}

declare type SitePluginPackageJsonPeerDependenciesFilterListInput = {
  elemMatch: ?SitePluginPackageJsonPeerDependenciesFilterInput;
}

declare type SitePluginPackageJsonPeerDependenciesFilterInput = {
  name: ?StringQueryOperatorInput;
  version: ?StringQueryOperatorInput;
}

declare type SitePage = {
  id: string;
  parent: ?Node;
  children: Array<Node>;
  internal: Internal;
  path: ?string;
  jsonName: ?string;
  internalComponentName: ?string;
  component: ?string;
  componentChunkName: ?string;
  isCreatedByStatefulCreatePages: ?boolean;
  context: ?SitePageContext;
  pluginCreator: ?SitePlugin;
  pluginCreatorId: ?string;
  componentPath: ?string;
}

/**
  Node Interface
*/
declare type Node = SitePage | SitePlugin | Site | pages | navigation | category;

declare type Internal = {
  content: ?string;
  contentDigest: string;
  description: ?string;
  fieldOwners: ?Array<string>;
  ignoreType: ?boolean;
  mediaType: ?string;
  owner: string;
  type: string;
}

declare type SitePageContext = {
  page: ?SitePageContextPage;
}

declare type SitePageContextPage = {
  title: ?string;
  objectID: ?string;
  urlKey: ?string;
  story: ?SitePageContextPageStory;
}

declare type SitePageContextPageStory = {
  dict: ?SitePageContextPageStoryDict;
  grids: ?SitePageContextPageStoryGrids;
}

declare type SitePageContextPageStoryDict = {
  _123456: ?SitePageContextPageStoryDict_123456;
}

declare type SitePageContextPageStoryDict_123456 = {
  name: ?string;
  id: ?string;
  props: ?SitePageContextPageStoryDict_123456Props;
}

declare type SitePageContextPageStoryDict_123456Props = {
  foo: ?string;
}

declare type SitePageContextPageStoryGrids = {
  MOBILE_M: ?SitePageContextPageStoryGridsMOBILE_M;
}

declare type SitePageContextPageStoryGridsMOBILE_M = {
  components: ?Array<string>;
  css: ?string;
}

declare type SitePlugin = {
  id: string;
  parent: ?Node;
  children: Array<Node>;
  internal: Internal;
  resolve: ?string;
  name: ?string;
  version: ?string;
  pluginOptions: ?SitePluginPluginOptions;
  nodeAPIs: ?Array<string>;
  ssrAPIs: ?Array<string>;
  pluginFilepath: ?string;
  packageJson: ?SitePluginPackageJson;
}

declare type SitePluginPluginOptions = {
  path: ?string;
  pathCheck: ?boolean;
}

declare type SitePluginPackageJson = {
  name: ?string;
  description: ?string;
  version: ?string;
  main: ?string;
  license: ?string;
  dependencies: ?Array<SitePluginPackageJsonDependencies>;
  devDependencies: ?Array<SitePluginPackageJsonDevDependencies>;
  peerDependencies: ?Array<SitePluginPackageJsonPeerDependencies>;
  keywords: ?Array<string>;
}

declare type SitePluginPackageJsonDependencies = {
  name: ?string;
  version: ?string;
}

declare type SitePluginPackageJsonDevDependencies = {
  name: ?string;
  version: ?string;
}

declare type SitePluginPackageJsonPeerDependencies = {
  name: ?string;
  version: ?string;
}

declare type SitePageFilterInput = {
  id: ?StringQueryOperatorInput;
  parent: ?NodeFilterInput;
  children: ?NodeFilterListInput;
  internal: ?InternalFilterInput;
  path: ?StringQueryOperatorInput;
  jsonName: ?StringQueryOperatorInput;
  internalComponentName: ?StringQueryOperatorInput;
  component: ?StringQueryOperatorInput;
  componentChunkName: ?StringQueryOperatorInput;
  isCreatedByStatefulCreatePages: ?BooleanQueryOperatorInput;
  context: ?SitePageContextFilterInput;
  pluginCreator: ?SitePluginFilterInput;
  pluginCreatorId: ?StringQueryOperatorInput;
  componentPath: ?StringQueryOperatorInput;
}

declare type SitePageSortInput = {
  fields: ?Array<SitePageFieldsEnum>;
  order: ?Array<SortOrderEnum>;
}

declare type SitePageFieldsEnum = "id" | "parent___id" | "parent___parent___id" | "parent___parent___parent___id" | "parent___parent___parent___children" | "parent___parent___children" | "parent___parent___children___id" | "parent___parent___children___children" | "parent___parent___internal___content" | "parent___parent___internal___contentDigest" | "parent___parent___internal___description" | "parent___parent___internal___fieldOwners" | "parent___parent___internal___ignoreType" | "parent___parent___internal___mediaType" | "parent___parent___internal___owner" | "parent___parent___internal___type" | "parent___children" | "parent___children___id" | "parent___children___parent___id" | "parent___children___parent___children" | "parent___children___children" | "parent___children___children___id" | "parent___children___children___children" | "parent___children___internal___content" | "parent___children___internal___contentDigest" | "parent___children___internal___description" | "parent___children___internal___fieldOwners" | "parent___children___internal___ignoreType" | "parent___children___internal___mediaType" | "parent___children___internal___owner" | "parent___children___internal___type" | "parent___internal___content" | "parent___internal___contentDigest" | "parent___internal___description" | "parent___internal___fieldOwners" | "parent___internal___ignoreType" | "parent___internal___mediaType" | "parent___internal___owner" | "parent___internal___type" | "children" | "children___id" | "children___parent___id" | "children___parent___parent___id" | "children___parent___parent___children" | "children___parent___children" | "children___parent___children___id" | "children___parent___children___children" | "children___parent___internal___content" | "children___parent___internal___contentDigest" | "children___parent___internal___description" | "children___parent___internal___fieldOwners" | "children___parent___internal___ignoreType" | "children___parent___internal___mediaType" | "children___parent___internal___owner" | "children___parent___internal___type" | "children___children" | "children___children___id" | "children___children___parent___id" | "children___children___parent___children" | "children___children___children" | "children___children___children___id" | "children___children___children___children" | "children___children___internal___content" | "children___children___internal___contentDigest" | "children___children___internal___description" | "children___children___internal___fieldOwners" | "children___children___internal___ignoreType" | "children___children___internal___mediaType" | "children___children___internal___owner" | "children___children___internal___type" | "children___internal___content" | "children___internal___contentDigest" | "children___internal___description" | "children___internal___fieldOwners" | "children___internal___ignoreType" | "children___internal___mediaType" | "children___internal___owner" | "children___internal___type" | "internal___content" | "internal___contentDigest" | "internal___description" | "internal___fieldOwners" | "internal___ignoreType" | "internal___mediaType" | "internal___owner" | "internal___type" | "path" | "jsonName" | "internalComponentName" | "component" | "componentChunkName" | "isCreatedByStatefulCreatePages" | "context___page___title" | "context___page___objectID" | "context___page___urlKey" | "pluginCreator___id" | "pluginCreator___parent___id" | "pluginCreator___parent___parent___id" | "pluginCreator___parent___parent___children" | "pluginCreator___parent___children" | "pluginCreator___parent___children___id" | "pluginCreator___parent___children___children" | "pluginCreator___parent___internal___content" | "pluginCreator___parent___internal___contentDigest" | "pluginCreator___parent___internal___description" | "pluginCreator___parent___internal___fieldOwners" | "pluginCreator___parent___internal___ignoreType" | "pluginCreator___parent___internal___mediaType" | "pluginCreator___parent___internal___owner" | "pluginCreator___parent___internal___type" | "pluginCreator___children" | "pluginCreator___children___id" | "pluginCreator___children___parent___id" | "pluginCreator___children___parent___children" | "pluginCreator___children___children" | "pluginCreator___children___children___id" | "pluginCreator___children___children___children" | "pluginCreator___children___internal___content" | "pluginCreator___children___internal___contentDigest" | "pluginCreator___children___internal___description" | "pluginCreator___children___internal___fieldOwners" | "pluginCreator___children___internal___ignoreType" | "pluginCreator___children___internal___mediaType" | "pluginCreator___children___internal___owner" | "pluginCreator___children___internal___type" | "pluginCreator___internal___content" | "pluginCreator___internal___contentDigest" | "pluginCreator___internal___description" | "pluginCreator___internal___fieldOwners" | "pluginCreator___internal___ignoreType" | "pluginCreator___internal___mediaType" | "pluginCreator___internal___owner" | "pluginCreator___internal___type" | "pluginCreator___resolve" | "pluginCreator___name" | "pluginCreator___version" | "pluginCreator___pluginOptions___path" | "pluginCreator___pluginOptions___pathCheck" | "pluginCreator___nodeAPIs" | "pluginCreator___ssrAPIs" | "pluginCreator___pluginFilepath" | "pluginCreator___packageJson___name" | "pluginCreator___packageJson___description" | "pluginCreator___packageJson___version" | "pluginCreator___packageJson___main" | "pluginCreator___packageJson___license" | "pluginCreator___packageJson___dependencies" | "pluginCreator___packageJson___dependencies___name" | "pluginCreator___packageJson___dependencies___version" | "pluginCreator___packageJson___devDependencies" | "pluginCreator___packageJson___devDependencies___name" | "pluginCreator___packageJson___devDependencies___version" | "pluginCreator___packageJson___peerDependencies" | "pluginCreator___packageJson___peerDependencies___name" | "pluginCreator___packageJson___peerDependencies___version" | "pluginCreator___packageJson___keywords" | "pluginCreatorId" | "componentPath";

declare type SortOrderEnum = "ASC" | "DESC";

declare type SitePageConnection = {
  totalCount: number;
  edges: Array<SitePageEdge>;
  nodes: Array<SitePage>;
  pageInfo: PageInfo;
  distinct: Array<string>;
  group: Array<SitePageGroupConnection>;
}

declare type SitePageEdge = {
  next: ?SitePage;
  node: SitePage;
  previous: ?SitePage;
}

declare type PageInfo = {
  hasNextPage: boolean;
}

declare type SitePageGroupConnection = {
  totalCount: number;
  edges: Array<SitePageEdge>;
  nodes: Array<SitePage>;
  pageInfo: PageInfo;
  field: string;
  fieldValue: ?string;
}

declare type SitePluginSortInput = {
  fields: ?Array<SitePluginFieldsEnum>;
  order: ?Array<SortOrderEnum>;
}

declare type SitePluginFieldsEnum = "id" | "parent___id" | "parent___parent___id" | "parent___parent___parent___id" | "parent___parent___parent___children" | "parent___parent___children" | "parent___parent___children___id" | "parent___parent___children___children" | "parent___parent___internal___content" | "parent___parent___internal___contentDigest" | "parent___parent___internal___description" | "parent___parent___internal___fieldOwners" | "parent___parent___internal___ignoreType" | "parent___parent___internal___mediaType" | "parent___parent___internal___owner" | "parent___parent___internal___type" | "parent___children" | "parent___children___id" | "parent___children___parent___id" | "parent___children___parent___children" | "parent___children___children" | "parent___children___children___id" | "parent___children___children___children" | "parent___children___internal___content" | "parent___children___internal___contentDigest" | "parent___children___internal___description" | "parent___children___internal___fieldOwners" | "parent___children___internal___ignoreType" | "parent___children___internal___mediaType" | "parent___children___internal___owner" | "parent___children___internal___type" | "parent___internal___content" | "parent___internal___contentDigest" | "parent___internal___description" | "parent___internal___fieldOwners" | "parent___internal___ignoreType" | "parent___internal___mediaType" | "parent___internal___owner" | "parent___internal___type" | "children" | "children___id" | "children___parent___id" | "children___parent___parent___id" | "children___parent___parent___children" | "children___parent___children" | "children___parent___children___id" | "children___parent___children___children" | "children___parent___internal___content" | "children___parent___internal___contentDigest" | "children___parent___internal___description" | "children___parent___internal___fieldOwners" | "children___parent___internal___ignoreType" | "children___parent___internal___mediaType" | "children___parent___internal___owner" | "children___parent___internal___type" | "children___children" | "children___children___id" | "children___children___parent___id" | "children___children___parent___children" | "children___children___children" | "children___children___children___id" | "children___children___children___children" | "children___children___internal___content" | "children___children___internal___contentDigest" | "children___children___internal___description" | "children___children___internal___fieldOwners" | "children___children___internal___ignoreType" | "children___children___internal___mediaType" | "children___children___internal___owner" | "children___children___internal___type" | "children___internal___content" | "children___internal___contentDigest" | "children___internal___description" | "children___internal___fieldOwners" | "children___internal___ignoreType" | "children___internal___mediaType" | "children___internal___owner" | "children___internal___type" | "internal___content" | "internal___contentDigest" | "internal___description" | "internal___fieldOwners" | "internal___ignoreType" | "internal___mediaType" | "internal___owner" | "internal___type" | "resolve" | "name" | "version" | "pluginOptions___path" | "pluginOptions___pathCheck" | "nodeAPIs" | "ssrAPIs" | "pluginFilepath" | "packageJson___name" | "packageJson___description" | "packageJson___version" | "packageJson___main" | "packageJson___license" | "packageJson___dependencies" | "packageJson___dependencies___name" | "packageJson___dependencies___version" | "packageJson___devDependencies" | "packageJson___devDependencies___name" | "packageJson___devDependencies___version" | "packageJson___peerDependencies" | "packageJson___peerDependencies___name" | "packageJson___peerDependencies___version" | "packageJson___keywords";

declare type SitePluginConnection = {
  totalCount: number;
  edges: Array<SitePluginEdge>;
  nodes: Array<SitePlugin>;
  pageInfo: PageInfo;
  distinct: Array<string>;
  group: Array<SitePluginGroupConnection>;
}

declare type SitePluginEdge = {
  next: ?SitePlugin;
  node: SitePlugin;
  previous: ?SitePlugin;
}

declare type SitePluginGroupConnection = {
  totalCount: number;
  edges: Array<SitePluginEdge>;
  nodes: Array<SitePlugin>;
  pageInfo: PageInfo;
  field: string;
  fieldValue: ?string;
}

declare type SiteSiteMetadataFilterInput = {
  title: ?StringQueryOperatorInput;
  description: ?StringQueryOperatorInput;
  author: ?StringQueryOperatorInput;
  test: ?SiteSiteMetadataTestFilterInput;
}

declare type SiteSiteMetadataTestFilterInput = {
  name: ?StringQueryOperatorInput;
}

declare type IntQueryOperatorInput = {
  eq: ?number;
  ne: ?number;
  gt: ?number;
  gte: ?number;
  lt: ?number;
  lte: ?number;
  in: ?Array<number>;
  nin: ?Array<number>;
}

declare type DateQueryOperatorInput = {
  eq: ?any;
  ne: ?any;
  gt: ?any;
  gte: ?any;
  lt: ?any;
  lte: ?any;
  in: ?Array<any>;
  nin: ?Array<any>;
}

declare type Site = {
  id: string;
  parent: ?Node;
  children: Array<Node>;
  internal: Internal;
  siteMetadata: ?SiteSiteMetadata;
  port: ?number;
  host: ?string;
  pathPrefix: ?string;
  polyfill: ?boolean;
  buildTime: ?any;
}

declare type SiteSiteMetadata = {
  title: ?string;
  description: ?string;
  author: ?string;
  test: ?SiteSiteMetadataTest;
}

declare type SiteSiteMetadataTest = {
  name: ?string;
}

declare type SiteFilterInput = {
  id: ?StringQueryOperatorInput;
  parent: ?NodeFilterInput;
  children: ?NodeFilterListInput;
  internal: ?InternalFilterInput;
  siteMetadata: ?SiteSiteMetadataFilterInput;
  port: ?IntQueryOperatorInput;
  host: ?StringQueryOperatorInput;
  pathPrefix: ?StringQueryOperatorInput;
  polyfill: ?BooleanQueryOperatorInput;
  buildTime: ?DateQueryOperatorInput;
}

declare type SiteSortInput = {
  fields: ?Array<SiteFieldsEnum>;
  order: ?Array<SortOrderEnum>;
}

declare type SiteFieldsEnum = "id" | "parent___id" | "parent___parent___id" | "parent___parent___parent___id" | "parent___parent___parent___children" | "parent___parent___children" | "parent___parent___children___id" | "parent___parent___children___children" | "parent___parent___internal___content" | "parent___parent___internal___contentDigest" | "parent___parent___internal___description" | "parent___parent___internal___fieldOwners" | "parent___parent___internal___ignoreType" | "parent___parent___internal___mediaType" | "parent___parent___internal___owner" | "parent___parent___internal___type" | "parent___children" | "parent___children___id" | "parent___children___parent___id" | "parent___children___parent___children" | "parent___children___children" | "parent___children___children___id" | "parent___children___children___children" | "parent___children___internal___content" | "parent___children___internal___contentDigest" | "parent___children___internal___description" | "parent___children___internal___fieldOwners" | "parent___children___internal___ignoreType" | "parent___children___internal___mediaType" | "parent___children___internal___owner" | "parent___children___internal___type" | "parent___internal___content" | "parent___internal___contentDigest" | "parent___internal___description" | "parent___internal___fieldOwners" | "parent___internal___ignoreType" | "parent___internal___mediaType" | "parent___internal___owner" | "parent___internal___type" | "children" | "children___id" | "children___parent___id" | "children___parent___parent___id" | "children___parent___parent___children" | "children___parent___children" | "children___parent___children___id" | "children___parent___children___children" | "children___parent___internal___content" | "children___parent___internal___contentDigest" | "children___parent___internal___description" | "children___parent___internal___fieldOwners" | "children___parent___internal___ignoreType" | "children___parent___internal___mediaType" | "children___parent___internal___owner" | "children___parent___internal___type" | "children___children" | "children___children___id" | "children___children___parent___id" | "children___children___parent___children" | "children___children___children" | "children___children___children___id" | "children___children___children___children" | "children___children___internal___content" | "children___children___internal___contentDigest" | "children___children___internal___description" | "children___children___internal___fieldOwners" | "children___children___internal___ignoreType" | "children___children___internal___mediaType" | "children___children___internal___owner" | "children___children___internal___type" | "children___internal___content" | "children___internal___contentDigest" | "children___internal___description" | "children___internal___fieldOwners" | "children___internal___ignoreType" | "children___internal___mediaType" | "children___internal___owner" | "children___internal___type" | "internal___content" | "internal___contentDigest" | "internal___description" | "internal___fieldOwners" | "internal___ignoreType" | "internal___mediaType" | "internal___owner" | "internal___type" | "siteMetadata___title" | "siteMetadata___description" | "siteMetadata___author" | "siteMetadata___test___name" | "port" | "host" | "pathPrefix" | "polyfill" | "buildTime";

declare type SiteConnection = {
  totalCount: number;
  edges: Array<SiteEdge>;
  nodes: Array<Site>;
  pageInfo: PageInfo;
  distinct: Array<string>;
  group: Array<SiteGroupConnection>;
}

declare type SiteEdge = {
  next: ?Site;
  node: Site;
  previous: ?Site;
}

declare type SiteGroupConnection = {
  totalCount: number;
  edges: Array<SiteEdge>;
  nodes: Array<Site>;
  pageInfo: PageInfo;
  field: string;
  fieldValue: ?string;
}

declare type pagesAuthorsFilterListInput = {
  elemMatch: ?pagesAuthorsFilterInput;
}

declare type pagesAuthorsFilterInput = {
  urlKey: ?StringQueryOperatorInput;
  firstname: ?StringQueryOperatorInput;
  lastname: ?StringQueryOperatorInput;
  teaser: ?StringQueryOperatorInput;
  teaserPictureUrl: ?StringQueryOperatorInput;
  useExternalProfile: ?BooleanQueryOperatorInput;
  id: ?StringQueryOperatorInput;
}

declare type pages = {
  id: string;
  parent: ?Node;
  children: Array<Node>;
  internal: Internal;
  title: ?string;
  urlKey: ?string;
  disableLocaleFallback: ?boolean;
  metaDescription: ?string;
  story: ?string;
  useStory: ?boolean;
  authors: ?Array<pagesAuthors>;
  _id: ?string;
  contentType: ?string;
  createdAt: ?any;
  updatedAt: ?any;
  parentId: ?string;
  authorsUrlKeys: ?Array<string>;
  objectID: ?string;
  breadcrumbTitle: ?string;
  body: ?string;
  bodyOverflow: ?string;
  internalDescription: ?string;
  metaKeywords: ?string;
  excludeFromSitemap: ?boolean;
  metaRobotsNoindex: ?boolean;
}

declare type pagesAuthors = {
  urlKey: ?string;
  firstname: ?string;
  lastname: ?string;
  teaser: ?string;
  teaserPictureUrl: ?string;
  useExternalProfile: ?boolean;
  id: ?string;
}

declare type pagesFilterInput = {
  id: ?StringQueryOperatorInput;
  parent: ?NodeFilterInput;
  children: ?NodeFilterListInput;
  internal: ?InternalFilterInput;
  title: ?StringQueryOperatorInput;
  urlKey: ?StringQueryOperatorInput;
  disableLocaleFallback: ?BooleanQueryOperatorInput;
  metaDescription: ?StringQueryOperatorInput;
  story: ?StringQueryOperatorInput;
  useStory: ?BooleanQueryOperatorInput;
  authors: ?pagesAuthorsFilterListInput;
  _id: ?StringQueryOperatorInput;
  contentType: ?StringQueryOperatorInput;
  createdAt: ?DateQueryOperatorInput;
  updatedAt: ?DateQueryOperatorInput;
  parentId: ?StringQueryOperatorInput;
  authorsUrlKeys: ?StringQueryOperatorInput;
  objectID: ?StringQueryOperatorInput;
  breadcrumbTitle: ?StringQueryOperatorInput;
  body: ?StringQueryOperatorInput;
  bodyOverflow: ?StringQueryOperatorInput;
  internalDescription: ?StringQueryOperatorInput;
  metaKeywords: ?StringQueryOperatorInput;
  excludeFromSitemap: ?BooleanQueryOperatorInput;
  metaRobotsNoindex: ?BooleanQueryOperatorInput;
}

declare type pagesSortInput = {
  fields: ?Array<pagesFieldsEnum>;
  order: ?Array<SortOrderEnum>;
}

declare type pagesFieldsEnum = "id" | "parent___id" | "parent___parent___id" | "parent___parent___parent___id" | "parent___parent___parent___children" | "parent___parent___children" | "parent___parent___children___id" | "parent___parent___children___children" | "parent___parent___internal___content" | "parent___parent___internal___contentDigest" | "parent___parent___internal___description" | "parent___parent___internal___fieldOwners" | "parent___parent___internal___ignoreType" | "parent___parent___internal___mediaType" | "parent___parent___internal___owner" | "parent___parent___internal___type" | "parent___children" | "parent___children___id" | "parent___children___parent___id" | "parent___children___parent___children" | "parent___children___children" | "parent___children___children___id" | "parent___children___children___children" | "parent___children___internal___content" | "parent___children___internal___contentDigest" | "parent___children___internal___description" | "parent___children___internal___fieldOwners" | "parent___children___internal___ignoreType" | "parent___children___internal___mediaType" | "parent___children___internal___owner" | "parent___children___internal___type" | "parent___internal___content" | "parent___internal___contentDigest" | "parent___internal___description" | "parent___internal___fieldOwners" | "parent___internal___ignoreType" | "parent___internal___mediaType" | "parent___internal___owner" | "parent___internal___type" | "children" | "children___id" | "children___parent___id" | "children___parent___parent___id" | "children___parent___parent___children" | "children___parent___children" | "children___parent___children___id" | "children___parent___children___children" | "children___parent___internal___content" | "children___parent___internal___contentDigest" | "children___parent___internal___description" | "children___parent___internal___fieldOwners" | "children___parent___internal___ignoreType" | "children___parent___internal___mediaType" | "children___parent___internal___owner" | "children___parent___internal___type" | "children___children" | "children___children___id" | "children___children___parent___id" | "children___children___parent___children" | "children___children___children" | "children___children___children___id" | "children___children___children___children" | "children___children___internal___content" | "children___children___internal___contentDigest" | "children___children___internal___description" | "children___children___internal___fieldOwners" | "children___children___internal___ignoreType" | "children___children___internal___mediaType" | "children___children___internal___owner" | "children___children___internal___type" | "children___internal___content" | "children___internal___contentDigest" | "children___internal___description" | "children___internal___fieldOwners" | "children___internal___ignoreType" | "children___internal___mediaType" | "children___internal___owner" | "children___internal___type" | "internal___content" | "internal___contentDigest" | "internal___description" | "internal___fieldOwners" | "internal___ignoreType" | "internal___mediaType" | "internal___owner" | "internal___type" | "title" | "urlKey" | "disableLocaleFallback" | "metaDescription" | "story" | "useStory" | "authors" | "authors___urlKey" | "authors___firstname" | "authors___lastname" | "authors___teaser" | "authors___teaserPictureUrl" | "authors___useExternalProfile" | "authors___id" | "_id" | "contentType" | "createdAt" | "updatedAt" | "parentId" | "authorsUrlKeys" | "objectID" | "breadcrumbTitle" | "body" | "bodyOverflow" | "internalDescription" | "metaKeywords" | "excludeFromSitemap" | "metaRobotsNoindex";

declare type pagesConnection = {
  totalCount: number;
  edges: Array<pagesEdge>;
  nodes: Array<pages>;
  pageInfo: PageInfo;
  distinct: Array<string>;
  group: Array<pagesGroupConnection>;
}

declare type pagesEdge = {
  next: ?pages;
  node: pages;
  previous: ?pages;
}

declare type pagesGroupConnection = {
  totalCount: number;
  edges: Array<pagesEdge>;
  nodes: Array<pages>;
  pageInfo: PageInfo;
  field: string;
  fieldValue: ?string;
}

declare type navigationDropdownFilterListInput = {
  elemMatch: ?navigationDropdownFilterInput;
}

declare type navigationDropdownFilterInput = {
  id: ?StringQueryOperatorInput;
  label: ?StringQueryOperatorInput;
  link: ?StringQueryOperatorInput;
  lv0: ?StringQueryOperatorInput;
  lv1: ?StringQueryOperatorInput;
  weight: ?IntQueryOperatorInput;
  displayInMenu: ?BooleanQueryOperatorInput;
  children: ?navigationDropdownChildrenFilterListInput;
}

declare type navigationDropdownChildrenFilterListInput = {
  elemMatch: ?navigationDropdownChildrenFilterInput;
}

declare type navigationDropdownChildrenFilterInput = {
  id: ?StringQueryOperatorInput;
  label: ?StringQueryOperatorInput;
  link: ?StringQueryOperatorInput;
  lv0: ?StringQueryOperatorInput;
  lv1: ?StringQueryOperatorInput;
  lv2: ?StringQueryOperatorInput;
  weight: ?IntQueryOperatorInput;
  displayInMenu: ?BooleanQueryOperatorInput;
  parentId: ?StringQueryOperatorInput;
  children: ?navigationDropdownChildrenChildrenFilterListInput;
}

declare type navigationDropdownChildrenChildrenFilterListInput = {
  elemMatch: ?navigationDropdownChildrenChildrenFilterInput;
}

declare type navigationDropdownChildrenChildrenFilterInput = {
  id: ?StringQueryOperatorInput;
  label: ?StringQueryOperatorInput;
  link: ?StringQueryOperatorInput;
  lv0: ?StringQueryOperatorInput;
  lv1: ?StringQueryOperatorInput;
  lv2: ?StringQueryOperatorInput;
  lv3: ?StringQueryOperatorInput;
  displayInMenu: ?BooleanQueryOperatorInput;
  parentId: ?StringQueryOperatorInput;
}

declare type navigation = {
  id: string;
  parent: ?Node;
  children: Array<Node>;
  internal: Internal;
  label: ?string;
  link: ?string;
  dropdown: ?Array<navigationDropdown>;
}

declare type navigationDropdown = {
  id: ?string;
  label: ?string;
  link: ?string;
  lv0: ?string;
  lv1: ?string;
  weight: ?number;
  displayInMenu: ?boolean;
  children: ?Array<navigationDropdownChildren>;
}

declare type navigationDropdownChildren = {
  id: ?string;
  label: ?string;
  link: ?string;
  lv0: ?string;
  lv1: ?string;
  lv2: ?string;
  weight: ?number;
  displayInMenu: ?boolean;
  parentId: ?string;
  children: ?Array<navigationDropdownChildrenChildren>;
}

declare type navigationDropdownChildrenChildren = {
  id: ?string;
  label: ?string;
  link: ?string;
  lv0: ?string;
  lv1: ?string;
  lv2: ?string;
  lv3: ?string;
  displayInMenu: ?boolean;
  parentId: ?string;
}

declare type navigationFilterInput = {
  id: ?StringQueryOperatorInput;
  parent: ?NodeFilterInput;
  children: ?NodeFilterListInput;
  internal: ?InternalFilterInput;
  label: ?StringQueryOperatorInput;
  link: ?StringQueryOperatorInput;
  dropdown: ?navigationDropdownFilterListInput;
}

declare type navigationSortInput = {
  fields: ?Array<navigationFieldsEnum>;
  order: ?Array<SortOrderEnum>;
}

declare type navigationFieldsEnum = "id" | "parent___id" | "parent___parent___id" | "parent___parent___parent___id" | "parent___parent___parent___children" | "parent___parent___children" | "parent___parent___children___id" | "parent___parent___children___children" | "parent___parent___internal___content" | "parent___parent___internal___contentDigest" | "parent___parent___internal___description" | "parent___parent___internal___fieldOwners" | "parent___parent___internal___ignoreType" | "parent___parent___internal___mediaType" | "parent___parent___internal___owner" | "parent___parent___internal___type" | "parent___children" | "parent___children___id" | "parent___children___parent___id" | "parent___children___parent___children" | "parent___children___children" | "parent___children___children___id" | "parent___children___children___children" | "parent___children___internal___content" | "parent___children___internal___contentDigest" | "parent___children___internal___description" | "parent___children___internal___fieldOwners" | "parent___children___internal___ignoreType" | "parent___children___internal___mediaType" | "parent___children___internal___owner" | "parent___children___internal___type" | "parent___internal___content" | "parent___internal___contentDigest" | "parent___internal___description" | "parent___internal___fieldOwners" | "parent___internal___ignoreType" | "parent___internal___mediaType" | "parent___internal___owner" | "parent___internal___type" | "children" | "children___id" | "children___parent___id" | "children___parent___parent___id" | "children___parent___parent___children" | "children___parent___children" | "children___parent___children___id" | "children___parent___children___children" | "children___parent___internal___content" | "children___parent___internal___contentDigest" | "children___parent___internal___description" | "children___parent___internal___fieldOwners" | "children___parent___internal___ignoreType" | "children___parent___internal___mediaType" | "children___parent___internal___owner" | "children___parent___internal___type" | "children___children" | "children___children___id" | "children___children___parent___id" | "children___children___parent___children" | "children___children___children" | "children___children___children___id" | "children___children___children___children" | "children___children___internal___content" | "children___children___internal___contentDigest" | "children___children___internal___description" | "children___children___internal___fieldOwners" | "children___children___internal___ignoreType" | "children___children___internal___mediaType" | "children___children___internal___owner" | "children___children___internal___type" | "children___internal___content" | "children___internal___contentDigest" | "children___internal___description" | "children___internal___fieldOwners" | "children___internal___ignoreType" | "children___internal___mediaType" | "children___internal___owner" | "children___internal___type" | "internal___content" | "internal___contentDigest" | "internal___description" | "internal___fieldOwners" | "internal___ignoreType" | "internal___mediaType" | "internal___owner" | "internal___type" | "label" | "link" | "dropdown" | "dropdown___id" | "dropdown___label" | "dropdown___link" | "dropdown___lv0" | "dropdown___lv1" | "dropdown___weight" | "dropdown___displayInMenu" | "dropdown___children" | "dropdown___children___id" | "dropdown___children___label" | "dropdown___children___link" | "dropdown___children___lv0" | "dropdown___children___lv1" | "dropdown___children___lv2" | "dropdown___children___weight" | "dropdown___children___displayInMenu" | "dropdown___children___parentId" | "dropdown___children___children" | "dropdown___children___children___id" | "dropdown___children___children___label" | "dropdown___children___children___link" | "dropdown___children___children___lv0" | "dropdown___children___children___lv1" | "dropdown___children___children___lv2" | "dropdown___children___children___lv3" | "dropdown___children___children___displayInMenu" | "dropdown___children___children___parentId";

declare type navigationConnection = {
  totalCount: number;
  edges: Array<navigationEdge>;
  nodes: Array<navigation>;
  pageInfo: PageInfo;
  distinct: Array<string>;
  group: Array<navigationGroupConnection>;
}

declare type navigationEdge = {
  next: ?navigation;
  node: navigation;
  previous: ?navigation;
}

declare type navigationGroupConnection = {
  totalCount: number;
  edges: Array<navigationEdge>;
  nodes: Array<navigation>;
  pageInfo: PageInfo;
  field: string;
  fieldValue: ?string;
}

declare type categoryFilterInput = {
  id: ?StringQueryOperatorInput;
  parent: ?NodeFilterInput;
  children: ?NodeFilterListInput;
  internal: ?InternalFilterInput;
  name: ?StringQueryOperatorInput;
  internalDescription: ?StringQueryOperatorInput;
  seoTitle: ?StringQueryOperatorInput;
  metaDescription: ?StringQueryOperatorInput;
  metaRobotsNoindex: ?StringQueryOperatorInput;
  canonicalUrl: ?StringQueryOperatorInput;
  seoText1: ?StringQueryOperatorInput;
  seoText2: ?StringQueryOperatorInput;
  seoText3: ?StringQueryOperatorInput;
  categoryText1: ?StringQueryOperatorInput;
  hideProducts: ?BooleanQueryOperatorInput;
  story: ?StringQueryOperatorInput;
  useStory: ?BooleanQueryOperatorInput;
  womanmenunisex: ?StringQueryOperatorInput;
  assignedLevel1Category: ?StringQueryOperatorInput;
  xyx: ?StringQueryOperatorInput;
  categoryImageUrl: ?StringQueryOperatorInput;
  categoryImage: ?StringQueryOperatorInput;
  featuredInDropdownMenu: ?BooleanQueryOperatorInput;
  productSearchQueries: ?StringQueryOperatorInput;
  assignedLevel2Category: ?StringQueryOperatorInput;
  topCategory: ?StringQueryOperatorInput;
  categoryLevel: ?IntQueryOperatorInput;
  assignedLevel3Category: ?StringQueryOperatorInput;
  type: ?StringQueryOperatorInput;
  menuItems: ?StringQueryOperatorInput;
  title: ?StringQueryOperatorInput;
  url: ?StringQueryOperatorInput;
  dropdownContent: ?StringQueryOperatorInput;
  page: ?StringQueryOperatorInput;
  magazineArticle: ?StringQueryOperatorInput;
  magazineCategory: ?StringQueryOperatorInput;
  productCategoryL1: ?StringQueryOperatorInput;
  productCategoryL2: ?StringQueryOperatorInput;
  productCategoryL3: ?StringQueryOperatorInput;
  _id: ?StringQueryOperatorInput;
  contentType: ?StringQueryOperatorInput;
  createdAt: ?DateQueryOperatorInput;
  updatedAt: ?DateQueryOperatorInput;
  parentId: ?StringQueryOperatorInput;
  objectID: ?StringQueryOperatorInput;
  label: ?StringQueryOperatorInput;
  link: ?StringQueryOperatorInput;
  lv0: ?StringQueryOperatorInput;
  lv1: ?StringQueryOperatorInput;
  lv2: ?StringQueryOperatorInput;
  lv3: ?StringQueryOperatorInput;
  weight: ?IntQueryOperatorInput;
  displayInMenu: ?BooleanQueryOperatorInput;
  childIds: ?StringQueryOperatorInput;
  useEnhancedStory: ?BooleanQueryOperatorInput;
  parentCategory: ?categoryFilterInput;
  childCategories: ?categoryFilterListInput;
  productTags: ?StringQueryOperatorInput;
}

declare type categoryFilterListInput = {
  elemMatch: ?categoryFilterInput;
}

declare type category = {
  id: string;
  parent: ?Node;
  children: Array<Node>;
  internal: Internal;
  name: ?string;
  internalDescription: ?string;
  seoTitle: ?string;
  metaDescription: ?string;
  metaRobotsNoindex: ?string;
  canonicalUrl: ?string;
  seoText1: ?string;
  seoText2: ?string;
  seoText3: ?string;
  categoryText1: ?string;
  hideProducts: ?boolean;
  story: ?string;
  useStory: ?boolean;
  womanmenunisex: ?string;
  assignedLevel1Category: ?string;
  xyx: ?string;
  categoryImageUrl: ?string;
  categoryImage: ?string;
  featuredInDropdownMenu: ?boolean;
  productSearchQueries: ?string;
  assignedLevel2Category: ?string;
  topCategory: ?string;
  categoryLevel: ?number;
  assignedLevel3Category: ?string;
  type: ?string;
  menuItems: ?string;
  title: ?string;
  url: ?string;
  dropdownContent: ?string;
  page: ?string;
  magazineArticle: ?string;
  magazineCategory: ?string;
  productCategoryL1: ?string;
  productCategoryL2: ?string;
  productCategoryL3: ?string;
  _id: ?string;
  contentType: ?string;
  createdAt: ?any;
  updatedAt: ?any;
  parentId: ?string;
  objectID: ?string;
  label: ?string;
  link: ?string;
  lv0: ?string;
  lv1: ?string;
  lv2: ?string;
  lv3: ?string;
  weight: ?number;
  displayInMenu: ?boolean;
  childIds: ?Array<string>;
  useEnhancedStory: ?boolean;
  parentCategory: ?category;
  childCategories: ?Array<category>;
  productTags: ?string;
}

declare type categorySortInput = {
  fields: ?Array<categoryFieldsEnum>;
  order: ?Array<SortOrderEnum>;
}

declare type categoryFieldsEnum = "id" | "parent___id" | "parent___parent___id" | "parent___parent___parent___id" | "parent___parent___parent___children" | "parent___parent___children" | "parent___parent___children___id" | "parent___parent___children___children" | "parent___parent___internal___content" | "parent___parent___internal___contentDigest" | "parent___parent___internal___description" | "parent___parent___internal___fieldOwners" | "parent___parent___internal___ignoreType" | "parent___parent___internal___mediaType" | "parent___parent___internal___owner" | "parent___parent___internal___type" | "parent___children" | "parent___children___id" | "parent___children___parent___id" | "parent___children___parent___children" | "parent___children___children" | "parent___children___children___id" | "parent___children___children___children" | "parent___children___internal___content" | "parent___children___internal___contentDigest" | "parent___children___internal___description" | "parent___children___internal___fieldOwners" | "parent___children___internal___ignoreType" | "parent___children___internal___mediaType" | "parent___children___internal___owner" | "parent___children___internal___type" | "parent___internal___content" | "parent___internal___contentDigest" | "parent___internal___description" | "parent___internal___fieldOwners" | "parent___internal___ignoreType" | "parent___internal___mediaType" | "parent___internal___owner" | "parent___internal___type" | "children" | "children___id" | "children___parent___id" | "children___parent___parent___id" | "children___parent___parent___children" | "children___parent___children" | "children___parent___children___id" | "children___parent___children___children" | "children___parent___internal___content" | "children___parent___internal___contentDigest" | "children___parent___internal___description" | "children___parent___internal___fieldOwners" | "children___parent___internal___ignoreType" | "children___parent___internal___mediaType" | "children___parent___internal___owner" | "children___parent___internal___type" | "children___children" | "children___children___id" | "children___children___parent___id" | "children___children___parent___children" | "children___children___children" | "children___children___children___id" | "children___children___children___children" | "children___children___internal___content" | "children___children___internal___contentDigest" | "children___children___internal___description" | "children___children___internal___fieldOwners" | "children___children___internal___ignoreType" | "children___children___internal___mediaType" | "children___children___internal___owner" | "children___children___internal___type" | "children___internal___content" | "children___internal___contentDigest" | "children___internal___description" | "children___internal___fieldOwners" | "children___internal___ignoreType" | "children___internal___mediaType" | "children___internal___owner" | "children___internal___type" | "internal___content" | "internal___contentDigest" | "internal___description" | "internal___fieldOwners" | "internal___ignoreType" | "internal___mediaType" | "internal___owner" | "internal___type" | "name" | "internalDescription" | "seoTitle" | "metaDescription" | "metaRobotsNoindex" | "canonicalUrl" | "seoText1" | "seoText2" | "seoText3" | "categoryText1" | "hideProducts" | "story" | "useStory" | "womanmenunisex" | "assignedLevel1Category" | "xyx" | "categoryImageUrl" | "categoryImage" | "featuredInDropdownMenu" | "productSearchQueries" | "assignedLevel2Category" | "topCategory" | "categoryLevel" | "assignedLevel3Category" | "type" | "menuItems" | "title" | "url" | "dropdownContent" | "page" | "magazineArticle" | "magazineCategory" | "productCategoryL1" | "productCategoryL2" | "productCategoryL3" | "_id" | "contentType" | "createdAt" | "updatedAt" | "parentId" | "objectID" | "label" | "link" | "lv0" | "lv1" | "lv2" | "lv3" | "weight" | "displayInMenu" | "childIds" | "useEnhancedStory" | "parentCategory___id" | "parentCategory___parent___id" | "parentCategory___parent___parent___id" | "parentCategory___parent___parent___children" | "parentCategory___parent___children" | "parentCategory___parent___children___id" | "parentCategory___parent___children___children" | "parentCategory___parent___internal___content" | "parentCategory___parent___internal___contentDigest" | "parentCategory___parent___internal___description" | "parentCategory___parent___internal___fieldOwners" | "parentCategory___parent___internal___ignoreType" | "parentCategory___parent___internal___mediaType" | "parentCategory___parent___internal___owner" | "parentCategory___parent___internal___type" | "parentCategory___children" | "parentCategory___children___id" | "parentCategory___children___parent___id" | "parentCategory___children___parent___children" | "parentCategory___children___children" | "parentCategory___children___children___id" | "parentCategory___children___children___children" | "parentCategory___children___internal___content" | "parentCategory___children___internal___contentDigest" | "parentCategory___children___internal___description" | "parentCategory___children___internal___fieldOwners" | "parentCategory___children___internal___ignoreType" | "parentCategory___children___internal___mediaType" | "parentCategory___children___internal___owner" | "parentCategory___children___internal___type" | "parentCategory___internal___content" | "parentCategory___internal___contentDigest" | "parentCategory___internal___description" | "parentCategory___internal___fieldOwners" | "parentCategory___internal___ignoreType" | "parentCategory___internal___mediaType" | "parentCategory___internal___owner" | "parentCategory___internal___type" | "parentCategory___name" | "parentCategory___internalDescription" | "parentCategory___seoTitle" | "parentCategory___metaDescription" | "parentCategory___metaRobotsNoindex" | "parentCategory___canonicalUrl" | "parentCategory___seoText1" | "parentCategory___seoText2" | "parentCategory___seoText3" | "parentCategory___categoryText1" | "parentCategory___hideProducts" | "parentCategory___story" | "parentCategory___useStory" | "parentCategory___womanmenunisex" | "parentCategory___assignedLevel1Category" | "parentCategory___xyx" | "parentCategory___categoryImageUrl" | "parentCategory___categoryImage" | "parentCategory___featuredInDropdownMenu" | "parentCategory___productSearchQueries" | "parentCategory___assignedLevel2Category" | "parentCategory___topCategory" | "parentCategory___categoryLevel" | "parentCategory___assignedLevel3Category" | "parentCategory___type" | "parentCategory___menuItems" | "parentCategory___title" | "parentCategory___url" | "parentCategory___dropdownContent" | "parentCategory___page" | "parentCategory___magazineArticle" | "parentCategory___magazineCategory" | "parentCategory___productCategoryL1" | "parentCategory___productCategoryL2" | "parentCategory___productCategoryL3" | "parentCategory____id" | "parentCategory___contentType" | "parentCategory___createdAt" | "parentCategory___updatedAt" | "parentCategory___parentId" | "parentCategory___objectID" | "parentCategory___label" | "parentCategory___link" | "parentCategory___lv0" | "parentCategory___lv1" | "parentCategory___lv2" | "parentCategory___lv3" | "parentCategory___weight" | "parentCategory___displayInMenu" | "parentCategory___childIds" | "parentCategory___useEnhancedStory" | "parentCategory___parentCategory___id" | "parentCategory___parentCategory___parent___id" | "parentCategory___parentCategory___parent___children" | "parentCategory___parentCategory___children" | "parentCategory___parentCategory___children___id" | "parentCategory___parentCategory___children___children" | "parentCategory___parentCategory___internal___content" | "parentCategory___parentCategory___internal___contentDigest" | "parentCategory___parentCategory___internal___description" | "parentCategory___parentCategory___internal___fieldOwners" | "parentCategory___parentCategory___internal___ignoreType" | "parentCategory___parentCategory___internal___mediaType" | "parentCategory___parentCategory___internal___owner" | "parentCategory___parentCategory___internal___type" | "parentCategory___parentCategory___name" | "parentCategory___parentCategory___internalDescription" | "parentCategory___parentCategory___seoTitle" | "parentCategory___parentCategory___metaDescription" | "parentCategory___parentCategory___metaRobotsNoindex" | "parentCategory___parentCategory___canonicalUrl" | "parentCategory___parentCategory___seoText1" | "parentCategory___parentCategory___seoText2" | "parentCategory___parentCategory___seoText3" | "parentCategory___parentCategory___categoryText1" | "parentCategory___parentCategory___hideProducts" | "parentCategory___parentCategory___story" | "parentCategory___parentCategory___useStory" | "parentCategory___parentCategory___womanmenunisex" | "parentCategory___parentCategory___assignedLevel1Category" | "parentCategory___parentCategory___xyx" | "parentCategory___parentCategory___categoryImageUrl" | "parentCategory___parentCategory___categoryImage" | "parentCategory___parentCategory___featuredInDropdownMenu" | "parentCategory___parentCategory___productSearchQueries" | "parentCategory___parentCategory___assignedLevel2Category" | "parentCategory___parentCategory___topCategory" | "parentCategory___parentCategory___categoryLevel" | "parentCategory___parentCategory___assignedLevel3Category" | "parentCategory___parentCategory___type" | "parentCategory___parentCategory___menuItems" | "parentCategory___parentCategory___title" | "parentCategory___parentCategory___url" | "parentCategory___parentCategory___dropdownContent" | "parentCategory___parentCategory___page" | "parentCategory___parentCategory___magazineArticle" | "parentCategory___parentCategory___magazineCategory" | "parentCategory___parentCategory___productCategoryL1" | "parentCategory___parentCategory___productCategoryL2" | "parentCategory___parentCategory___productCategoryL3" | "parentCategory___parentCategory____id" | "parentCategory___parentCategory___contentType" | "parentCategory___parentCategory___createdAt" | "parentCategory___parentCategory___updatedAt" | "parentCategory___parentCategory___parentId" | "parentCategory___parentCategory___objectID" | "parentCategory___parentCategory___label" | "parentCategory___parentCategory___link" | "parentCategory___parentCategory___lv0" | "parentCategory___parentCategory___lv1" | "parentCategory___parentCategory___lv2" | "parentCategory___parentCategory___lv3" | "parentCategory___parentCategory___weight" | "parentCategory___parentCategory___displayInMenu" | "parentCategory___parentCategory___childIds" | "parentCategory___parentCategory___useEnhancedStory" | "parentCategory___parentCategory___parentCategory___id" | "parentCategory___parentCategory___parentCategory___children" | "parentCategory___parentCategory___parentCategory___name" | "parentCategory___parentCategory___parentCategory___internalDescription" | "parentCategory___parentCategory___parentCategory___seoTitle" | "parentCategory___parentCategory___parentCategory___metaDescription" | "parentCategory___parentCategory___parentCategory___metaRobotsNoindex" | "parentCategory___parentCategory___parentCategory___canonicalUrl" | "parentCategory___parentCategory___parentCategory___seoText1" | "parentCategory___parentCategory___parentCategory___seoText2" | "parentCategory___parentCategory___parentCategory___seoText3" | "parentCategory___parentCategory___parentCategory___categoryText1" | "parentCategory___parentCategory___parentCategory___hideProducts" | "parentCategory___parentCategory___parentCategory___story" | "parentCategory___parentCategory___parentCategory___useStory" | "parentCategory___parentCategory___parentCategory___womanmenunisex" | "parentCategory___parentCategory___parentCategory___assignedLevel1Category" | "parentCategory___parentCategory___parentCategory___xyx" | "parentCategory___parentCategory___parentCategory___categoryImageUrl" | "parentCategory___parentCategory___parentCategory___categoryImage" | "parentCategory___parentCategory___parentCategory___featuredInDropdownMenu" | "parentCategory___parentCategory___parentCategory___productSearchQueries" | "parentCategory___parentCategory___parentCategory___assignedLevel2Category" | "parentCategory___parentCategory___parentCategory___topCategory" | "parentCategory___parentCategory___parentCategory___categoryLevel" | "parentCategory___parentCategory___parentCategory___assignedLevel3Category" | "parentCategory___parentCategory___parentCategory___type" | "parentCategory___parentCategory___parentCategory___menuItems" | "parentCategory___parentCategory___parentCategory___title" | "parentCategory___parentCategory___parentCategory___url" | "parentCategory___parentCategory___parentCategory___dropdownContent" | "parentCategory___parentCategory___parentCategory___page" | "parentCategory___parentCategory___parentCategory___magazineArticle" | "parentCategory___parentCategory___parentCategory___magazineCategory" | "parentCategory___parentCategory___parentCategory___productCategoryL1" | "parentCategory___parentCategory___parentCategory___productCategoryL2" | "parentCategory___parentCategory___parentCategory___productCategoryL3" | "parentCategory___parentCategory___parentCategory____id" | "parentCategory___parentCategory___parentCategory___contentType" | "parentCategory___parentCategory___parentCategory___createdAt" | "parentCategory___parentCategory___parentCategory___updatedAt" | "parentCategory___parentCategory___parentCategory___parentId" | "parentCategory___parentCategory___parentCategory___objectID" | "parentCategory___parentCategory___parentCategory___label" | "parentCategory___parentCategory___parentCategory___link" | "parentCategory___parentCategory___parentCategory___lv0" | "parentCategory___parentCategory___parentCategory___lv1" | "parentCategory___parentCategory___parentCategory___lv2" | "parentCategory___parentCategory___parentCategory___lv3" | "parentCategory___parentCategory___parentCategory___weight" | "parentCategory___parentCategory___parentCategory___displayInMenu" | "parentCategory___parentCategory___parentCategory___childIds" | "parentCategory___parentCategory___parentCategory___useEnhancedStory" | "parentCategory___parentCategory___parentCategory___childCategories" | "parentCategory___parentCategory___parentCategory___productTags" | "parentCategory___parentCategory___childCategories" | "parentCategory___parentCategory___childCategories___id" | "parentCategory___parentCategory___childCategories___children" | "parentCategory___parentCategory___childCategories___name" | "parentCategory___parentCategory___childCategories___internalDescription" | "parentCategory___parentCategory___childCategories___seoTitle" | "parentCategory___parentCategory___childCategories___metaDescription" | "parentCategory___parentCategory___childCategories___metaRobotsNoindex" | "parentCategory___parentCategory___childCategories___canonicalUrl" | "parentCategory___parentCategory___childCategories___seoText1" | "parentCategory___parentCategory___childCategories___seoText2" | "parentCategory___parentCategory___childCategories___seoText3" | "parentCategory___parentCategory___childCategories___categoryText1" | "parentCategory___parentCategory___childCategories___hideProducts" | "parentCategory___parentCategory___childCategories___story" | "parentCategory___parentCategory___childCategories___useStory" | "parentCategory___parentCategory___childCategories___womanmenunisex" | "parentCategory___parentCategory___childCategories___assignedLevel1Category" | "parentCategory___parentCategory___childCategories___xyx" | "parentCategory___parentCategory___childCategories___categoryImageUrl" | "parentCategory___parentCategory___childCategories___categoryImage" | "parentCategory___parentCategory___childCategories___featuredInDropdownMenu" | "parentCategory___parentCategory___childCategories___productSearchQueries" | "parentCategory___parentCategory___childCategories___assignedLevel2Category" | "parentCategory___parentCategory___childCategories___topCategory" | "parentCategory___parentCategory___childCategories___categoryLevel" | "parentCategory___parentCategory___childCategories___assignedLevel3Category" | "parentCategory___parentCategory___childCategories___type" | "parentCategory___parentCategory___childCategories___menuItems" | "parentCategory___parentCategory___childCategories___title" | "parentCategory___parentCategory___childCategories___url" | "parentCategory___parentCategory___childCategories___dropdownContent" | "parentCategory___parentCategory___childCategories___page" | "parentCategory___parentCategory___childCategories___magazineArticle" | "parentCategory___parentCategory___childCategories___magazineCategory" | "parentCategory___parentCategory___childCategories___productCategoryL1" | "parentCategory___parentCategory___childCategories___productCategoryL2" | "parentCategory___parentCategory___childCategories___productCategoryL3" | "parentCategory___parentCategory___childCategories____id" | "parentCategory___parentCategory___childCategories___contentType" | "parentCategory___parentCategory___childCategories___createdAt" | "parentCategory___parentCategory___childCategories___updatedAt" | "parentCategory___parentCategory___childCategories___parentId" | "parentCategory___parentCategory___childCategories___objectID" | "parentCategory___parentCategory___childCategories___label" | "parentCategory___parentCategory___childCategories___link" | "parentCategory___parentCategory___childCategories___lv0" | "parentCategory___parentCategory___childCategories___lv1" | "parentCategory___parentCategory___childCategories___lv2" | "parentCategory___parentCategory___childCategories___lv3" | "parentCategory___parentCategory___childCategories___weight" | "parentCategory___parentCategory___childCategories___displayInMenu" | "parentCategory___parentCategory___childCategories___childIds" | "parentCategory___parentCategory___childCategories___useEnhancedStory" | "parentCategory___parentCategory___childCategories___childCategories" | "parentCategory___parentCategory___childCategories___productTags" | "parentCategory___parentCategory___productTags" | "parentCategory___childCategories" | "parentCategory___childCategories___id" | "parentCategory___childCategories___parent___id" | "parentCategory___childCategories___parent___children" | "parentCategory___childCategories___children" | "parentCategory___childCategories___children___id" | "parentCategory___childCategories___children___children" | "parentCategory___childCategories___internal___content" | "parentCategory___childCategories___internal___contentDigest" | "parentCategory___childCategories___internal___description" | "parentCategory___childCategories___internal___fieldOwners" | "parentCategory___childCategories___internal___ignoreType" | "parentCategory___childCategories___internal___mediaType" | "parentCategory___childCategories___internal___owner" | "parentCategory___childCategories___internal___type" | "parentCategory___childCategories___name" | "parentCategory___childCategories___internalDescription" | "parentCategory___childCategories___seoTitle" | "parentCategory___childCategories___metaDescription" | "parentCategory___childCategories___metaRobotsNoindex" | "parentCategory___childCategories___canonicalUrl" | "parentCategory___childCategories___seoText1" | "parentCategory___childCategories___seoText2" | "parentCategory___childCategories___seoText3" | "parentCategory___childCategories___categoryText1" | "parentCategory___childCategories___hideProducts" | "parentCategory___childCategories___story" | "parentCategory___childCategories___useStory" | "parentCategory___childCategories___womanmenunisex" | "parentCategory___childCategories___assignedLevel1Category" | "parentCategory___childCategories___xyx" | "parentCategory___childCategories___categoryImageUrl" | "parentCategory___childCategories___categoryImage" | "parentCategory___childCategories___featuredInDropdownMenu" | "parentCategory___childCategories___productSearchQueries" | "parentCategory___childCategories___assignedLevel2Category" | "parentCategory___childCategories___topCategory" | "parentCategory___childCategories___categoryLevel" | "parentCategory___childCategories___assignedLevel3Category" | "parentCategory___childCategories___type" | "parentCategory___childCategories___menuItems" | "parentCategory___childCategories___title" | "parentCategory___childCategories___url" | "parentCategory___childCategories___dropdownContent" | "parentCategory___childCategories___page" | "parentCategory___childCategories___magazineArticle" | "parentCategory___childCategories___magazineCategory" | "parentCategory___childCategories___productCategoryL1" | "parentCategory___childCategories___productCategoryL2" | "parentCategory___childCategories___productCategoryL3" | "parentCategory___childCategories____id" | "parentCategory___childCategories___contentType" | "parentCategory___childCategories___createdAt" | "parentCategory___childCategories___updatedAt" | "parentCategory___childCategories___parentId" | "parentCategory___childCategories___objectID" | "parentCategory___childCategories___label" | "parentCategory___childCategories___link" | "parentCategory___childCategories___lv0" | "parentCategory___childCategories___lv1" | "parentCategory___childCategories___lv2" | "parentCategory___childCategories___lv3" | "parentCategory___childCategories___weight" | "parentCategory___childCategories___displayInMenu" | "parentCategory___childCategories___childIds" | "parentCategory___childCategories___useEnhancedStory" | "parentCategory___childCategories___parentCategory___id" | "parentCategory___childCategories___parentCategory___children" | "parentCategory___childCategories___parentCategory___name" | "parentCategory___childCategories___parentCategory___internalDescription" | "parentCategory___childCategories___parentCategory___seoTitle" | "parentCategory___childCategories___parentCategory___metaDescription" | "parentCategory___childCategories___parentCategory___metaRobotsNoindex" | "parentCategory___childCategories___parentCategory___canonicalUrl" | "parentCategory___childCategories___parentCategory___seoText1" | "parentCategory___childCategories___parentCategory___seoText2" | "parentCategory___childCategories___parentCategory___seoText3" | "parentCategory___childCategories___parentCategory___categoryText1" | "parentCategory___childCategories___parentCategory___hideProducts" | "parentCategory___childCategories___parentCategory___story" | "parentCategory___childCategories___parentCategory___useStory" | "parentCategory___childCategories___parentCategory___womanmenunisex" | "parentCategory___childCategories___parentCategory___assignedLevel1Category" | "parentCategory___childCategories___parentCategory___xyx" | "parentCategory___childCategories___parentCategory___categoryImageUrl" | "parentCategory___childCategories___parentCategory___categoryImage" | "parentCategory___childCategories___parentCategory___featuredInDropdownMenu" | "parentCategory___childCategories___parentCategory___productSearchQueries" | "parentCategory___childCategories___parentCategory___assignedLevel2Category" | "parentCategory___childCategories___parentCategory___topCategory" | "parentCategory___childCategories___parentCategory___categoryLevel" | "parentCategory___childCategories___parentCategory___assignedLevel3Category" | "parentCategory___childCategories___parentCategory___type" | "parentCategory___childCategories___parentCategory___menuItems" | "parentCategory___childCategories___parentCategory___title" | "parentCategory___childCategories___parentCategory___url" | "parentCategory___childCategories___parentCategory___dropdownContent" | "parentCategory___childCategories___parentCategory___page" | "parentCategory___childCategories___parentCategory___magazineArticle" | "parentCategory___childCategories___parentCategory___magazineCategory" | "parentCategory___childCategories___parentCategory___productCategoryL1" | "parentCategory___childCategories___parentCategory___productCategoryL2" | "parentCategory___childCategories___parentCategory___productCategoryL3" | "parentCategory___childCategories___parentCategory____id" | "parentCategory___childCategories___parentCategory___contentType" | "parentCategory___childCategories___parentCategory___createdAt" | "parentCategory___childCategories___parentCategory___updatedAt" | "parentCategory___childCategories___parentCategory___parentId" | "parentCategory___childCategories___parentCategory___objectID" | "parentCategory___childCategories___parentCategory___label" | "parentCategory___childCategories___parentCategory___link" | "parentCategory___childCategories___parentCategory___lv0" | "parentCategory___childCategories___parentCategory___lv1" | "parentCategory___childCategories___parentCategory___lv2" | "parentCategory___childCategories___parentCategory___lv3" | "parentCategory___childCategories___parentCategory___weight" | "parentCategory___childCategories___parentCategory___displayInMenu" | "parentCategory___childCategories___parentCategory___childIds" | "parentCategory___childCategories___parentCategory___useEnhancedStory" | "parentCategory___childCategories___parentCategory___childCategories" | "parentCategory___childCategories___parentCategory___productTags" | "parentCategory___childCategories___childCategories" | "parentCategory___childCategories___childCategories___id" | "parentCategory___childCategories___childCategories___children" | "parentCategory___childCategories___childCategories___name" | "parentCategory___childCategories___childCategories___internalDescription" | "parentCategory___childCategories___childCategories___seoTitle" | "parentCategory___childCategories___childCategories___metaDescription" | "parentCategory___childCategories___childCategories___metaRobotsNoindex" | "parentCategory___childCategories___childCategories___canonicalUrl" | "parentCategory___childCategories___childCategories___seoText1" | "parentCategory___childCategories___childCategories___seoText2" | "parentCategory___childCategories___childCategories___seoText3" | "parentCategory___childCategories___childCategories___categoryText1" | "parentCategory___childCategories___childCategories___hideProducts" | "parentCategory___childCategories___childCategories___story" | "parentCategory___childCategories___childCategories___useStory" | "parentCategory___childCategories___childCategories___womanmenunisex" | "parentCategory___childCategories___childCategories___assignedLevel1Category" | "parentCategory___childCategories___childCategories___xyx" | "parentCategory___childCategories___childCategories___categoryImageUrl" | "parentCategory___childCategories___childCategories___categoryImage" | "parentCategory___childCategories___childCategories___featuredInDropdownMenu" | "parentCategory___childCategories___childCategories___productSearchQueries" | "parentCategory___childCategories___childCategories___assignedLevel2Category" | "parentCategory___childCategories___childCategories___topCategory" | "parentCategory___childCategories___childCategories___categoryLevel" | "parentCategory___childCategories___childCategories___assignedLevel3Category" | "parentCategory___childCategories___childCategories___type" | "parentCategory___childCategories___childCategories___menuItems" | "parentCategory___childCategories___childCategories___title" | "parentCategory___childCategories___childCategories___url" | "parentCategory___childCategories___childCategories___dropdownContent" | "parentCategory___childCategories___childCategories___page" | "parentCategory___childCategories___childCategories___magazineArticle" | "parentCategory___childCategories___childCategories___magazineCategory" | "parentCategory___childCategories___childCategories___productCategoryL1" | "parentCategory___childCategories___childCategories___productCategoryL2" | "parentCategory___childCategories___childCategories___productCategoryL3" | "parentCategory___childCategories___childCategories____id" | "parentCategory___childCategories___childCategories___contentType" | "parentCategory___childCategories___childCategories___createdAt" | "parentCategory___childCategories___childCategories___updatedAt" | "parentCategory___childCategories___childCategories___parentId" | "parentCategory___childCategories___childCategories___objectID" | "parentCategory___childCategories___childCategories___label" | "parentCategory___childCategories___childCategories___link" | "parentCategory___childCategories___childCategories___lv0" | "parentCategory___childCategories___childCategories___lv1" | "parentCategory___childCategories___childCategories___lv2" | "parentCategory___childCategories___childCategories___lv3" | "parentCategory___childCategories___childCategories___weight" | "parentCategory___childCategories___childCategories___displayInMenu" | "parentCategory___childCategories___childCategories___childIds" | "parentCategory___childCategories___childCategories___useEnhancedStory" | "parentCategory___childCategories___childCategories___childCategories" | "parentCategory___childCategories___childCategories___productTags" | "parentCategory___childCategories___productTags" | "parentCategory___productTags" | "childCategories" | "childCategories___id" | "childCategories___parent___id" | "childCategories___parent___parent___id" | "childCategories___parent___parent___children" | "childCategories___parent___children" | "childCategories___parent___children___id" | "childCategories___parent___children___children" | "childCategories___parent___internal___content" | "childCategories___parent___internal___contentDigest" | "childCategories___parent___internal___description" | "childCategories___parent___internal___fieldOwners" | "childCategories___parent___internal___ignoreType" | "childCategories___parent___internal___mediaType" | "childCategories___parent___internal___owner" | "childCategories___parent___internal___type" | "childCategories___children" | "childCategories___children___id" | "childCategories___children___parent___id" | "childCategories___children___parent___children" | "childCategories___children___children" | "childCategories___children___children___id" | "childCategories___children___children___children" | "childCategories___children___internal___content" | "childCategories___children___internal___contentDigest" | "childCategories___children___internal___description" | "childCategories___children___internal___fieldOwners" | "childCategories___children___internal___ignoreType" | "childCategories___children___internal___mediaType" | "childCategories___children___internal___owner" | "childCategories___children___internal___type" | "childCategories___internal___content" | "childCategories___internal___contentDigest" | "childCategories___internal___description" | "childCategories___internal___fieldOwners" | "childCategories___internal___ignoreType" | "childCategories___internal___mediaType" | "childCategories___internal___owner" | "childCategories___internal___type" | "childCategories___name" | "childCategories___internalDescription" | "childCategories___seoTitle" | "childCategories___metaDescription" | "childCategories___metaRobotsNoindex" | "childCategories___canonicalUrl" | "childCategories___seoText1" | "childCategories___seoText2" | "childCategories___seoText3" | "childCategories___categoryText1" | "childCategories___hideProducts" | "childCategories___story" | "childCategories___useStory" | "childCategories___womanmenunisex" | "childCategories___assignedLevel1Category" | "childCategories___xyx" | "childCategories___categoryImageUrl" | "childCategories___categoryImage" | "childCategories___featuredInDropdownMenu" | "childCategories___productSearchQueries" | "childCategories___assignedLevel2Category" | "childCategories___topCategory" | "childCategories___categoryLevel" | "childCategories___assignedLevel3Category" | "childCategories___type" | "childCategories___menuItems" | "childCategories___title" | "childCategories___url" | "childCategories___dropdownContent" | "childCategories___page" | "childCategories___magazineArticle" | "childCategories___magazineCategory" | "childCategories___productCategoryL1" | "childCategories___productCategoryL2" | "childCategories___productCategoryL3" | "childCategories____id" | "childCategories___contentType" | "childCategories___createdAt" | "childCategories___updatedAt" | "childCategories___parentId" | "childCategories___objectID" | "childCategories___label" | "childCategories___link" | "childCategories___lv0" | "childCategories___lv1" | "childCategories___lv2" | "childCategories___lv3" | "childCategories___weight" | "childCategories___displayInMenu" | "childCategories___childIds" | "childCategories___useEnhancedStory" | "childCategories___parentCategory___id" | "childCategories___parentCategory___parent___id" | "childCategories___parentCategory___parent___children" | "childCategories___parentCategory___children" | "childCategories___parentCategory___children___id" | "childCategories___parentCategory___children___children" | "childCategories___parentCategory___internal___content" | "childCategories___parentCategory___internal___contentDigest" | "childCategories___parentCategory___internal___description" | "childCategories___parentCategory___internal___fieldOwners" | "childCategories___parentCategory___internal___ignoreType" | "childCategories___parentCategory___internal___mediaType" | "childCategories___parentCategory___internal___owner" | "childCategories___parentCategory___internal___type" | "childCategories___parentCategory___name" | "childCategories___parentCategory___internalDescription" | "childCategories___parentCategory___seoTitle" | "childCategories___parentCategory___metaDescription" | "childCategories___parentCategory___metaRobotsNoindex" | "childCategories___parentCategory___canonicalUrl" | "childCategories___parentCategory___seoText1" | "childCategories___parentCategory___seoText2" | "childCategories___parentCategory___seoText3" | "childCategories___parentCategory___categoryText1" | "childCategories___parentCategory___hideProducts" | "childCategories___parentCategory___story" | "childCategories___parentCategory___useStory" | "childCategories___parentCategory___womanmenunisex" | "childCategories___parentCategory___assignedLevel1Category" | "childCategories___parentCategory___xyx" | "childCategories___parentCategory___categoryImageUrl" | "childCategories___parentCategory___categoryImage" | "childCategories___parentCategory___featuredInDropdownMenu" | "childCategories___parentCategory___productSearchQueries" | "childCategories___parentCategory___assignedLevel2Category" | "childCategories___parentCategory___topCategory" | "childCategories___parentCategory___categoryLevel" | "childCategories___parentCategory___assignedLevel3Category" | "childCategories___parentCategory___type" | "childCategories___parentCategory___menuItems" | "childCategories___parentCategory___title" | "childCategories___parentCategory___url" | "childCategories___parentCategory___dropdownContent" | "childCategories___parentCategory___page" | "childCategories___parentCategory___magazineArticle" | "childCategories___parentCategory___magazineCategory" | "childCategories___parentCategory___productCategoryL1" | "childCategories___parentCategory___productCategoryL2" | "childCategories___parentCategory___productCategoryL3" | "childCategories___parentCategory____id" | "childCategories___parentCategory___contentType" | "childCategories___parentCategory___createdAt" | "childCategories___parentCategory___updatedAt" | "childCategories___parentCategory___parentId" | "childCategories___parentCategory___objectID" | "childCategories___parentCategory___label" | "childCategories___parentCategory___link" | "childCategories___parentCategory___lv0" | "childCategories___parentCategory___lv1" | "childCategories___parentCategory___lv2" | "childCategories___parentCategory___lv3" | "childCategories___parentCategory___weight" | "childCategories___parentCategory___displayInMenu" | "childCategories___parentCategory___childIds" | "childCategories___parentCategory___useEnhancedStory" | "childCategories___parentCategory___parentCategory___id" | "childCategories___parentCategory___parentCategory___children" | "childCategories___parentCategory___parentCategory___name" | "childCategories___parentCategory___parentCategory___internalDescription" | "childCategories___parentCategory___parentCategory___seoTitle" | "childCategories___parentCategory___parentCategory___metaDescription" | "childCategories___parentCategory___parentCategory___metaRobotsNoindex" | "childCategories___parentCategory___parentCategory___canonicalUrl" | "childCategories___parentCategory___parentCategory___seoText1" | "childCategories___parentCategory___parentCategory___seoText2" | "childCategories___parentCategory___parentCategory___seoText3" | "childCategories___parentCategory___parentCategory___categoryText1" | "childCategories___parentCategory___parentCategory___hideProducts" | "childCategories___parentCategory___parentCategory___story" | "childCategories___parentCategory___parentCategory___useStory" | "childCategories___parentCategory___parentCategory___womanmenunisex" | "childCategories___parentCategory___parentCategory___assignedLevel1Category" | "childCategories___parentCategory___parentCategory___xyx" | "childCategories___parentCategory___parentCategory___categoryImageUrl" | "childCategories___parentCategory___parentCategory___categoryImage" | "childCategories___parentCategory___parentCategory___featuredInDropdownMenu" | "childCategories___parentCategory___parentCategory___productSearchQueries" | "childCategories___parentCategory___parentCategory___assignedLevel2Category" | "childCategories___parentCategory___parentCategory___topCategory" | "childCategories___parentCategory___parentCategory___categoryLevel" | "childCategories___parentCategory___parentCategory___assignedLevel3Category" | "childCategories___parentCategory___parentCategory___type" | "childCategories___parentCategory___parentCategory___menuItems" | "childCategories___parentCategory___parentCategory___title" | "childCategories___parentCategory___parentCategory___url" | "childCategories___parentCategory___parentCategory___dropdownContent" | "childCategories___parentCategory___parentCategory___page" | "childCategories___parentCategory___parentCategory___magazineArticle" | "childCategories___parentCategory___parentCategory___magazineCategory" | "childCategories___parentCategory___parentCategory___productCategoryL1" | "childCategories___parentCategory___parentCategory___productCategoryL2" | "childCategories___parentCategory___parentCategory___productCategoryL3" | "childCategories___parentCategory___parentCategory____id" | "childCategories___parentCategory___parentCategory___contentType" | "childCategories___parentCategory___parentCategory___createdAt" | "childCategories___parentCategory___parentCategory___updatedAt" | "childCategories___parentCategory___parentCategory___parentId" | "childCategories___parentCategory___parentCategory___objectID" | "childCategories___parentCategory___parentCategory___label" | "childCategories___parentCategory___parentCategory___link" | "childCategories___parentCategory___parentCategory___lv0" | "childCategories___parentCategory___parentCategory___lv1" | "childCategories___parentCategory___parentCategory___lv2" | "childCategories___parentCategory___parentCategory___lv3" | "childCategories___parentCategory___parentCategory___weight" | "childCategories___parentCategory___parentCategory___displayInMenu" | "childCategories___parentCategory___parentCategory___childIds" | "childCategories___parentCategory___parentCategory___useEnhancedStory" | "childCategories___parentCategory___parentCategory___childCategories" | "childCategories___parentCategory___parentCategory___productTags" | "childCategories___parentCategory___childCategories" | "childCategories___parentCategory___childCategories___id" | "childCategories___parentCategory___childCategories___children" | "childCategories___parentCategory___childCategories___name" | "childCategories___parentCategory___childCategories___internalDescription" | "childCategories___parentCategory___childCategories___seoTitle" | "childCategories___parentCategory___childCategories___metaDescription" | "childCategories___parentCategory___childCategories___metaRobotsNoindex" | "childCategories___parentCategory___childCategories___canonicalUrl" | "childCategories___parentCategory___childCategories___seoText1" | "childCategories___parentCategory___childCategories___seoText2" | "childCategories___parentCategory___childCategories___seoText3" | "childCategories___parentCategory___childCategories___categoryText1" | "childCategories___parentCategory___childCategories___hideProducts" | "childCategories___parentCategory___childCategories___story" | "childCategories___parentCategory___childCategories___useStory" | "childCategories___parentCategory___childCategories___womanmenunisex" | "childCategories___parentCategory___childCategories___assignedLevel1Category" | "childCategories___parentCategory___childCategories___xyx" | "childCategories___parentCategory___childCategories___categoryImageUrl" | "childCategories___parentCategory___childCategories___categoryImage" | "childCategories___parentCategory___childCategories___featuredInDropdownMenu" | "childCategories___parentCategory___childCategories___productSearchQueries" | "childCategories___parentCategory___childCategories___assignedLevel2Category" | "childCategories___parentCategory___childCategories___topCategory" | "childCategories___parentCategory___childCategories___categoryLevel" | "childCategories___parentCategory___childCategories___assignedLevel3Category" | "childCategories___parentCategory___childCategories___type" | "childCategories___parentCategory___childCategories___menuItems" | "childCategories___parentCategory___childCategories___title" | "childCategories___parentCategory___childCategories___url" | "childCategories___parentCategory___childCategories___dropdownContent" | "childCategories___parentCategory___childCategories___page" | "childCategories___parentCategory___childCategories___magazineArticle" | "childCategories___parentCategory___childCategories___magazineCategory" | "childCategories___parentCategory___childCategories___productCategoryL1" | "childCategories___parentCategory___childCategories___productCategoryL2" | "childCategories___parentCategory___childCategories___productCategoryL3" | "childCategories___parentCategory___childCategories____id" | "childCategories___parentCategory___childCategories___contentType" | "childCategories___parentCategory___childCategories___createdAt" | "childCategories___parentCategory___childCategories___updatedAt" | "childCategories___parentCategory___childCategories___parentId" | "childCategories___parentCategory___childCategories___objectID" | "childCategories___parentCategory___childCategories___label" | "childCategories___parentCategory___childCategories___link" | "childCategories___parentCategory___childCategories___lv0" | "childCategories___parentCategory___childCategories___lv1" | "childCategories___parentCategory___childCategories___lv2" | "childCategories___parentCategory___childCategories___lv3" | "childCategories___parentCategory___childCategories___weight" | "childCategories___parentCategory___childCategories___displayInMenu" | "childCategories___parentCategory___childCategories___childIds" | "childCategories___parentCategory___childCategories___useEnhancedStory" | "childCategories___parentCategory___childCategories___childCategories" | "childCategories___parentCategory___childCategories___productTags" | "childCategories___parentCategory___productTags" | "childCategories___childCategories" | "childCategories___childCategories___id" | "childCategories___childCategories___parent___id" | "childCategories___childCategories___parent___children" | "childCategories___childCategories___children" | "childCategories___childCategories___children___id" | "childCategories___childCategories___children___children" | "childCategories___childCategories___internal___content" | "childCategories___childCategories___internal___contentDigest" | "childCategories___childCategories___internal___description" | "childCategories___childCategories___internal___fieldOwners" | "childCategories___childCategories___internal___ignoreType" | "childCategories___childCategories___internal___mediaType" | "childCategories___childCategories___internal___owner" | "childCategories___childCategories___internal___type" | "childCategories___childCategories___name" | "childCategories___childCategories___internalDescription" | "childCategories___childCategories___seoTitle" | "childCategories___childCategories___metaDescription" | "childCategories___childCategories___metaRobotsNoindex" | "childCategories___childCategories___canonicalUrl" | "childCategories___childCategories___seoText1" | "childCategories___childCategories___seoText2" | "childCategories___childCategories___seoText3" | "childCategories___childCategories___categoryText1" | "childCategories___childCategories___hideProducts" | "childCategories___childCategories___story" | "childCategories___childCategories___useStory" | "childCategories___childCategories___womanmenunisex" | "childCategories___childCategories___assignedLevel1Category" | "childCategories___childCategories___xyx" | "childCategories___childCategories___categoryImageUrl" | "childCategories___childCategories___categoryImage" | "childCategories___childCategories___featuredInDropdownMenu" | "childCategories___childCategories___productSearchQueries" | "childCategories___childCategories___assignedLevel2Category" | "childCategories___childCategories___topCategory" | "childCategories___childCategories___categoryLevel" | "childCategories___childCategories___assignedLevel3Category" | "childCategories___childCategories___type" | "childCategories___childCategories___menuItems" | "childCategories___childCategories___title" | "childCategories___childCategories___url" | "childCategories___childCategories___dropdownContent" | "childCategories___childCategories___page" | "childCategories___childCategories___magazineArticle" | "childCategories___childCategories___magazineCategory" | "childCategories___childCategories___productCategoryL1" | "childCategories___childCategories___productCategoryL2" | "childCategories___childCategories___productCategoryL3" | "childCategories___childCategories____id" | "childCategories___childCategories___contentType" | "childCategories___childCategories___createdAt" | "childCategories___childCategories___updatedAt" | "childCategories___childCategories___parentId" | "childCategories___childCategories___objectID" | "childCategories___childCategories___label" | "childCategories___childCategories___link" | "childCategories___childCategories___lv0" | "childCategories___childCategories___lv1" | "childCategories___childCategories___lv2" | "childCategories___childCategories___lv3" | "childCategories___childCategories___weight" | "childCategories___childCategories___displayInMenu" | "childCategories___childCategories___childIds" | "childCategories___childCategories___useEnhancedStory" | "childCategories___childCategories___parentCategory___id" | "childCategories___childCategories___parentCategory___children" | "childCategories___childCategories___parentCategory___name" | "childCategories___childCategories___parentCategory___internalDescription" | "childCategories___childCategories___parentCategory___seoTitle" | "childCategories___childCategories___parentCategory___metaDescription" | "childCategories___childCategories___parentCategory___metaRobotsNoindex" | "childCategories___childCategories___parentCategory___canonicalUrl" | "childCategories___childCategories___parentCategory___seoText1" | "childCategories___childCategories___parentCategory___seoText2" | "childCategories___childCategories___parentCategory___seoText3" | "childCategories___childCategories___parentCategory___categoryText1" | "childCategories___childCategories___parentCategory___hideProducts" | "childCategories___childCategories___parentCategory___story" | "childCategories___childCategories___parentCategory___useStory" | "childCategories___childCategories___parentCategory___womanmenunisex" | "childCategories___childCategories___parentCategory___assignedLevel1Category" | "childCategories___childCategories___parentCategory___xyx" | "childCategories___childCategories___parentCategory___categoryImageUrl" | "childCategories___childCategories___parentCategory___categoryImage" | "childCategories___childCategories___parentCategory___featuredInDropdownMenu" | "childCategories___childCategories___parentCategory___productSearchQueries" | "childCategories___childCategories___parentCategory___assignedLevel2Category" | "childCategories___childCategories___parentCategory___topCategory" | "childCategories___childCategories___parentCategory___categoryLevel" | "childCategories___childCategories___parentCategory___assignedLevel3Category" | "childCategories___childCategories___parentCategory___type" | "childCategories___childCategories___parentCategory___menuItems" | "childCategories___childCategories___parentCategory___title" | "childCategories___childCategories___parentCategory___url" | "childCategories___childCategories___parentCategory___dropdownContent" | "childCategories___childCategories___parentCategory___page" | "childCategories___childCategories___parentCategory___magazineArticle" | "childCategories___childCategories___parentCategory___magazineCategory" | "childCategories___childCategories___parentCategory___productCategoryL1" | "childCategories___childCategories___parentCategory___productCategoryL2" | "childCategories___childCategories___parentCategory___productCategoryL3" | "childCategories___childCategories___parentCategory____id" | "childCategories___childCategories___parentCategory___contentType" | "childCategories___childCategories___parentCategory___createdAt" | "childCategories___childCategories___parentCategory___updatedAt" | "childCategories___childCategories___parentCategory___parentId" | "childCategories___childCategories___parentCategory___objectID" | "childCategories___childCategories___parentCategory___label" | "childCategories___childCategories___parentCategory___link" | "childCategories___childCategories___parentCategory___lv0" | "childCategories___childCategories___parentCategory___lv1" | "childCategories___childCategories___parentCategory___lv2" | "childCategories___childCategories___parentCategory___lv3" | "childCategories___childCategories___parentCategory___weight" | "childCategories___childCategories___parentCategory___displayInMenu" | "childCategories___childCategories___parentCategory___childIds" | "childCategories___childCategories___parentCategory___useEnhancedStory" | "childCategories___childCategories___parentCategory___childCategories" | "childCategories___childCategories___parentCategory___productTags" | "childCategories___childCategories___childCategories" | "childCategories___childCategories___childCategories___id" | "childCategories___childCategories___childCategories___children" | "childCategories___childCategories___childCategories___name" | "childCategories___childCategories___childCategories___internalDescription" | "childCategories___childCategories___childCategories___seoTitle" | "childCategories___childCategories___childCategories___metaDescription" | "childCategories___childCategories___childCategories___metaRobotsNoindex" | "childCategories___childCategories___childCategories___canonicalUrl" | "childCategories___childCategories___childCategories___seoText1" | "childCategories___childCategories___childCategories___seoText2" | "childCategories___childCategories___childCategories___seoText3" | "childCategories___childCategories___childCategories___categoryText1" | "childCategories___childCategories___childCategories___hideProducts" | "childCategories___childCategories___childCategories___story" | "childCategories___childCategories___childCategories___useStory" | "childCategories___childCategories___childCategories___womanmenunisex" | "childCategories___childCategories___childCategories___assignedLevel1Category" | "childCategories___childCategories___childCategories___xyx" | "childCategories___childCategories___childCategories___categoryImageUrl" | "childCategories___childCategories___childCategories___categoryImage" | "childCategories___childCategories___childCategories___featuredInDropdownMenu" | "childCategories___childCategories___childCategories___productSearchQueries" | "childCategories___childCategories___childCategories___assignedLevel2Category" | "childCategories___childCategories___childCategories___topCategory" | "childCategories___childCategories___childCategories___categoryLevel" | "childCategories___childCategories___childCategories___assignedLevel3Category" | "childCategories___childCategories___childCategories___type" | "childCategories___childCategories___childCategories___menuItems" | "childCategories___childCategories___childCategories___title" | "childCategories___childCategories___childCategories___url" | "childCategories___childCategories___childCategories___dropdownContent" | "childCategories___childCategories___childCategories___page" | "childCategories___childCategories___childCategories___magazineArticle" | "childCategories___childCategories___childCategories___magazineCategory" | "childCategories___childCategories___childCategories___productCategoryL1" | "childCategories___childCategories___childCategories___productCategoryL2" | "childCategories___childCategories___childCategories___productCategoryL3" | "childCategories___childCategories___childCategories____id" | "childCategories___childCategories___childCategories___contentType" | "childCategories___childCategories___childCategories___createdAt" | "childCategories___childCategories___childCategories___updatedAt" | "childCategories___childCategories___childCategories___parentId" | "childCategories___childCategories___childCategories___objectID" | "childCategories___childCategories___childCategories___label" | "childCategories___childCategories___childCategories___link" | "childCategories___childCategories___childCategories___lv0" | "childCategories___childCategories___childCategories___lv1" | "childCategories___childCategories___childCategories___lv2" | "childCategories___childCategories___childCategories___lv3" | "childCategories___childCategories___childCategories___weight" | "childCategories___childCategories___childCategories___displayInMenu" | "childCategories___childCategories___childCategories___childIds" | "childCategories___childCategories___childCategories___useEnhancedStory" | "childCategories___childCategories___childCategories___childCategories" | "childCategories___childCategories___childCategories___productTags" | "childCategories___childCategories___productTags" | "childCategories___productTags" | "productTags";

declare type categoryConnection = {
  totalCount: number;
  edges: Array<categoryEdge>;
  nodes: Array<category>;
  pageInfo: PageInfo;
  distinct: Array<string>;
  group: Array<categoryGroupConnection>;
}

declare type categoryEdge = {
  next: ?category;
  node: category;
  previous: ?category;
}

declare type categoryGroupConnection = {
  totalCount: number;
  edges: Array<categoryEdge>;
  nodes: Array<category>;
  pageInfo: PageInfo;
  field: string;
  fieldValue: ?string;
}