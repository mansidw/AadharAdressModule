import React, { useRef, useState } from "react"
import { Form, Card, Alert } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import { firestore } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext"
import {withStyles, makeStyles} from '@material-ui/core/styles';
import { blueGrey } from '@material-ui/core/colors';
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Button from '@material-ui/core/Button';



const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(blueGrey[500]),
      fontFamily:'Raleway',
      backgroundColor: blueGrey[500],
      '&:hover': {
        backgroundColor: blueGrey[700],
      },
    },
  }))(Button);
  
  const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
  }));

const Add_details = () => {
    const classes = useStyles();
    const nameRef = useRef()
    const phoneRef = useRef()
    const publicRef = useRef()
    const cityRef = useRef()
    const stateRef = useRef()
    const donorRef = useRef()

    const { currentUser } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        setError("")
        // console.log(publicRef.current.value)
        if(publicRef.current.value == 'on'){
          var pub = true;
          console.log(pub)
        }
        else{var pub = false}

        if(donorRef.current.value == 'on'){
          var donor=true
        }
        else{
          var donor=false
        }
        firestore.collection("users").doc(currentUser.uid).set({
            Name:nameRef.current.value,
            Phone:phoneRef.current.value,
            Public: pub,
            City: cityRef.current.value,
            State : stateRef.current.value,
            Email:currentUser.email,
            Donor : donor,
          })
          .then(() => {
            history.push("/")
           })
          .catch((error) => {
            setError("Failed to update account")
            console.error("Error writing document: ", error);
          })
          .finally(() => {
            setLoading(false)
          })

///////////////////////////////////// community chat///////////////////////////////////
          // var data = {
          //   "username": currentUser.email.slice(0,currentUser.email.indexOf('@')),
          //   "secret": currentUser.uid,
          //   "email": currentUser.email,
          //   "first_name": nameRef.current.value.slice(0,nameRef.current.value.indexOf(' ')),
          //   "last_name": nameRef.current.value.slice(nameRef.current.value.indexOf(' ')+1)
          // }
          
          // var config = {
          //   method: 'post',
          //   url: 'https://api.chatengine.io/users/',
          //   headers: {
          //     'PRIVATE-KEY': '4354341d-d8c7-4d65-9640-3f1aaaed2899'
          //   },
          //   data : data
          // }

          // axios(config)
          // .then(function (response) {
          //   console.log(JSON.stringify(response.data));
          // })
          // .catch(function (error) {
          //   console.log(error);
          // });
          
///////////////////////////////////// community chat///////////////////////////////////
        
    }
    return (
        <>
        <div className="outer">
        <div className="inner">
            <Card className="provide_color">
                <Card.Body>
                <h2 className="text-center mb-4">Additional Details</h2>
                {error && <Alert variant="danger">{error}</Alert>}

                <Form onSubmit={handleSubmit}>

                    <Form.Group id="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        ref={nameRef}
                        required
                    />
                    </Form.Group>

                    <Form.Group id="phone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                        type="text"
                        ref={phoneRef}
                        required
                    />
                    </Form.Group>

                    <Form.Group id="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type="text"
                        ref={cityRef}
                        required
                    />
                    </Form.Group>

                    <Form.Group id="state">
                    <Form.Label>State</Form.Label>
                    <Form.Control
                        type="text"
                        ref={stateRef}
                        required
                    />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                      <Form.Check ref={donorRef} type="checkbox" label="If donor click the box!" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                      <Form.Check ref={publicRef} type="checkbox" label="Want a public account?" />
                    </Form.Group>

                    <ColorButton variant="contained" color="primary" disabled={loading} className={classes.margin} className="w-100 mt-4" type="submit">
                        Add
                    </ColorButton>
                    
                </Form>
                <div className="w-100 text-center mt-3">
                    <Link to="/">Go Back</Link>
                </div>
                </Card.Body>
            </Card>
      </div>
      </div>
    </>
    )
}

export default Add_details
