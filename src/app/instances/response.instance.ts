export class ResponseInstance {
  success: boolean;
  message: string;
  status: number;
  data?: any;
  error?: any;

  constructor(
    success: boolean,
    message: string,
    status: number,
    data?: any,
    error?: any
  ) {
    this.success = success;
    this.message = message;
    this.status = status;
    this.data = data;
    this.error = error;
  }
}

export type Response = ResponseInstance;
