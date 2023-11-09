/* eslint-disable prettier/prettier */
/* eslint-disable arrow-body-style */
/* eslint-disable jsx-a11y/label-has-associated-control */
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import { useState } from 'react';
import { createStructuredSelector } from 'reselect';

import Footer from '@components/Footer';
import { selectInfo } from '@pages/Home/selectors';
import { setInfo, setStep } from '@pages/Home/actions';

import classes from './style.module.scss';

const PersonalInfo = ({ info }) => {
  const [inputs, setInputs] = useState({
    name: info.name,
    email: info.email,
    phoneNumber: info.phoneNumber,
  });

  const [errors, setErrors] = useState({
    name: "", email: "", phoneNumber: ""
  });

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const validateName = () => {
    if (!inputs.name) {
      setErrors((prev) => ({...prev, name: "app_error_required"}));
      return false;
    }

    return true;
  }

  const validateEmail = () => {
    if (!inputs.email) {
      setErrors((prev) => ({...prev, email: "This field is required"}));
      return false;
    }

    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!emailRegex.test(inputs.email)) {
      setErrors((prev) => ({...prev, email: "Please fill an email address"}));
      return false;
    }

    return true;
  }

  const validatePhoneNumber = () => {
    if (!inputs.phoneNumber) {
      setErrors((prev) => ({...prev, phoneNumber: "This field is required"}));
      return false;
    }
    
    const phoneIndoRegex = /^08[1-9][0-9]{7,10}$/;
    if (!phoneIndoRegex.test(inputs.phoneNumber)) {
      setErrors((prev) => ({...prev, phoneNumber: "Please fill a phone number"}));
      return false;
    }

    return true;
  }

  const validateInputs = () => {
    if (!validateName() || !validateEmail() || !validatePhoneNumber()) {
      return false;
    }

    return true;
  }

  const handleClickNext = () => {
    setErrors({name: "", email: "", phoneNumber: ""});
    // eslint-disable-next-line no-useless-return
    if (!validateInputs()) return;
    
    dispatch(setInfo(inputs));
    dispatch(setStep(1));
  }

  return (
    <div className={classes.form_info}>
      <div className={classes.content}>
        <div>
          <h2>
            <FormattedMessage id="app_personal_info" />
          </h2>
          <p>
            <FormattedMessage id="app_personal_info_desc" />
          </p>
        </div>

        <form>
          <div className={classes.input}>
            <div className={classes.label}>
              <label htmlFor="name">
                <FormattedMessage id='app_info_name' />
              </label>
              {errors.name && (
                <p className={classes.error}>
                  <FormattedMessage id={errors.name} />
                </p>
              )}
            </div>
            <input 
              type="text" name="name" id="name" value={inputs.name} onChange={handleInputChange} 
              placeholder='e.g. Stephen King'  
            />
          </div>
          <div className={classes.input}>
            <div className={classes.label}>
              <label htmlFor="email">Email</label>
              {errors.email && (
                <p className={classes.error}>
                  {errors.email}
                </p>
              )
}
            </div>
            <input 
              type="text" name="email" id="email" value={inputs.email} onChange={handleInputChange} 
              placeholder='e.g. stephenking@lorem.com'  
            />
          </div>
          <div className={classes.input}>
            <div className={classes.label}>
              <label htmlFor="phoneNumber">
                <FormattedMessage id='app_info_phone' />
              </label>
              {errors.phoneNumber && (<p className={classes.error}>{errors.phoneNumber}</p>)}
            </div>
            <input 
              type="tel" name="phoneNumber" id="phoneNumber" value={inputs.phoneNumber} 
              onChange={handleInputChange} 
              placeholder='e.g. +1 234 567 890'  
            />
          </div>
        </form>
      </div>

      <Footer handleClickNext={handleClickNext} />
    </div>
  );
};

PersonalInfo.propTypes = {
  info: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  info: selectInfo,
})

export default connect(mapStateToProps)(PersonalInfo);
