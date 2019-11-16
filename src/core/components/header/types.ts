export interface IOwnProps {
  readonly className?: string;
  readonly title?: string;
  readonly userInfo: IUserInfo;
}

export interface IUserInfo {
  fullName: string;
  avatar?: string | JSX.Element;
  link: string;
}
