import React from "react";
import Chart from "react-apexcharts"
import MKBox from "../../../components/MKBox";
import fire from "../../User/fire";
import {child, get, getDatabase, ref} from "firebase/database";

class LineChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

      series: [{
          name: "Percent Made",
          data: []
      }],
      options: {
        chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'straight'
        },
        title: {
          text: 'Your Shooting Point Average',
          align: 'left'
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          },
        },
        xaxis: {
          categories: [],
          title: {
            text: "Session Number"
          }
        },
        yaxis: {
          min: 0,
          max: 1,
          decimalsInFloat: 2,
          title: {
            text: "Shooting percentage"
          }
        }
      },


    };
  }


  componentDidMount() {
    if (fire.auth().currentUser) {
      const uid = fire.auth().currentUser.uid;
      const dbRef = ref(getDatabase());

      // const sessionRefs = ref(db, 'users/'+uid+'/sessions');
      get(child(dbRef, "users/" + uid + "/sessions")).then((snapshot) => {
        let newData = [];
        let sessionNums = [];
        if (snapshot.exists()) {
          Object.entries(snapshot.val()).forEach(function (value, index) {
            let attempts = 'shots' in value[1] ? value[1]['shots'] : 0;
            let points = 'points' in value[1] ? value[1]['points'] : 0;
            newData.push(attempts === 0 ? 0 : points/attempts);
            sessionNums.push(value[0]);
          });
          // console.log(newData);
          let newOptions = this.state.options;
          newOptions.xaxis.categories = sessionNums;
          this.setState({
            series: [{
                name: "Percent Made",
                data: newData
            }],
            options: newOptions
          });
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    } else {
      console.log("User not logged in")
    }
  }



		render() {
			return (

				<div id="chart">

          <MKBox
            sx={20}
            sy={20}
            p={5}
          >
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="line"
              height={350}
            />
          </MKBox>
				</div>
		);
	}
}

export default LineChart;
