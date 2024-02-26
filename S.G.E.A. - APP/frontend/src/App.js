import Header from "./Components/Header"
import Footer from "./Components/Footer"
import Main from "./Components/Main"
import axios from "axios";
import Login from "./Components/Login";
import { useEffect, useState } from "react";



export default function App() {

  const [auth,setAuth] = useState();
  async function fetchData(){
  
    const response = await axios.get("http://localhost:5500/api");
    const data = response.data;
  
    setAuth(data);
  };

  useEffect(()=>{
    fetchData();
  },[]);

  if (auth){
    return(
      <>
        <Header />
        <Main />
        <Footer />
      </> 
    )
  }else{
    return (
      <>
        <Login/> 
      </>
    )
  }
};
