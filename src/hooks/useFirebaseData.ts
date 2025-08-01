import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dataApi, workListApi } from "../store/apis/axiosInstance";
import { addToList } from "../store/slices/fieldsListSlice";
import { addToWorkList, removeWorkList } from "../store/slices/fieldWorkSlice";
import type { RootState } from "../store/slices";
import type { WorkItem } from "../types/auth";

export const useFirebaseData = () => {

  const dispatch = useDispatch();

  const fieldListData = useSelector(
    (state: RootState) => state.list.fieldsListData
  );

  const userEmail = useSelector((state: RootState) => state.auth.user?.email);
  const safeUserEmail: string | null = userEmail ?? null;

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userEmail) return;
    getFields();
    const interval = setInterval(() => {
      getFields();
    }, 35000);
    return () => clearInterval(interval);
  }, [userEmail]);

  useEffect(() => {
    if (userEmail && fieldListData.length > 0) {
      getWork();
      const interval = setInterval(() => {
        getWork();
      }, 21000);
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
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Error fetching fields");
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
        if (response2.data) {
          const fieldWorkItems = Object.keys(response2.data).map((workId) => ({
            ...response2.data[workId],
            id: workId,
            fieldId: field.id,
          }));
          allFieldWorkItems.push(...fieldWorkItems);
        }
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Error fetching work data");
      }
    }

    if (allFieldWorkItems.length > 0) {
      dispatch(addToWorkList(allFieldWorkItems));
    } else {
      dispatch(removeWorkList());
    }
  };
    return { error, setError };
};

