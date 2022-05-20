import React from "react";
import { ResponsiveBar } from "@nivo/bar";

function WeekBarChart(props) {
  let data = props.data
    .sort((a, b) => (a.day < b.day ? -1 : a.day > b.day ? 1 : 0))
    .slice(props.data.length - 7);

  let today = new Date().setHours(new Date().getHours() + 9);
  for (let i = 0; i < 7; i += 1) {
    const refDay = new Date(
      new Date().setDate(new Date(today).getDate() - 6 + i)
    );
    const year = refDay.getFullYear();
    const month = `0${refDay.getMonth() + 1}`.slice(-2);
    const day = `0${refDay.getDate() - 1}`.slice(-2);
    const dateString = `${year}-${month}-${day}`;
    const exist = data.findIndex((i) => i.day === dateString);
    if (exist === -1) {
      data.push({
        day: dateString,
        value: 0,
      });
    }
  }
  const result = data
    .sort((a, b) => (a.day < b.day ? -1 : a.day > b.day ? 1 : 0))
    .slice(data.length - 7);
  const keys = ["value"];
  const commonProps = {
    margin: { top: 60, right: 80, bottom: 60, left: 80 },
    data: result,
    indexBy: "day",
    keys,
    padding: 0.3,
    labelTextColor: "#ffffff",
    labelSkipWidth: 16,
    labelSkipHeight: 16,
    colors: "#073113",
  };
  if (Array.isArray(props.data)) {
    return (
      <div style={{ height: 350 }}>
        <ResponsiveBar {...commonProps} />
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default WeekBarChart;
