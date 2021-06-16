import React, { FC } from 'react';
import { Redirect, Route, useHistory } from 'react-router-dom';
import Authorize from '@commons/components/Auth/Authorize';

export interface AuthorizeRouteProps {
    authority: string | Array<string>;
    role: string | Array<string>;
    render: any;
    component: any;
    redirectPath: any;
}

const AuthorizeRoute: FC<AuthorizeRouteProps> = (props: AuthorizeRouteProps) => {
    const { component: Component, render, authority, redirectPath, ...rest } = props;
    const history = useHistory();

    return (
        <Authorize
            authority={authority}
            noMatch={
                <Redirect
                    to={{
                        pathname: redirectPath ? redirectPath : '/login',
                        state: { from: history.location },
                    }}
                />
            }
        >
            <Route {...rest} render={(props) => (Component ? <Component {...props} /> : render(props))} />
        </Authorize>
    );
};

export default AuthorizeRoute;
