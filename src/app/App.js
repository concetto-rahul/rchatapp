import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// import AdminLayout from "./layout/AdminLayout";
// import WebsiteLayout from "./layout/WebsiteLayout";

// import Dashboard from "./Dashboard";
// import Home from "./Home";
// import Chat from "./Chat";
// import Profile from "./Profile";

import PageNotFound from "./PageNotFound";
import Login from "./containers/LoginContainer";
import SetUserName from "./containers/SetUserNameContainer";


// function AppRoute({component:Component,layout:Layout,...rest}){
//   return (
//     <Route {...rest} render={props=>(
//       <Layout><Component {...props}></Component></Layout>
//     )}></Route>
//   )
// }

function App() {
  return (
    <>
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/setusername" component={SetUserName} />
        
        {/* <AppRoute path="/dashboard" layout={AdminLayout} component={Dashboard} />
        <AppRoute path="/chat/:id" layout={AdminLayout} component={Chat} />
        <AppRoute path="/profile" layout={AdminLayout} component={Profile} />

        <AppRoute path="/home" layout={WebsiteLayout} component={Home} /> */}

        <Route path="/" exact={true} component={Login} />
        <Route path="*" component={PageNotFound} />
      </Switch>
    </BrowserRouter>
    </>
  );
}

export default App;
