import { Response } from "../instances/response.instance";

type ResponseObject = {
  success: boolean;
  message: string | object;
  status: number;
  data?: any;
  error?: any;
};

export const response = {
  success: (res: any, status: number, message: string, data?: any) => {
    const response: ResponseObject = {
      success: true,
      message,
      status: status,
    };
    if (data) response.data = data;
    res.status(status).json(response);
  },
  //   validation: (
  //     res: any,
  //     status: number,
  //     msg: [] | string | object,
  //     data?: any
  //   ) => {
  //     const response: Response = {
  //       success: true,
  //       message: { validation: msg },
  //       status: status,
  //     };
  //     if (data) {
  //       const parsedData = JSON.parse(data);
  //       response.data = parsedData;
  //     }
  //     res.status(status).json(response);
  //   },
  fail: (
    res: any,
    status: number,
    error: string = "",
    message: string = "Error"
  ) => {
    const response: ResponseObject = {
      success: false,
      message: message,
      status: status,
      error: error,
    };
    res.status(status).json(response);
  },
  internal: (
    res: any,
    status: number,
    message: string = "Internal Error",
    error: any
  ) => {
    const response: ResponseObject = {
      success: false,
      message,
      status: status,
      error,
    };
    res.status(status).json(response);
  },
};
