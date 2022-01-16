/**
=========================================================
* Material Kit 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// react-router components
import { Link } from "react-router-dom";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import MuiLink from "@mui/material/Link";

// Material Kit 2 React components
import MKBox from "../MKBox";
import MKTypography from "../MKTypography";
import React, {useState} from "react";
import ActivityDetails from "./DetailModal";
import Grid from "@mui/material/Grid";
import MKButton from "../MKButton";

function ActivityTile({ image, activityName, shotsMade, shotsAttempted }) {

    const cardActionStyles = {
    display: "flex",
    alignItems: "center",
    width: "max-content",

    "& .material-icons, .material-icons-round,": {
      transform: `translateX(2px)`,
      transition: "transform 0.2s cubic-bezier(0.34,1.61,0.7,1.3)",
    },

    "&:hover .material-icons, &:focus .material-icons, &:hover .material-icons-round, &:focus .material-icons-round":
      {
        transform: `translateX(6px)`,
      },
  };

  const [showModal, setShow] = useState(false);
  const toggleModal = () => {
    setShow(!showModal)
  };

  const imageTemplate = (
    <MKBox position="relative" borderRadius="lg">
      <MKBox
        component="img"
        src={image}
        alt={activityName}
        borderRadius="lg"
        shadow="md"
        width="100%"
        position="relative"
        zIndex={1}
      />
      <MKBox
        borderRadius="lg"
        shadow="md"
        width="100%"
        height="100%"
        position="absolute"
        left={0}
        top={0}
        sx={{
          backgroundImage: `url(${image})`,
          transform: "scale(0.44)",
          filter: "blur(12px)",
          backgroundSize: "cover",
        }}
      />
    </MKBox>
  );

  return (
    <Grid item xs={12} sm={6} lg={3}>
      <Card
        sx={{
          background: "transparent",
          boxShadow: "none",
          overflow: "visible",
        }}
      >
        <ActivityDetails
          modalOpen={showModal}
          toggleModal={toggleModal}
          image={image}
          activityName={activityName}
          shotsMade={shotsMade}
          shotsAttempted={shotsAttempted}
        />
        {imageTemplate}
        <MKBox pt={2} pb={3}>
          <MKTypography variant="h5" gutterBottom sx={cardActionStyles}>
            {activityName}
          </MKTypography>
          <MKTypography variant="body2" component="p" color="text" sx={cardActionStyles}>
            Shots Made: {shotsMade}
          </MKTypography>

          <MKTypography variant="body2" component="p" color="text" sx={cardActionStyles}>
            Shots Attempted: {shotsAttempted}
          </MKTypography>
          <MKBox sy={5} sx={5}>
            <MKButton
              onClick={toggleModal}
              variant="gradient"
              fontWeight="regular"
              color="info"
            >
              Details
              <Icon sx={{ fontWeight: "bold" }}>arrow_forward</Icon>
            </MKButton>
          </MKBox>
        </MKBox>
      </Card>
    </Grid>
  );
}

// Typechecking props for the TransparentBlogCard
ActivityTile.propTypes = {
  image: PropTypes.string.isRequired,
  activityName: PropTypes.string.isRequired,
  shotsMade: PropTypes.number,
  shotsAttempted: PropTypes.number,
};

export default ActivityTile;
