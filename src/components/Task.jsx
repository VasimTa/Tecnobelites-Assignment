import React,{useState} from "react";
import {Grid,Card,CardContent,TextField,Button,Switch} from "@mui/material"
import { useDispatch,useSelector } from "react-redux";
import { TaskChild } from "./TaskChild";


export const Task=()=>{
    const [isActiveFilter, setIsActiveFilter] = useState(false);
    const [IsActive,setIsActive]=useState(false)
    const [index, setIndex] = useState(null);
    const [edit, setEdit] = useState(false);
    const [formData, setFormData] = useState({
        date: "",
      });
      const [title,setTitle]=useState("")
      const [desc,setDesc]=useState("")
      const [data,setData]=useState([])

      const dispatch=useDispatch()

    const storedData = JSON.parse(localStorage.getItem("tasks")) || [];
    const reduxData = useSelector((state) => state.AddReducer.alldata)



      const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };


      const handleAdd=()=>{

        if (edit === true) {
          const updatedData = [...storedData]
          updatedData.splice(index, 1, { desc, title,dueDate: formData.date});
          localStorage.setItem("tasks", JSON.stringify(updatedData));
            setIndex(null);
            setEdit(false);
            setDesc("")
            setTitle("")
            setFormData({ date: "" })
          
          } else { 
           if(desc && title && formData  !=""){
            const type="ADD-DATA"
            const payload={desc,title,dueDate: formData.date}
            const action={type,payload}
            dispatch(action)
            const storedData = JSON.parse(localStorage.getItem("tasks")) || [];
        localStorage.setItem("tasks", JSON.stringify([...storedData, payload]));
        setTitle("");
        setDesc("");
        setFormData({ date: "" });
          }else{
            alert("Plz Fill The All Fields First")
          }
       
      }     
    }


      

      
    return(
        <Grid container spacing={3}>
              <Grid item xs={12}>
                <h1 style={{textAlign:"center"}}>Task Management App</h1>
            </Grid>
            <Grid item xs={3}>
                <TextField onChange={(e)=>setTitle(e.target.value)} value={title}  variant="outlined" fullWidth label="Type Title..."/>
            </Grid>
            <Grid item xs={3}>
                <TextField onChange={(e)=>setDesc(e.target.value)} value={desc}  variant="outlined" fullWidth label="Type Description..."/>
            </Grid>
            <Grid item xs={3}>
            <TextField
            style={{position:"relative",bottom:15}}
              label="Due Date"
              fullWidth
              margin="normal"
              type="date"
              name="date"
              value={formData.date}
              sx={{ textAlign: "center", marginBottom: "15px" }}
              onChange={handleFormChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          
          <Grid item xs={1.5}>
          <Switch
          style={{ marginLeft: 10 }}
          checked={isActiveFilter}
          onChange={() => setIsActiveFilter(!isActiveFilter)}
        />
        {isActiveFilter ? "Completed" : "Pending"}
            </Grid>
        <Grid item xs={1.5}>
                <Button style={{height:55,backgroundColor:edit?"orange":"green"}} onClick={handleAdd}  variant="contained"  fullWidth>{edit?"Update":"Add"}</Button>
            </Grid>
            
        
            
           <TaskChild setDesc={setDesc} setTitle={setTitle} setIndex={setIndex} setEdit={setEdit} setFormData={setFormData} setData={setData} data={data} />
        </Grid>
    )
}