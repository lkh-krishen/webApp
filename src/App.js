import ViewInspectors from './components/inspector/ViewInspectors'
import Sidebar from './components/Sidebar'
import Home from './components/Home'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignUp from './components/user/SignUp';
import Login from './components/user/Login';
import AddInspector from './components/inspector/AddInspector';
import EditInspector from './components/inspector/EditInspector';
import AddPassenger from './components/passenger/AddPassenger';
import ViewPassengers from './components/passenger/ViewPassengers'

function App() {
  return (
    <div className="main">
       <Router>
      <Switch>
        <Route path="/" component={Sidebar} />
      </Switch>

      <Switch>
        <Route path="/" exact component={Home}>
          <Home />
        </Route>
         <Route path="/allInspectors" exact component={ViewInspectors}>
          <ViewInspectors/>
        </Route>
        <Route path="/addInspectors" exact component={AddInspector}>
          <AddInspector/>
        </Route>

        <Route path="/inspectorEdit/:id" exact component={EditInspector}>
          <EditInspector/>
        </Route>

        <Route path="/allPassengers" exact component={ViewPassengers}>
          <ViewPassengers/>
        </Route>
        <Route path="/addPassengers" exact component={AddPassenger}>
          <AddPassenger/>
        </Route>

        <Route path="/." exact component={Login}>
          <Login/>
        </Route>


      </Switch>

      {/* <Route
          path="/adminPannel/editUser/:id"
          component={EditUser}
        >
          <EditUser />
        </Route>  */}


   
    </Router>
     
      <div className="container">
      
      </div>
    </div>
  )
}

export default App
