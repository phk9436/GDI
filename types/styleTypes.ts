export interface IMobileCheck {
  isMobile: boolean;
}

export interface IOpenCheck {
  isOpen: boolean;
}

export interface IContent {
  content: string;
}

export interface ContentProps {
  cat: string;
  bg: string;
}

export interface IBreadCrumbButton {
  tapLength: number;
}

export interface IBreadCrumbMenu {
  tap: string[][];
  isOpened: boolean;
}

export interface IArrow {
  isDeleted: boolean;
}

export interface IDarkCheck {
  isDark: boolean;
}

export interface IClickCheck {
  isClicked: boolean;
}
