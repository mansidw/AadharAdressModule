import React, { useState,useEffect } from 'react'
// import { Alert} from "react-bootstrap"
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { firestore } from "../../firebase";
import WorkIcon from '@material-ui/icons/Work';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
// import Select from '@material-ui/core/Select';
import Select from 'react-select'
import { useAuth } from "../../contexts/AuthContext"
import { useHistory } from "react-router-dom"
import axios from 'axios';




const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  appbar:{
    backgroundColor: "#87A7B3",
    fontFamily: "Raleway",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    color:'white'
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: '1px dotted white',
    color: 'white',
    padding: 20,
    backgroundColor:'#082032',
  }),
}


export const Header = () => {
    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const history = useHistory()
    const classes = useStyles();
    const [selected,setSelected] = useState(null)
    const [namedata,setNamedata] = useState([])
    const [number,setNumber] = useState(null)
    const [yesdone,setYesdone] = useState(false)


    useEffect(() => {
      firestore.collection("users").where("Public","==",true).where("Donor", "==", true)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setNamedata((old)=>[...old,doc.data().Name])
      })})
      .catch((error) => {
          console.log("Error getting document:", error);
      });
    }, [currentUser.uid])

    const options=[]
    namedata.forEach((x)=>{
      options.push({value:x,label:x})
    })
    // console.log(options)

    async function handleLogout() {
        setError("")
        try {
          await logout()
          history.push("/login")
        } catch {
          setError("Failed to log out")
        }
      }
    
    async function handleChange(selected){
      setSelected(selected)
      console.log(selected['value'])
      const query = await firestore.collection("users").where("Name","==",selected['value']).get()
      console.log(query.data())
      try{
        if(query.exists){
          console.log(query.data().Phone)
          setNumber(query.data().Phone)
        }
        try{
          const response = await axios.post('http://localhost:8000/sendsms',{number:number,name:selected})
          if(response.data == 'done'){
            setYesdone(true)
          }
          console.log(response)
        }catch(err){
          console.log(err)
        }
      }
      catch(err){
        console.log(err)
      }
    }

    
    return (
        <>
    <CssBaseline />
    {error && <Alert variant="danger">{error}</Alert>}
    {yesdone && <Alert
        iconMapping={{
          success: <CheckCircleOutlineIcon fontSize="inherit" />,
        }}
      >
        `Message sent to ${selected}. Let's wait for the reply..`
      </Alert>}
      <AppBar position="relative" className={classes.appbar}>
        <Toolbar>
          {/* <WorkIcon className={classes.icon} style={{'color':'#082032'}} onClick={()=>console.log("mansi")}/> */}
          <Typography variant="h6" color="inherit" noWrap className={classes.appbar} style={{ flex: 1 }}>
              {/* {currentUser ?
                <>
                    <FormControl className={classes.formControl}>
                        <Select
                        value={jobtype}
                        onChange={handleChange}
                        displayEmpty
                        className={classes.selectEmpty}
                        inputProps={{ 'aria-label': 'Without label' }}
                        style={{'fontFamily': "Raleway",'color':'white','fontWeight':'bold'}}
                        >
                            <MenuItem value="" disabled style={{'color':'white','fontFamily': "Raleway",'backgroundColor':'#082032'}}>SHOW JOBS</MenuItem>
                            <MenuItem value='locationwise' style={{'color':'white','fontFamily': "Raleway",'backgroundColor':'#082032'}}>Location Wise</MenuItem>
                            <MenuItem value='recboard' style={{'color':'white','fontFamily': "Raleway",'backgroundColor':'#082032'}}>Qualification Wise</MenuItem>
                        </Select>  */}
                        {/* <FormHelperText style={{'color':'white','fontFamily': "Raleway",}}>JOB TYPE</FormHelperText> */}
                    {/* </FormControl>
                </>  : <></>
            }  */}


          </Typography>
         

          

          {currentUser ? 
          <> 
          <Select options={options} styles={customStyles} value={selected} onChange={handleChange}/>
          
          <Button color="primary" className="button" component={RouterLink} to="/about" size="large" variant="contained" style={{'backgroundColor':'#082032','margin':'5px','textDecoration':'none'}}>
            About Us
          </Button>
          <Button color="primary" className="button" component={RouterLink} to="/myprofile" size="large" variant="contained" style={{'backgroundColor':'#082032','margin':'5px','textDecoration':'none'}}>
            My Profile
          </Button>
          <Button color="primary" className="button" component={RouterLink} size="large" variant="contained" onClick={handleLogout} style={{'backgroundColor':'#082032','margin':'5px','textDecoration':'none'}}>
            Logout
          </Button> 
          </>
          : <>
          <Button color="primary" className="button" component={RouterLink} to="/about" size="large" variant="contained" style={{'backgroundColor':'#082032','margin':'5px','textDecoration':'none'}}>
            About Us
          </Button>
          <Button color="primary" className="button" component={RouterLink} size="large" variant="contained" to="/login" style={{'backgroundColor':'#082032','margin':'5px','textDecoration':'none'}}>
            Login
            </Button>
            <Button color="primary" className="button" component={RouterLink} size="large" variant="contained" to="/signup"  style={{'backgroundColor':'#082032','margin':'5px','textDecoration':'none'}}>
            SignUp
            </Button></>
            }

          

        </Toolbar>
      </AppBar>
      </>
    )
}
