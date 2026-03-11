import { Resend } from "resend";
import { bookingConfirmationTemplate } from "../templates/bookingConfirmationEmail.js";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendBookingConfirmation = async (data) => {

  const html = bookingConfirmationTemplate(data);

  await resend.emails.send({
    from: "StyleVault <bookings@stylevault.store>",
    to: data.customerEmail,
    subject: "Your appointment has been confirmed",
    html
  });

};