/* eslint-disable prettier/prettier */
/* eslint-disable arrow-body-style */
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import { FormattedMessage } from 'react-intl';

import { selectMainPrices, selectPlanDuration, selectPlanType } from '@pages/Home/selectors';
import PricingOptionCard from '@components/SelectPlan/PricingOptionCard';
import { setPlanDuration, setPlanType, setStep } from '@pages/Home/actions';
import Footer from '@components/Footer';

import arcadeImage from "@static/images/icon-arcade.svg";
import advancedImage from "@static/images/icon-advanced.svg";
import proImage from "@static/images/icon-pro.svg";
import classes from "./style.module.scss";

const SelectPlan = ({ planType, planDuration, prices }) => {
  const options = [
    { image: arcadeImage, name: 'arcade', price: prices[planDuration].arcade },
    { image: advancedImage, name: 'advanced', price: prices[planDuration].advanced },
    { image: proImage, name: 'pro', price: prices[planDuration].pro },
  ];

  const dispatch = useDispatch();

  const handleOptionSelect = (name) => {
    dispatch(setPlanType(name));
  };

  const handleToggle = (event) => {
    if (event.target.checked) {
      dispatch(setPlanDuration('yearly'));
      options.forEach((option) => ({...option, price: prices.yearly[option.name]}));   

    } else {
      dispatch(setPlanDuration('monthly'));
      options.forEach((option) => ({...option, price: prices.monthly[option.name]})) 
    }
  };

  const handleClickPrev = () => {
    dispatch(setStep(0));
  }

  const handleClickNext = () => {
    dispatch(setStep(2));
  }

  return (
    <div className={classes.form_plan}>
      <div className={classes.content}>
        <h2>
          <FormattedMessage id='app_select_your_plan' />
        </h2>
        <p>
          <FormattedMessage id='app_select_your_plan_desc' />
        </p>

        <div className={classes.options}>
          {options.map((option) => (
            <PricingOptionCard
              key={option.name}
              image={option.image}
              name={option.name}
              price={option.price}
              duration={planDuration}
              isSelected={planType === option.name}
              onClick={() => handleOptionSelect(option.name)}
            />
          ))}
        </div>

        <div className={classes.duration}>
          <p className={planDuration === 'monthly' ? classes.selected : ''}>
            <FormattedMessage id='app_monthly' />
          </p>
          <IOSSwitch sx={{ m: 1 }}
            checked={planDuration === 'yearly'}
            onChange={handleToggle}
            inputProps={{ 'aria-label': 'controlled' }}
          />
          <p className={planDuration === 'yearly' ? classes.selected : ''}>
            <FormattedMessage id='app_yearly' />
          </p>
        </div>
      </div>
      <Footer handleClickPrev={handleClickPrev} handleClickNext={handleClickNext} /> 
    </div>
  )
}

SelectPlan.propTypes = {
  planType: PropTypes.string.isRequired,
  planDuration: PropTypes.string.isRequired,
  prices: PropTypes.object.isRequired,
}

const mapStateToProps = createStructuredSelector({
  planType: selectPlanType,
  planDuration: selectPlanDuration,
  prices: selectMainPrices,
})

export default connect(mapStateToProps)(SelectPlan);

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 50,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(24px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        // backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
        backgroundColor: '#39393D',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));