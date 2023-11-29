import React, { forwardRef, useImperativeHandle } from "react";
import emailjs from "emailjs-com";

const ContactUs = forwardRef(({ userId, points, item }, ref) => {
  useImperativeHandle(ref, () => ({
    sendEmail() {
      const templateParams = {
        user_id: userId,
        points_amount: points,
        item_name: item,
        // other parameters
      };

      emailjs
        .send(
          "service_x2d8ryc",
          "bJSWFmn0jK5aVMiTh",
          templateParams,
          "bJSWFmn0jK5aVMiTh"
        )
        .then(
          (result) => {
            console.log(result.text);
            // handle success
          },
          (error) => {
            console.log(error.text);
            // handle error
          }
        );
    },
  }));
});

export default ContactUs;
