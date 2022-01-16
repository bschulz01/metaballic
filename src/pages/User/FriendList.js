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

// Material Kit 2 React components
import MKBox from "../../components/MKBox";
import MKTypography from "../../components/MKTypography";

// Material Kit 2 React examples
import HorizontalTeamCard from "../../examples/Cards/TeamCards/HorizontalTeamCard";

// Images
import team1 from "../../assets/images/team-5.jpg";
import team2 from "../../assets/images/bruce-mars.jpg";
import team3 from "../../assets/images/ivana-squares.jpg";
import team4 from "../../assets/images/ivana-square.jpg";
import tyler from "../../assets/images/friends/tyler.jpeg"
import james from "../../assets/images/friends/james.jpeg"
import aditya from "../../assets/images/friends/aditya.jpeg"
import pranav from "../../assets/images/friends/pranav.jpeg"

import fire from "./fire";
import {child, get, getDatabase, ref} from "firebase/database";
import {useState} from "react";

function FriendList() {

  // const [friendInfo, setFriendInfo] = useState([])

  const friends = [
    {
      img: james,
      name: "James Tseng",
      label: "Tofu Connoisseur",
      description: "One of the nicest guys out there"
    },
    {
      img: pranav,
      name: "Pranav Srinivasan",
      label: "Ideahacks Director",
      description: "He never fails to get me excited about sports"
    },
    {
      img: tyler,
      name: "Tyler Price",
      label: "Soldering Master",
      description: "He provides amazing tater tots for us"
    },
    {
      img: aditya,
      name: "Aditya Mishra",
      label: "Our resident RA",
      description: "He gets us hill food!"
    },

  ]
  // function getFriendInfo(id) {
  //   const dbRef = ref(getDatabase());
  //   get(child(dbRef, "users/" + id + "/info")).then((snapshot) => {
  //     setFriendInfo(snapshot.val())
  //   });
  // }

  // function loadData() {
  //   if (fire.auth().currentUser) {
  //     const uid = fire.auth().currentUser.uid;
  //     const dbRef = ref(getDatabase());
  //
  //     // const sessionRefs = ref(db, 'users/'+uid+'/sessions');
  //     get(child(dbRef, "users/" + uid + "/friends")).then((snapshot) => {
  //       let friendList = [];
  //       if (snapshot.exists()) {
  //         Object.entries(snapshot.val()).forEach(function (value, index) {
  //           console.log(value)
  //           friendList.push([value[1]]);
  //         })
  //       } else {
  //         console.log("No data available");
  //       }
  //       setFriends(friendList)
  //     }).catch((error) => {
  //       console.error(error);
  //     });
  //   }
  //
  //   console.log(friends);
  // }

  return (
    <MKBox
      component="section"
      variant="gradient"
      position="relative"
      py={6}
      px={{ xs: 2, lg: 0 }}
      mx={-2}
    >
      <Container>
        <Grid container>
          <Grid item xs={12} md={8} sx={{ mb: 6 }}>
            <MKTypography variant="body2" color="white" opacity={0.8}>
              There&apos;s nothing I really wanted to do in life that I wasn&apos;t able to get good
              at. That&apos;s my skill.
            </MKTypography>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          {friends.map((info, index) => {
            // getFriendInfo(id);
            // console.log(id, info);
            return (
            <Grid item xs={12} lg={6} id={index}>
              <MKBox mb={{ xs: 1, lg: 0 }}>
                <HorizontalTeamCard
                      image={info.img}
                      name={info.name}
                      position={{ color: "info", label: info.label}}
                      description={info.description}
                />
              </MKBox>
            </Grid>)
          })}
        </Grid>
      </Container>
    </MKBox>
  );
}

export default FriendList;
