/* eslint-disable arrow-body-style */
/* eslint-disable prettier/prettier */
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectStep } from '@pages/Home/selectors';

import sidebarDesktopBG from '@static/images/bg-sidebar-desktop.svg';
import sidebarMobileBG from '@static/images/bg-sidebar-mobile.svg';
import classes from './style.module.scss';


const Sidebar = ({ activeStep }) => {
  const stepNames = ["app_your_info", "app_select_plan", "app_add_ons", "app_summary"];
  const activeStepProcessed = activeStep > 3 ? 3 : activeStep;

  return (
    <div className={classes.sidebar}>
      <div className={classes.image}>
        <img src={sidebarDesktopBG} alt="Sidebar" className={classes.img_desktop} />
        <img src={sidebarMobileBG} alt="Sidebar" className={classes.img_mobile} />
      </div>
      <div className={classes.content}>
        {stepNames.map((stepName, idx) => (
          <div className={classes.each_step} key={idx}>
            <div className={`${classes.point} ${activeStepProcessed === idx ? classes.active : ""}`}>{idx + 1}</div>
            <div className={classes.step_desc}>
              <div className={classes.step_number}>
                <FormattedMessage id="app_step" /> {idx + 1}
              </div>
              <div className={classes.step_name}>
                <FormattedMessage id={stepName} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

Sidebar.propTypes = {
  activeStep: PropTypes.number.isRequired,
};

const mapStateToProps = createStructuredSelector({
  activeStep: selectStep,
})

export default connect(mapStateToProps)(Sidebar);