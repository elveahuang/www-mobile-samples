import React from 'react';
import { useAppSelector } from '@commons/hooks';
import { check } from '@commons/utils/auth';

export interface AuthorizeProps {
    authority?: string | Array<string>;
    role?: string | Array<string>;
    children: any;
    noMatch: any;
}

const Authorize: React.FC<AuthorizeProps> = (props: AuthorizeProps) => {
    const { children, noMatch = null, authority, role } = props;
    const user = useAppSelector((state) => state.user.principal);
    const render = typeof children === 'undefined' ? '' : children;
    return check(user, role, authority) ? render : noMatch;
};

export default Authorize;
