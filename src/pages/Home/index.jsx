/* eslint-disable jsx-a11y/label-has-associated-control */
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import PersonalInfo from '@components/PersonalInfo';
import Sidebar from '@components/Sidebar';
import AddOns from '@components/AddOns';
import SelectPlan from '@components/SelectPlan';
import Summary from '@components/Summary';
import ThankYou from '@components/ThankYou';

import { ping } from '@containers/App/actions';
import { selectStep } from './selectors';

import classes from './style.module.scss';

const Home = ({ step }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ping());
  }, [dispatch]);

  return (
    <main>
      <div className={classes.container}>
        <Sidebar />
        <div className={classes.content}>
          {(() => {
            switch (step) {
              case 0:
                return <PersonalInfo />;
              case 1:
                return <SelectPlan />;
              case 2:
                return <AddOns />;
              case 3:
                return <Summary />;
              case 4:
                return <ThankYou />;
            }
          })()}
        </div>
      </div>
    </main>
  );
};

Home.propTypes = {
  step: PropTypes.number.isRequired,
};

const mapStateToProps = createStructuredSelector({
  step: selectStep,
});

export default connect(mapStateToProps)(Home);
