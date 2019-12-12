import * as React from 'react';
import { HomepageLayout } from './components/layout/HomePage';
import { Responsive } from 'semantic-ui-react';

const getWidthFactory = (isMobileFromUserAgent: boolean) => () => {
  const isSSR = typeof window === "undefined";
  const ssrValue = isMobileFromUserAgent
    ? Responsive.onlyMobile.maxWidth
    : Responsive.onlyTablet.minWidth;

  return isSSR ? ssrValue as number : window.innerWidth;
};

export type AppProps = {
  isMobileUserAgent: boolean
}
export const App: React.FC<AppProps> = props => {

  const { isMobileUserAgent } = props;

  return (
    <HomepageLayout
      getWidth={getWidthFactory(isMobileUserAgent)}
    />
  )
}
