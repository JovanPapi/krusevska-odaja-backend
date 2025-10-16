export enum HTTPStatusCode {
  OK = 200, // success (default for GET, PUT, DELETE if successful).
  CREATED = 201, // resource successfully created (POST).
  NO_CONTENT = 204, // success but nothing to return (often DELETE).
  BAD_REQUEST = 400, // invalid client input (missing fields, wrong format).
  UNAUTHORIZE = 401, // invalid or missing authentication (e.g. JWT token).
  FORBIDDEN = 403, // authentication ok, but not enough permissions.
  NOT_FOUND = 404, // resource doesn’t exist.
  CONFLICT = 409, // resource already exists
  INTERNAL_SERVER_ERROR = 500, // unexpected server issue.
}
