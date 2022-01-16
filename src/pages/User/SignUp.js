import React, { useState } from "react";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import Slide from "@mui/material/Slide";

// @mui icons
import CloseIcon from "@mui/icons-material/Close";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
import fire from "./fire";
import MKInput from "../../components/MKInput";
import Switch from "@mui/material/Switch";

function SignUpModal(props) {

  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const[password2, setPassword2] = useState('');
  const[errmsg, setErrMsg] = useState('');
  const[successmsg, setSuccessMsg] = useState('');

  const clearErrors = () => {
    setErrMsg('');
  };

  const handleSignup = () => {
    clearErrors();
    if (email == '') {
      setErrMsg("Please enter an email");
      return
    }
    if (password != password2) {
      setErrMsg("Passwords do not match")
      return;
    }
    fire
      .auth()
      .createUserWithEmailAndPassword(email,password)
      .catch(err => {
        switch(err.code){
          case "auth/email-already-in-use":
          case "auth/invalid-email":
          case "auth/weak-password":
            setErrMsg(err.message);
            break;
        }
      });
    setSuccessMsg("Account created");
  };

  return (
        <Modal open={props.modalOpen} onClose={props.toggleModal} sx={{ display: "grid", placeItems: "center" }}>
          <MKBox
            position="relative"
            width="500px"
            display="flex"
            flexDirection="column"
            borderRadius="xl"
            bgColor="white"
            shadow="xl"
          >
            <MKBox display="flex" alginItems="center" justifyContent="space-between" p={2}>
              <MKTypography variant="h5" textAlign="center">Sign up for an account</MKTypography>
              <CloseIcon fontSize="medium" sx={{ cursor: "pointer" }} onClick={props.toggleModal} />
            </MKBox>
            <Divider sx={{ my: 0 }} />
            <MKBox component="form" role="form"  pt={4} pb={3} px={3}>
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
              <MKBox mb={2}>
                <MKInput
                  type="password"
                  label="Confirm Password"
                  fullWidth
                  onChange={(e) => setPassword2(e.target.value)}
                />
              </MKBox>
            </MKBox>
            <Divider sx={{ my: 0 }} />
            <MKBox display="flex" justifyContent="space-between" p={1.5}>
              <MKButton variant="gradient" color="dark" onClick={handleSignup}>
                Sign Up
              </MKButton>
              <MKTypography
                color="error"
                variant="body2"
              >
                {errmsg}
              </MKTypography>
              <MKTypography
                color="success"
                variant="body2"
              >
                {successmsg}
              </MKTypography>
            </MKBox>
          </MKBox>
        </Modal>
  );
}

export default SignUpModal;
