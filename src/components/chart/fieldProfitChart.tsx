import { useSelector } from "react-redux";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { RootState } from "../../store/slices";
import { Typography } from "@mui/material";



export const FieldProfitChart = () => {
  const fieldListData = useSelector(
    (state: RootState) => state.list.fieldsListData
  );
  const workListData = useSelector((state: RootState) => state.work.workList);

  const fieldCostList = fieldListData.map((field) => {
    const totalCost = workListData
      .filter((work) => work.fieldId === field.id)
      .reduce((sum, work) => sum + (work.cost || 0), 0);

    return {
      fieldName: field.fieldName,
      totalCost: totalCost,
      returnProfit : field.returnProfit,
    };
  });


const data = fieldCostList.map((item) => ({
  name: item.fieldName,
  profit: item.returnProfit || 0,
  cost: item.totalCost || 0,
}));

const isData = data.length>0;

  return (
    <ResponsiveContainer width="100%" height={400}>
      {isData ? 
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="profit" fill="#4CAF50" name="Profit" />
        <Bar dataKey="cost" fill="#F44336" name="Cost" />
      </BarChart>
      : <Typography>No Data Available</Typography>}
    </ResponsiveContainer>
  );
};
