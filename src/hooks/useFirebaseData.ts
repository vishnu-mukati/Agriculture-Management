import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dataApi, workListApi } from "../store/apis/axiosInstance";
import { addToList } from "../store/slices/fieldsListSlice";
import { addToWorkList, removeWorkList } from "../store/slices/fieldWorkSlice";
import type { RootState } from "../store/slices";
import type { WorkItem } from "../types/auth";

export const useFirebaseData = () => {
  const dispatch = useDispatch();
  const userEmail = useSelector((state: RootState) => state.auth.user?.email);
  const fieldListData = useSelector((state: RootState) => state.list.fieldsListData);

  useEffect(() => {
    if (!userEmail) return;

    const getFields = async () => {
      try {
        const response = await dataApi.firebaseListGet(userEmail);
        if (response.data) {
          const data = Object.keys(response.data).map((id) => ({
            ...response.data[id],
            id,
          }));
          dispatch(addToList(data));
        }
      } catch (err) {
        console.error(err);
      }
    };

    getFields();
    const interval = setInterval(getFields, 35000);
    return () => clearInterval(interval);
  }, [userEmail]);

  useEffect(() => {
    if (!userEmail || fieldListData.length === 0) return;

    const getWork = async () => {
      let allWorks: WorkItem[] = [];
      for (const field of fieldListData) {
        try {
          const response = await workListApi.firebaseListGet(userEmail, field.id);
          if (response.data) {
            const works = Object.keys(response.data).map((id) => ({
              ...response.data[id],
              id,
              fieldId: field.id,
            }));
            allWorks.push(...works);
          }
        } catch (err) {
          console.error(err);
        }
      }

      if (allWorks.length > 0) {
        dispatch(addToWorkList(allWorks));
      } else {
        dispatch(removeWorkList());
      }
    };

    getWork();
    const interval = setInterval(getWork, 21000);
    return () => clearInterval(interval);
  }, [userEmail, fieldListData]);
};
