import { useState } from "react";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// Material Kit 2 React components
import MKBox from "../MKBox";
import MKButton from "../MKButton";

import PropTypes from 'prop-types'

function Dropdown(props) {
  const [dropdown, setDropdown] = useState(null);

  const openDropdown = ({ currentTarget }) => setDropdown(currentTarget);
  const closeDropdown = () => {
    setDropdown(null);
    console.log(dropdown);
  }


  // Styles
  const iconStyles = {
    ml: 1,
    fontWeight: "bold",
    transition: "transform 200ms ease-in-out",
  };

  const dropdownIconStyles = {
    transform: dropdown ? "rotate(180deg)" : "rotate(0)",
    ...iconStyles,
  };


  return (
    <MKBox component="section" py={1}>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6} textAlign="center">
            <MKButton variant="gradient" color="info" onClick={openDropdown}>
              {props.title} <Icon sx={dropdownIconStyles}>expand_more</Icon>
            </MKButton>
            <Menu anchorEl={dropdown} open={Boolean(dropdown)} onClose={closeDropdown}>
              {props.items.map((item, id) => {
                  return (<MenuItem key={id} href={props.cb(item)} onClick={closeDropdown}>{item}</MenuItem>);
              })}
              {/*<MenuItem href={props.cb("test")} onClick={closeDropdown}>Action</MenuItem>*/}
              {/*<MenuItem onClick={closeDropdown}>Another action</MenuItem>*/}
              {/*<MenuItem onClick={closeDropdown}>Something else here</MenuItem>*/}
            </Menu>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

Dropdown.propTypes = {
  items: PropTypes.array,
  title: PropTypes.string
};

export default Dropdown;
