/*
=========================================================
* Material Kit 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Kit 2 React components
import MKBox from "../../components/MKBox";
import MKTypography from "../../components/MKTypography";
import MKButton from "../../components/MKButton";

// Material Kit 2 React examples
import DefaultNavbar from "../../examples/Navbars/DefaultNavbar";
// About Us page sections
import FriendList from "./FriendList";

// Routes
import routes from "../../routes";
import Footer from "../../layouts/sections/page-sections/footers/Footer";

// Images
import bgImage from "../../assets/images/bg-about-us.jpg";
import fire from "./fire";
import loggedInRoute from "../../loggedInRoute";
import loggedOutRoute from "../../loggedOutRoute";
import React, {useEffect} from "react";
import {child, get, getDatabase, ref} from "firebase/database";

class Friends extends React.Component{

  //   constructor(props) {
  //     super(props);
  //     this.state = {}
  //   }
  //
  //   componentDidMount() {
  //     if (fire.auth().currentUser) {
  //       const uid = fire.auth().currentUser.uid;
  //       const dbRef = ref(getDatabase());
  //
  //       // const sessionRefs = ref(db, 'users/'+uid+'/sessions');
  //       get(child(dbRef, "users/" + uid + "/friends")).then((snapshot) => {
  //         let friendList = {};
  //         if (snapshot.exists()) {
  //           Object.entries(snapshot.val()).forEach(function (value, index) {
  //             const friendId = value[1];
  //             get(child(dbRef, "users/" + friendId + "/info")).then((snapshot2) => {
  //               friendList[friendId] = snapshot2.val();
  //               // console.log(friendList);
  //               this.setState({
  //                 friends: friendList
  //               })
  //               //   if ('friends' in this.state) {
  //               //     this.setState({
  //               //       friends: {
  //               //         friendId: snapshot2.val()
  //               //       }
  //               //     })
  //               //   } else {
  //               //     let newFriends = this.state.friends;
  //               //     newFriends[friendId] = snapshot2.val()
  //               //     this.setState({
  //               //       friends: newFriends
  //               //     })
  //               //   }
  //               // });
  //             })
  //             // this.state.friends = friendList
  //           })
  //         } else {
  //           console.log("No data available");
  //         }
  //       }).catch((error) => {
  //         console.error(error);
  //       });
  //     }
  // }

  render() {
    return (
      <>
        <DefaultNavbar
          // routes={routes.concat(fire.auth().currentUser ? loggedInRoute : loggedOutRoute)}
          routes={routes}
          transparent
          light
        />
        <MKBox
          minHeight="75vh"
          width="100%"
          sx={{
            backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
              `${linearGradient(
                rgba(gradients.dark.main, 0.6),
                rgba(gradients.dark.state, 0.6)
              )}, url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "grid",
            placeItems: "center",
          }}
        >
          <Container>
            <Grid
              container
              item
              xs={12}
              lg={8}
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              sx={{ mx: "auto", textAlign: "center" }}
            >
              <MKTypography
                variant="h1"
                color="white"
                sx={({ breakpoints, typography: { size } }) => ({
                  [breakpoints.down("md")]: {
                    fontSize: size["3xl"],
                  },
                })}
              >
                Friend List
              </MKTypography>
              <MKTypography variant="body1" color="white" opacity={0.8} mt={1} mb={3}>
                Friends make this game so much more fun! View your list of friends below,
                and click the button to add new friends.
              </MKTypography>
              <MKButton color="warning" sx={{ color: ({ palette: { dark } }) => dark.main }} size="large">
                Add New Friend
              </MKButton>
            </Grid>
          </Container>
        </MKBox>
        <Card
          sx={{
            p: 2,
            mx: { xs: 2, lg: 3 },
            mt: -8,
            mb: 4,
            boxShadow: ({ boxShadows: { xxl } }) => xxl,
          }}
        >
          {/*{console.log(this.state)}*/}
          <FriendList/>
        </Card>
        <Footer/>
        </>
    );

  }
}

export default Friends;
