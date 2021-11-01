import React from "react"
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Signup from "./Sign/Signup"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
// import Dashboard from "./Dashboard"
import Login from "./Sign/Login"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./Sign/ForgotPassword"
// import UpdateProfile from "./UpdateProfile"
import Landing from "./Basics/Landing"
import Myprofile from "./Sign/Myprofile"
// import Chat from "./Chats/Chat"
import AboutUs from "./Basics/AboutUs";
import Add_details from "./Sign/Add_details";
import '../css/app.css'


function App() {
  return (
        <Router>
          
          <AuthProvider>
          
              <Switch>
                {/* <PrivateRoute exact path="/" component={Dashboard} /> */}
                
                {/* <PrivateRoute path="/update-profile" component={UpdateProfile} /> */}
                
                <Route exact path="/" component={Landing} />
                <Route path="/forgot-password" component={ForgotPassword} />
                <Route path="/about" component={AboutUs} />
                <PrivateRoute path="/add_details" component={Add_details} />
                <PrivateRoute path="/myprofile" component={Myprofile} />
          
                <div className="outer">
                <div className="inner">
                
                  <Route path="/signup" component={Signup} />
                  <Route path="/login" component={Login} />
                  
                </div>
                </div>
                
              </Switch>
          </AuthProvider>
        </Router>
  )
}

export default App
