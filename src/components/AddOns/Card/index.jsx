/* eslint-disable arrow-body-style */
/* eslint-disable prettier/prettier */
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import classes from './style.module.scss';

const Card = ({ name, desc, price, duration, isSelected, handleClick }) => {

  return (
    <div className={`${classes.card} ${isSelected ? classes.selected : ''}`} onClick={handleClick}>
      <div className={classes.card_left}>
        <input type="checkbox" checked={isSelected} onChange={() => {}} />
        <div className={classes.card_subleft}>
          <h3>{name}</h3>
          <p>
            <FormattedMessage id={desc} />
          </p>
        </div>
      </div>
      <div className={classes.price}>
        +${price}/{duration === "monthly" ? (<FormattedMessage id='app_duration_mo' />) : (<FormattedMessage id='app_duration_yr' />)}
      </div>
    </div>
  )
}

Card.propTypes = {
  name: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  duration: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
}

export default Card;