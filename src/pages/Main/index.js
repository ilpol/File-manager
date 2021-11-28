import React from "react";
import "./styles.css";
import PageLayout from '../../shared';
import { MainSection } from './components'
import store from '../../store/index';
import { Provider } from 'react-redux';

const Main = () => {
  return (
    <Provider store={store}>
      <PageLayout>
        <MainSection />
      </PageLayout>
      </Provider>
  );
}

export default Main;
