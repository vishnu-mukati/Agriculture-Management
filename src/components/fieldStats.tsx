import {
  Box,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/slices";
import { dataApi, workListApi } from "../store/apis/axiosInstance";
import { useEffect, useState } from "react";
import type { WorkItem } from "../types/auth";
import { addToWorkList, removeWorkList } from "../store/slices/fieldWorkSlice";
import { addToList } from "../store/slices/fieldsListSlice";

export const FieldStates = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState<WorkItem[]>([]);

  const fieldListData = useSelector(
    (state: RootState) => state.list.fieldsListData
  );

  const workListData = useSelector((state: RootState) => state.work.workList);
  const userEmail = useSelector((state: RootState) => state.auth.user?.email);

  const safeUserEmail: string | null = userEmail ?? null;

  useEffect(() => {
    if (!userEmail) return;
    getFields();
    const interval = setInterval(() => {
      getFields();
    }, 10000);
    return () => clearInterval(interval);
  }, [userEmail]);

  useEffect(() => {
    if (userEmail && fieldListData.length > 0) {
      getWork();

      const interval = setInterval(() => {
        getWork();
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [userEmail, fieldListData]);

  const getFields = async () => {
    try {
      const response1 = await dataApi.firebaseListGet(safeUserEmail);
      if (response1.data) {
        const fieldGetData = Object.keys(response1.data).map((id) => ({
          ...response1.data[id],
          id,
        }));
        dispatch(addToList(fieldGetData));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getWork = async () => {
    if (!safeUserEmail || fieldListData.length === 0) return;

    let allFieldWorkItems: WorkItem[] = [];

    for (const field of fieldListData) {
      try {
        const response2 = await workListApi.firebaseListGet(
          safeUserEmail,
          field.id
        );
        console.log(response2.data);
        if (response2.data) {
          const fieldWorkItems = Object.keys(response2.data).map((workId) => ({
            ...response2.data[workId],
            id: workId,
            fieldId: field.id,
          }));
          console.log(fieldWorkItems);
          allFieldWorkItems.push(...fieldWorkItems);
        }
      } catch (err) {
        console.error(err);
      }
    }
    setState(allFieldWorkItems);
    if (allFieldWorkItems.length > 0) {
      dispatch(addToWorkList(allFieldWorkItems));
    } else {
      dispatch(removeWorkList());
    }
  };

  const getTotalCostForField = (fieldId: string) => {
    return workListData
      .filter((work) => work.fieldId === fieldId)
      .reduce((acc, work) => acc + work.cost, 0);
  };

  return (
    <Box>
      <Typography variant="h1" color="black">
        Hii this is the stats
      </Typography>

      <Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>S.No</TableCell>
                <TableCell>Fields</TableCell>
                <TableCell>Field Total Cost</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fieldListData.length > 0 ? (
                fieldListData.map((field, id) => (
                  <TableRow key={field.id}>
                    <TableCell>{id + 1}</TableCell>
                    <TableCell>{field.fieldName}</TableCell>
                    <TableCell>{getTotalCostForField(field.id)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell>
                    <Typography variant="h6">No Data Available</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};
