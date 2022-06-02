import React, { FC, Component, PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList } from "recharts";
// umd/Recharts";
// import { scaleOrdinal } from 'd3-scale';
// import { schemeCategory10 } from 'd3-scale-chromatic';

interface ChartProps {
    width: any;
    height: any;
    data: any;
    color: any;

}

const LineChartComp: React.FC<ChartProps> = ({
    width,
    height,
    data,
    color
}) => {
    return (
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 10
        }}
      >
        <XAxis dataKey="date" domain={data.date} height={60} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line dataKey="dependent" stroke={"#FF94a7"}  />
        <Line dataKey="data" stroke={"#4589e4"}  />

        </LineChart>
    );
}

export default LineChartComp;