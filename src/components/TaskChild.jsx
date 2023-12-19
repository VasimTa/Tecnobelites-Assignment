import React,{useState,useEffect} from "react";
import { Grid,Switch,Button,Card,CardContent } from "@mui/material";
import { useSelector } from "react-redux";

export const TaskChild=({isActiveFilter,setTitle,setDesc,setEdit,setIndex,setFormData,setData,data})=>{
    const [IsActive,setIsActive]=useState(false)
    const [mydata, setMyData] = useState([]);

    const storedData = JSON.parse(localStorage.getItem("tasks")) || [];
    const reduxData = useSelector((state) => state.AddReducer.alldata)
      

    useEffect(() => {
        const mergedData = [...storedData, ...reduxData];
        setMyData(mergedData);
      }, [reduxData, storedData]);

      const handleDelete=(ind)=>{
        const updatedData = mydata.filter((elem, i) => i !== ind);

    localStorage.setItem("tasks", JSON.stringify(updatedData));

    setMyData(updatedData);
      }

      const handleSend=(item,ind)=>{
        setTitle(item.title)
        setDesc(item.desc)
        setFormData(item.dueDate)
        setEdit(true)
        setIndex(ind)
      }

    
    

    return(
        <React.Fragment>
             {
                storedData.map((item,ind)=>
                <Grid item xs={12}>
                    <Card style={{border:"3px solid black"}}>
                        <CardContent>
                            <Grid container spacing={3}>
                            <Grid item xs={1}><h2>{ind+1}</h2></Grid>
                            <Grid item xs={2}>
                                <h2>{item.title}</h2>
                            </Grid>
                            <Grid item xs={4}>
                                <h2>{item.desc}</h2>
                            </Grid>
                            <Grid item xs={2}>
                                <h2>{item.dueDate}</h2>
                            </Grid>
            <Grid item xs={1}>
           {
            isActiveFilter===true?(
                <Switch checked={true} readOnly />
            ):(
                <Switch checked={false} readOnly />
            )
           }
            </Grid>
            <Grid item xs={1}>
                <Button variant="contained" style={{backgroundColor:"purple"}} onClick={()=>handleSend(item,ind)}  fullWidth>Edit</Button>
            </Grid>
            <Grid item xs={1}>
                <Button variant="contained" style={{backgroundColor:"red"}} onClick={()=>handleDelete(ind)} fullWidth>Delete</Button>
            </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                )
            }
            </React.Fragment>
    )
}