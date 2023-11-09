/* eslint-disable prettier/prettier */
/* eslint-disable arrow-body-style */
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { FormattedMessage } from "react-intl";

import { setStep } from "@pages/Home/actions";

import ThankYouImage from "@static/images/icon-thank-you.svg";
import classes from "./style.module.scss";

const ThankYou = () => {
  const dispatch = useDispatch();

  return (
    <div className={classes.thank_you}>
      <div className={classes.content}>
        <div className={classes.image}>
          <img src={ThankYouImage} alt="Thank You" />
        </div>
        <h2><FormattedMessage id='app_thank_you' /></h2>
        <div className={classes.message}>
          <FormattedMessage id='app_thank_you_desc' />
        </div>
        <Button variant="contained" className={classes.btn} onClick={() => dispatch(setStep(3))}>
          Go Back
        </Button>
      </div>
    </div>
  )
}

export default ThankYou;
