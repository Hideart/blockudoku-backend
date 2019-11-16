import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IRouteProps } from '@/core/models/interfaces/protected-router';

export interface IState {
    isOk: boolean | null;
}

// function Loading() {
//     return <div>Loading!</div>;
// }
function EmptyPage() {
    return null;
}

export class CustomRoute extends Route<IRouteProps> {
    readonly state: IState = {
        isOk: null,
    };
    async componentWillMount() {
        const { guards, resolvers } = this.props;
        let isOkMain;

        if (guards && guards.length) {
            const promises = guards.map(async (guard) => {
                const canActivate = guard.CanActivate();
                return canActivate;
            });
            const result = await Promise.all(promises);
            const isOk = !result.some(i => !i);

            isOkMain = isOk;
        } else {
            isOkMain = true;
        }
        if (isOkMain && resolvers && resolvers.length) {
            const promises = resolvers.map(async (resolver) => {
                return await resolver.Resolve();
            });

            await Promise.all(promises);
        }
        this.setState({ isOk: isOkMain });

    }
    render() {
        const { isOk } = this.state;
        const { path, component, redirectUrl, propsCallBack, props } = this.props;
        if (isOk === null) {
            return <EmptyPage />;
        }
        if (!isOk && redirectUrl) {
            return <Redirect to={redirectUrl} />;
        }
        if (propsCallBack && props) {
            propsCallBack(props);
        }
        return <Route path={path} component={component} />;
    }
}
