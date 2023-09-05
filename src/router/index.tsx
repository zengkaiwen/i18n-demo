import React, { Suspense } from 'react';
import { RouteProps as DefaultRouteProps, Redirect, RouteComponentProps, Switch, Route } from 'react-router-dom'

export interface RouteProps extends Omit<DefaultRouteProps, 'children'>{
    path?: string;
    redirect?: string;
    children?: RouteProps[];
}

interface IRouterProps {
    routes: RouteProps[];
    fallback?: React.ReactNode;
}

const Routes: React.FC<IRouterProps> = ({ routes, fallback }) => {
    return (
        <Switch>
            {routes.map((route, id) => {
                const { children } = route;
                if (!children) {
                    if (route.redirect) {
                        const { redirect, path, ...others } = route;
                        return <Redirect key={id} from={path} to={redirect} {...others} />
                    } else {
                        const { component: RouteComponent, children, ...others } = route;
                        console.log(children);
                        if (RouteComponent) {
                            const RenderComponent = (props: RouteComponentProps) => (
                                <Suspense fallback={fallback || <div>Loading...</div>}>
                                    <RouteComponent {...props} />
                                </Suspense>
                            )
                            return (
                                <Route key={id} render={RenderComponent} {...others} />
                            )
                        } else {
                            console.error("[Router] component is required when config routes");
                            return null;
                        }
                    }
                } else {
                    const { component: LayoutComponent, children, ...others } = route;
                    const routesComponent = <Routes routes={children as RouteProps[]} fallback={fallback} />
                    const RenderComponent = (props: RouteComponentProps) => LayoutComponent ? (
                        <LayoutComponent {...props}>
                            {routesComponent}
                        </LayoutComponent>
                    ) : routesComponent;
                    return (
                        <Route key={id} render={RenderComponent} {...others} />
                    )
                }
            })}
        </Switch>
    )
}

export default Routes;
