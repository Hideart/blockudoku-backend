import { ISidebarMenuItem } from '@/core/components/sidebar/types';
import { IUserInfo } from '@/core/components/header/types';
import { ICompanyInfo } from '@/core/components/sidebar/types';

export interface IOwnProps {
  readonly className?: string;
  readonly sidebarMenuItems?: Array<ISidebarMenuItem>;
  readonly userInfo?: IUserInfo;
  readonly headerTitle?: string;
  readonly companyInfo?: ICompanyInfo;
  readonly mainLink: string;
}
