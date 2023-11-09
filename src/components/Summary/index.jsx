/* eslint-disable prettier/prettier */
/* eslint-disable arrow-body-style */
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';

import { setStep } from '@pages/Home/actions';
import Footer from '@components/Footer';
import { selectAddOnPrices, selectAddOns, selectMainPrices, selectPlanAddOns, selectPlanDuration, selectPlanType } from '@pages/Home/selectors';

import classes from "./style.module.scss";

const Summary = ({ planType, planDuration, planAddOns, mainPrices, addOnPrices, addOns }) => {
  const dispatch = useDispatch();
  const drtStr = planDuration === "monthly" ? "app_duration_mo" : "app_duration_yr";
  const durationStr = planDuration === "monthly" ? "app_month" : "app_year";
  const durationlyStr = planDuration === "monthly" ? "app_monthly" : "app_yearly";

  const mainPrice = mainPrices[planDuration][planType];
  const planAddOnPrices = planAddOns.map((planAddOn) => (addOnPrices[planAddOn][planDuration]));
  const totalAddOnPrices = planAddOnPrices.reduce(
    (accumulator, currentValue) => accumulator + currentValue, 0
  );
  const totalPrice = mainPrice + totalAddOnPrices;

  const handleClickPrev = () => {
    dispatch(setStep(2));
  }

  const handleClickNext = () => {
    dispatch(setStep(4));
  }

  return (
    <div className={classes.form_finishing}>
      <div className={classes.content}>
        <h2>
          <FormattedMessage id='app_finishing_up' />
        </h2>
        <p>
          <FormattedMessage id='app_finishing_up_desc' />
        </p>

        <div className={classes.receipt}>
          <div className={classes.main_receipt}>
            <div className={classes.main_left}>
              <h3>{planType} (<FormattedMessage id={durationlyStr} />)</h3>
              <div className={classes.change} onClick={() => dispatch(setStep(1))}>
                <FormattedMessage id='app_finishing_change' />
              </div>
            </div>
            <h3>${mainPrice}/<FormattedMessage id={drtStr} /></h3>
          </div>

          {planAddOns.length > 0 && (
            <>
              <hr/>
              <div className={classes.add_ons}>
                {planAddOns.map((planAddOn, idx) => (
                  <div key={planAddOn} className={classes.add_on}>
                    <div className={classes.name}>
                      {addOns[planAddOn].name}
                    </div>
                    <div className={classes.price}>
                      +${planAddOnPrices[idx]}/<FormattedMessage id={drtStr} />
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div className={classes.total}>
          <div className={classes.desc}>
            Total (per <FormattedMessage id={durationStr} />)
          </div>
          <div className={classes.price}>
            +${totalPrice}/<FormattedMessage id={drtStr} />
          </div>
        </div>
      </div>

      <Footer isLastStep handleClickPrev={handleClickPrev} handleClickNext={handleClickNext} />
    </div>
  )
};

Summary.propTypes = {
  planType: PropTypes.string.isRequired,
  planDuration: PropTypes.string.isRequired,
  planAddOns: PropTypes.array.isRequired,
  mainPrices: PropTypes.object.isRequired,
  addOnPrices: PropTypes.array.isRequired,
  addOns: PropTypes.array.isRequired,
}

const mapStateToProps = createStructuredSelector({
  planType: selectPlanType,
  planDuration: selectPlanDuration,
  planAddOns: selectPlanAddOns,
  mainPrices: selectMainPrices,
  addOnPrices: selectAddOnPrices,
  addOns: selectAddOns,
})

export default connect(mapStateToProps)(Summary);