/* eslint-disable prettier/prettier */
/* eslint-disable arrow-body-style */
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect, useDispatch } from "react-redux";
import { createStructuredSelector } from "reselect";

import { setPlanAddOns, setStep } from "@pages/Home/actions";
import { selectAddOnPrices, selectAddOns, selectPlanAddOns, selectPlanDuration } from "@pages/Home/selectors";
import Card from "@components/AddOns/Card";
import Footer from "@components/Footer";

import classes from "./style.module.scss";

const AddOns = ({ planDuration, planAddOns, addOnPrices, addOns }) => {
  const dispatch = useDispatch();

  const handleClick = (index) => {
    if (planAddOns.includes(index)) {
      dispatch(setPlanAddOns(planAddOns.filter((indexAddOns) => indexAddOns !== index)));
    } else {
      dispatch(setPlanAddOns([...planAddOns, index].sort()));
    }
  }

  const handleClickPrev = () => {
    dispatch(setStep(1));
  }

  const handleClickNext = () => {
    dispatch(setStep(3));
  }

  return (
    <div className={classes.form_add_ons}>
      <div className={classes.content}>
        <h2>
          <FormattedMessage id='app_pick_add' />
        </h2>
        <p>
          <FormattedMessage id='app_pick_add_desc' />
        </p>

        <div className={classes.checkboxes}>
          {addOns.map((addOn, idx) => (
            <Card 
              key={idx}
              name={addOn.name}
              desc={addOn.desc}
              price={addOnPrices[idx][planDuration]}
              duration={planDuration}
              isSelected={planAddOns.includes(idx)}
              handleClick={() => handleClick(idx)}
            />
          ))}
        </div>
      </div>
      <Footer handleClickPrev={handleClickPrev} handleClickNext={handleClickNext} />
    </div>
  )
}

AddOns.propTypes = {
  planDuration: PropTypes.string.isRequired,
  planAddOns: PropTypes.array.isRequired,
  addOnPrices: PropTypes.array.isRequired,
  addOns: PropTypes.array.isRequired,
}

const mapStateToProps = createStructuredSelector({
  planDuration: selectPlanDuration,
  planAddOns: selectPlanAddOns,
  addOnPrices: selectAddOnPrices,
  addOns: selectAddOns,
})

export default connect(mapStateToProps)(AddOns);
