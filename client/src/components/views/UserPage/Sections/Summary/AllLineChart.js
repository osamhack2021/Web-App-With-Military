import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function AllLineChart(props) {
  if (Array.isArray(props.data)) {
    return (
      <LineChart
        width={500}
        height={300}
        data={props.data.sort((a, b) =>
          a.day < b.day ? -1 : a.day > b.day ? 1 : 0
        )}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    );
  } else {
    return <div></div>;
  }
}

export default AllLineChart;
