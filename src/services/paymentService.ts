import { Payment } from "../models/Payment";
import { Waiter } from "../models/Waiter";

/**
 * Service function that retrieves all payments made by waiters.
 *
 * @return {Promise<Payment[]>} - List of payments
 */
export function fetchPayments(): Promise<Payment[]> {
  return Payment.findAll({
    include: [
      { model: Waiter, as: "waiter", attributes: ["firstName", "lastName"] },
    ],
  });
}
