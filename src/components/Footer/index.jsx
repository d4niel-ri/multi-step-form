/* eslint-disable prettier/prettier */
/* eslint-disable arrow-body-style */
/* eslint-disable jsx-a11y/label-has-associated-control */
import PropTypes from "prop-types";
import { Button } from "@mui/material";
import { FormattedMessage } from "react-intl";

import classes from "./style.module.scss";

const Footer = ({ isLastStep, handleClickPrev, handleClickNext }) => {
    
  return (
    <footer>
      <div className={classes.content}>
        {handleClickPrev && (
          <Button variant="text" onClick={handleClickPrev} className={classes.back}>
            <FormattedMessage id='app_go_back' />
          </Button>
        )}

        <Button variant="contained" onClick={handleClickNext} className={classes.next}>
          {isLastStep ? 
            (<FormattedMessage id='app_confirm' />) : 
            (<FormattedMessage id='app_next_step' />)
          }
        </Button>
      </div>
    </footer>
  )  
}

Footer.propTypes = {
  isLastStep: PropTypes.bool,
  handleClickPrev: PropTypes.func,
  handleClickNext: PropTypes.func.isRequired,
};

export default Footer;

