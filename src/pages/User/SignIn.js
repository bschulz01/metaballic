/**
=========================================================
* Material Kit 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import React, {useState, useEffect} from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// Firebase
import fire from "./fire"
import 'firebase/auth'

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

// Material Kit 2 React components
import MKBox from "../../components/MKBox";
import MKTypography from "../../components/MKTypography";
import MKInput from "../../components/MKInput";
import MKButton from "../../components/MKButton";

// Material Kit 2 React example components
import DefaultNavbar from "../../examples/Navbars/DefaultNavbar";
import Footer from "../../layouts/sections/page-sections/footers/Footer";

// Material Kit 2 React page layout routes
import routes from "../../routes";

import SignUpModal from "./SignUp";

// Images
import bgImage from "../../assets/images/bg-sign-in-basic.jpeg";
import loggedInRoute from "../../loggedInRoute";
import loggedOutRoute from "../../loggedOutRoute";

function SignIn() {


  const [show, setShow] = useState(false);
  const toggleModal = () => {setShow(!show)};

  //set up the initial states//
  const[user, setUser] = useState('');
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const[errmsg, setErrMsg] = useState('');
  const[successmsg, setSuccessMsg] = useState('');

  //two cleanup functions to clear inputs and error messages
  const clearInputs = () => {
    setEmail('');
    setPassword('');
  };

  const clearErrors = () => {
    setErrMsg('');
  };

  const handleLogin = () => {
    clearErrors();
    fire
      .auth()
      .signInWithEmailAndPassword(email,password)
      .catch(err => {
        switch(err.code){
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setErrMsg(err.message);
            return;
          case "auth/wrong-password":
            setErrMsg(err.message);
            return;
          default: return;
        }
      });
    if (errmsg.toString() != '') {
      setSuccessMsg('');
    } else {
      setSuccessMsg("Sign in successful");
    }
  };

  const handleLogout = () => {
    fire.auth().signOut();
  };

  const authListener = () => {
    fire.auth().onAuthStateChanged(user => {
      if(user){
        clearInputs();         //whenever we have a user
        setUser(user);
      }
      else {                   //set User to emtpy string if no user
        setUser("");
      }
    });
  };

  useEffect(() =>{
    authListener()             //listen to events
  }, []);

  const [rememberMe, setRememberMe] = useState(false);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  return (
    <>
      <DefaultNavbar
        // routes={routes.concat(fire.auth().currentUser ? loggedInRoute : loggedOutRoute)}
        routes={routes}
        transparent
        light
      />
      <SignUpModal
        toggleModal={toggleModal}
        modalOpen={show}
      />
      <MKBox
        position="absolute"
        top={0}
        left={0}
        zIndex={1}
        width="100%"
        minHeight="100vh"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
        <MKBox px={1} width="100%" height="100vh" mx="auto" position="relative" zIndex={2}>
          <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
            <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
              <Card>

                <MKBox
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="info"
                  mx={2}
                  mt={-3}
                  p={2}
                  mb={1}
                  textAlign="center"
                >
                  <MKTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                    Sign in
                  </MKTypography>
                </MKBox>
                <MKBox pt={4} pb={3} px={3}>
                  <MKBox component="form" role="form">
                    <MKBox mb={2}>
                      <MKInput
                        type="email"
                        label="Email"
                        fullWidth
                        onChange={(e) => {setEmail(e.target.value);}}
                      />
                    </MKBox>
                    <MKBox mb={2}>
                      <MKInput
                        type="password"
                        label="Password"
                        fullWidth
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </MKBox>
                    <MKBox display="flex" alignItems="center" ml={-1}>
                      <Switch checked={rememberMe} onChange={handleSetRememberMe} />
                      <MKTypography
                        variant="button"
                        fontWeight="regular"
                        color="text"
                        onClick={handleSetRememberMe}
                        sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                      >
                        &nbsp;&nbsp;Remember me
                      </MKTypography>
                    </MKBox>
                    <MKBox mt={4} mb={1}>
                      <MKButton
                        variant="gradient"
                        color="info" fullWidth
                        onClick={handleLogin}
                      >
                        sign in
                      </MKButton>
                      <MKTypography
                        color="error"
                        variant="body2"
                      >
                        {errmsg}
                      </MKTypography>
                    </MKBox>
                    <MKBox mt={3} mb={1} textAlign="center">
                      <MKTypography variant="button" color="text">
                        Don&apos;t have an account?{" "}
                        <MKButton
                          onClick={toggleModal}
                          color="info"
                          fontWeight="regular"
                        >
                          Sign up
                        </MKButton>
                      </MKTypography>
                    </MKBox>
                  <MKTypography
                    color="success"
                    variant="body2"
                  >
                    {successmsg}
                  </MKTypography>
                  </MKBox>
                </MKBox>
              </Card>
            </Grid>
          </Grid>
        </MKBox>
    </>
  );
}

export default SignIn;
