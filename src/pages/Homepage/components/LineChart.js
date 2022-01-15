import React from "react";
import Chart from "react-apexcharts"
import MKBox from "../../../components/MKBox";

class LineChart extends React.Component {
        constructor(props) {
          super(props);

          this.state = {

            series: [{
                name: "Percent Made",
                data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
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
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                title: {
                  text: "Date"
                }
              },
              yaxis: {
                title: {
                  text: "Shooting percentage"
                }
              }
            },


          };
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
