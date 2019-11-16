import { RouteProps } from 'react-router-dom';
import { IGuard, IResolver } from './custom-route';

export interface IRouteProps extends RouteProps {
    redirectUrl?: string;
    guards?: IGuard[];
    resolvers?: IResolver[];
    props?: any;
    propsCallBack?: (props: any) => void;
}
