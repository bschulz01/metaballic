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
import MKBox from "../MKBox";
import MKButton from "../MKButton";
import MKTypography from "../MKTypography";
import PropTypes from "prop-types";
import Dropdown from "../Dropdown/Dropdown";
import DefaultNavbar from "../../examples/Navbars/DefaultNavbar";
import bgImage from "../../assets/images/city-profile.jpg";

function ActivityDetails(props) {

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
          <MKTypography variant="h5" textAlign="center">Details for {props.activityName}</MKTypography>
          <CloseIcon fontSize="medium" sx={{ cursor: "pointer" }} onClick={props.toggleModal} />
        </MKBox>
        <Divider sx={{ my: 0 }} />
        <MKBox
          minHeight="25rem"
          width="100%"
          sx={{
            backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
              `${linearGradient(
                rgba(gradients.dark.main, 0.8),
                rgba(gradients.dark.state, 0.8)
              )}, url(${props.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "grid",
            placeItems: "center",
          }}
        />
        <MKBox component="form" role="form"  pt={4} pb={3} px={3}>
          <MKBox mb={2}>
            <MKTypography>
              Shots attempted: {props.shotsAttempted}
            </MKTypography>
            <MKTypography>
              Shots made: {props.shotsMade}
            </MKTypography>
            <MKTypography>
              Success percentage: {props.shotsMade / props.shotsAttempted * 100}%
            </MKTypography>
          </MKBox>
        </MKBox>
        <Divider sx={{ my: 0 }} />
        <MKBox display="flex" justifyContent="space-between" p={1.5}>
          <MKButton variant="gradient" color="dark">
            Share
          </MKButton>
        </MKBox>
      </MKBox>
    </Modal>
  );
}

ActivityDetails.propTypes = {
  modalOpen: PropTypes.bool,
  toggleModal: PropTypes.func,
  image: PropTypes.string.isRequired,
  activityName: PropTypes.string.isRequired,
  shotsMade: PropTypes.number,
  shotsAttempted: PropTypes.number,
};


export default ActivityDetails;
