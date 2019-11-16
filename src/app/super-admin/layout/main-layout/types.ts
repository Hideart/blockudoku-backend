import { ISidebarMenuItem, ICompanyInfo } from '@/core/components/sidebar/types';
import { IAdmin } from '../../models/interfaces/admin';
import { IUserInfo } from '@/core/components/header/types';

export interface IOwnProps {
  readonly title?: string;
  readonly userInfo?: IUserInfo;
  readonly sidebarMenuItems?: ISidebarMenuItem[];
  readonly companyInfo?: ICompanyInfo;
}

export interface IReduxProps {
  user: IAdmin;
}
