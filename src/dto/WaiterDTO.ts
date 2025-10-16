export interface UpdateWaiterDTO {
  uuid?: string;
  code: number;
  firstName: string;
  lastName: string;
}

export interface CreateWaiterDTO {
  code: number;
  firstName: string;
  lastName: string;
}
