/* eslint-disable arrow-body-style */
/* eslint-disable prettier/prettier */
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import classes from './style.module.scss';

const PricingOptionCard = ({ image, name, price, duration, isSelected, onClick }) => {
  const drtStr = duration === "monthly" ? "app_duration_mo" : "app_duration_yr";

  return (
    <div className={`${classes.pricing_option_card} ${isSelected ? classes.selected : ''}`} 
      onClick={onClick}
    >
      <div className={classes.image}>
        <img src={image} alt={name} />
      </div>

      <div className={classes.desc}>
        <h3>{name}</h3>
        <p>${price}/<FormattedMessage id={drtStr}/></p>
        {duration === "yearly" && (
          <div className={classes.free}>
            <FormattedMessage id='app_select_2_months_free' />
          </div>
        )}
      </div>
    </div>
  );
};

PricingOptionCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  duration: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default PricingOptionCard;
