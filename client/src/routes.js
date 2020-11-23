import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {DetailPage} from './pages/DetailPage';
import {AuthPage} from './pages/AuthPage';
import {SchedulePage} from './pages/SchedulePage';

export const useRoutes = isAutenticated =>{
    if(isAutenticated){
        return (
            <Switch>
                <Route path="/schedule" exact  >
                    <SchedulePage />
                </Route>
                <Route path="/detail"  >
                    <DetailPage />
                </Route>
                <Redirect to ="/schedule"  />
            </Switch>
        );
    }

    return (
        <Switch>
            <Route path="/" exact >
                <AuthPage />
            </Route>
            <Redirect to ="/"  />
        </Switch>
    );

} 
