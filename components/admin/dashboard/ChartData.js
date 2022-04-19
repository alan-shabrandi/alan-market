import { ListItem, Typography } from "@material-ui/core";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";

const ChartData = ({ summary }) => {
  ChartJS.register(...registerables);

  return (
    <>
      <ListItem>
        <Typography component="h1" variant="h1">
          جدول فروش
        </Typography>
      </ListItem>
      <ListItem>
        <Bar
          data={{
            labels: summary.salesData.map((x) => x._id),
            datasets: [
              {
                label: "فروش",
                backgroundColor: "rgba(162, 222, 208, 1)",
                data: summary.salesData.map((x) => x.totalSales),
              },
            ],
          }}
          options={{
            legend: { display: true, position: "left" },
          }}
        ></Bar>
      </ListItem>
    </>
  );
};

export default ChartData;
