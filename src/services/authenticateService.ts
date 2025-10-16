import AdminDTO from "../dto/AdminDTO";
import ServiceResponseDTO from "../dto/ServiceResponseDTO";
import { HTTPStatusCode } from "../enum/HTTPStatusCode";
import { Admin } from "../models/Admin";
import { generateToken } from "../utils/jwt";

/** Service method that logs in a user.
 * If credentials are valid, it will generate a JWT.
 *
 * @return {Promise<ServiceResponseDTO>} - DTO that contains statusCode and message of the operation.
 */
export async function login(
  credentials: AdminDTO
): Promise<ServiceResponseDTO> {
  try {
    const user = await Admin.findOne({
      where: { ...credentials },
    });

    if (user === null) {
      return {
        statusCode: HTTPStatusCode.UNAUTHORIZE,
        message: "User not found.",
      };
    }

    const token = generateToken({ ...user });
    return { statusCode: HTTPStatusCode.OK, message: token };
  } catch (error) {
    console.error("Error while authorizing:", error);
    return {
      statusCode: HTTPStatusCode.INTERNAL_SERVER_ERROR,
      message: "Error while authorizing.",
    };
  }
}
