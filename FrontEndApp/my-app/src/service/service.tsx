import axios from "axios";
import { endpoint } from "./config";

//question 1 below line
//q2 export const url = env.REACT_APP_API_URL;

export const login = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  try {
    const reqBody = {
      username: username,
      password: password,
    };
    const res = await axios.post(`${endpoint.url}`, reqBody);
    //const res = await axios.get(`${endpoint.url}`)
    return res.data;
  } catch (err) {
    return err;
  }
};

export const getPrograms = async () => {
  try {
    // const token = localStorage.getItem("token"); // adapt key if different
    // const headers: Record<string, string> = {};
    // if (token) headers["Authorization"] = `Bearer ${token}`;

    const res = await axios.post(`${endpoint.programList}`);
    console.log("Dataa", res);
    return res.data;
  } catch (err) {
    return err;
  }
};

export const getProjectList = async (id: string) => {
  try {
    // const token = localStorage.getItem("token"); // adapt key if different
    // const headers: Record<string, string> = {};
    // if (token) headers["Authorization"] = `Bearer ${token}`;

    const res = await axios.get(`${endpoint.projectList}/${id}/project`);
    console.log("Dataa", res);
    return res.data;
  } catch (err) {
    return err;
  }
};

export const getBulkUploadData = async (req: any) => {
  try {
    const res = await axios.post(`${endpoint.bulkUploadData}`, req);
    return res.data;
  } catch (error) {
    throw error;
  }
};
