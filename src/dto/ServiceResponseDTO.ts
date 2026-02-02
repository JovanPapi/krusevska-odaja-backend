import { Admin } from "../models/Admin";

export default interface ServiceResponseDTO {
  statusCode: number;
  message?: string;
  data?: { user: Admin; token: string };
}
