export interface ServerResponse {
  status: "success" | "error";
  message: string;
  code: number;
  data?: any;
}
