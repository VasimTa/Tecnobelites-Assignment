import React from "react"
import { Provider } from "react-redux";
import { Card,CardContent } from "@mui/material";
import { Task } from "./components/Task";
import { configStore } from "./components/State/Store/configStore";


function App() {
  const mystore=configStore()
  return (
    <Provider store={mystore}>
      <Card>
    <CardContent>
      <Task/>   
    </CardContent>
   </Card>
    </Provider>
   
  );
}

export default App;