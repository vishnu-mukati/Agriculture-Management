import { useSelector } from 'react-redux';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import  type{ RootState }  from '../../store/slices';



const data = [
  { name: 'Field A', profit: 4000, cost: 2400 },
  { name: 'Field B', profit: 3000, cost: 1398 },
  { name: 'Field C', profit: 2000, cost: 9800 },
];

export const FieldProfitChart = () => { 
   

    
      const fieldListData = useSelector(
        (state: RootState) => state.list.fieldsListData
      );
      const workListData = useSelector(
        (state: RootState) => state.work.workList
      );
    
      console.log(fieldListData);
      console.log(workListData);
      



    return (
       <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="profit" fill="#4CAF50" name="Profit" />
        <Bar dataKey="cost" fill="#F44336" name="Cost" />
      </BarChart>
    </ResponsiveContainer>
  )
}
