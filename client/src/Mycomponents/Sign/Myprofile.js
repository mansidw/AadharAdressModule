import React, { useRef, useState, useEffect } from "react"
import { Form, Card, Alert } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import { firestore } from "../../firebase";
import {withStyles, makeStyles} from '@material-ui/core/styles';
import { blueGrey } from '@material-ui/core/colors';
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Button from '@material-ui/core/Button';
import { Footer } from '../Basics/Footer'
import { Header } from '../Basics/Header'


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


export default function Myprofile() {
  const classes = useStyles();
  const [message,setMessage] = useState()
  const emailRef = useRef()
  const nameRef = useRef()
  const cityRef = useRef()
  const stateRef = useRef()
  const phoneRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { currentUser, updatePassword, updateEmail } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  useEffect(()=>{
    console.log("mansi")
    firestore.collection("users").doc(currentUser.uid)
    .get()
    .then((doc) => {
      console.log("mansi1")
        if (doc.exists) {
          console.log("mansi2")
          setMessage(doc.data())
          console.log(doc.data())
      }})
      .catch((error) => {
        console.log("Error getting document:", error);
    });

  },[])

  function handleSubmit(e) {
    e.preventDefault()
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    const promises = []
    setLoading(true)
    setError("")

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value))
      promises.push(
        firestore.collection("users").doc(currentUser.uid)
        .update({ email:emailRef.current.value}))
    }
    if (nameRef.current.value !== message.name) {
      promises.push(
        firestore.collection("users").doc(currentUser.uid)
        .update({ name:nameRef.current.value},{merge:true}))
    }
    if (cityRef.current.value !== message.City) {
      promises.push(
        firestore.collection("users").doc(currentUser.uid)
        .update({ City:cityRef.current.value},{merge:true}))
    }
    if (phoneRef.current.value !== message.Phone) {
      promises.push(
        firestore.collection("users").doc(currentUser.uid)
        .update({ Phone:phoneRef.current.value},{merge:true}))
    }
    if (stateRef.current.value !== message.State) {
      promises.push(
        firestore.collection("users").doc(currentUser.uid)
        .update({ State:stateRef.current.value},{merge:true}))
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value))
    }

    Promise.all(promises)
      .then(() => {
        history.push("/")
      })
      .catch(() => {
        setError("Failed to update account")
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
    <Header/>
    <div className="outer">
    <div className="inner">
      <Card className="provide_color">
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message ? <Form onSubmit={handleSubmit}>
                        <Form.Group id="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                              type="text"
                              ref={nameRef}
                              required
                              defaultValue={message.Name}
                            />
                          </Form.Group>

                          <Form.Group id="phone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                              type="text"
                              ref={phoneRef}
                              required
                              defaultValue={message.Phone}
                            />
                          </Form.Group>

                          <Form.Group id="city">
                            <Form.Label>City</Form.Label>
                            <Form.Control
                              type="text"
                              ref={cityRef}
                              required
                              defaultValue={message.City}
                            />
                          </Form.Group>

                          <Form.Group id="state">
                            <Form.Label>State</Form.Label>
                            <Form.Control
                              type="text"
                              ref={stateRef}
                              required
                              defaultValue={message.State}
                            />
                          </Form.Group>

                          <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                              type="email"
                              ref={emailRef}
                              required
                              defaultValue={currentUser.email}
                            />
                          </Form.Group>

                          <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                              type="password"
                              ref={passwordRef}
                              placeholder="Leave blank to keep the same"
                            />
                          </Form.Group>

                          <Form.Group id="password-confirm">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control
                              type="password"
                              ref={passwordConfirmRef}
                              placeholder="Leave blank to keep the same"
                            />
                          </Form.Group>

                          <ColorButton variant="contained" color="primary" disabled={loading} className={classes.margin} className="w-100 mt-4" type="submit">
                            Update
                        </ColorButton>

                        </Form>:<></> }
                        <div className="w-100 text-center mt-3">
                          <Link to="/">Go Back</Link>
                        </div>
          
          </Card.Body>
        </Card>
      </div>
      </div>

      <Footer/>
    </>
  )
}