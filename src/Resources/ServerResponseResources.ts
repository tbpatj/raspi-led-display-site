export interface ServerResponse {
  status: "success" | "error";
  message: string;
  code: number;
  data?: any;
}

export const clientFailureResponse: ServerResponse = {
  status: "error",
  message: "Client info was inncorrect",
  code: 422,
};

export const clientSuccessResponse: ServerResponse = {
  status: "success",
  message: "Client info passed was updated in client",
  code: 200,
};
