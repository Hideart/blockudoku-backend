import { MouseEventHandler } from 'react-select/lib/types';

export interface IOwnState {
  isExpanded: boolean;
}

export interface IOwnProps {
  readonly className?: string;
  readonly company?: ICompanyInfo;
  readonly menuItems: Array<ISidebarMenuItem>;
  readonly menuSubItems?: Array<ISidebarMenuSubItem>;
  readonly mainLink: string;
}

export interface ISidebar {
  expandHandler: MouseEventHandler;
}

export interface ISidebarMenuItem {
  label: string;
  icon: string;
  url: string;
  sublinks?: Array<ISidebarMenuSubItem>;
}

export interface ISidebarMenuSubItem {
  subLabel: string;
  subUrl: string;
}

export interface ICompanyInfo {
  logo: string | JSX.Element;
  title: string;
}
