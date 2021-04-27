import { extendTheme } from '@chakra-ui/react';

import globalTheme from './globalTheme';

import { globalLayout } from './globalTheme';

export const NAV_HEIGHT = globalLayout.navHeight;
export const ASIDE_WITDH = globalLayout.asideWitdh;
export const MAIN_WIDTH = globalLayout.mainWidth;
export const LAYOUT_PADDING = globalLayout.layoutPadding;
export const LAYOUT_MAXW = globalLayout.maxW;

export const theme = extendTheme(globalTheme);
