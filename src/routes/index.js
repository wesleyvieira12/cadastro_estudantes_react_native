import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Home from '../pages/Home';
import StudentRegister from '../pages/Student/Register';
import StudentShow from '../pages/Student/Show';

import HeaderTitle from  '../components/HeaderTitle';

const Routes = createAppContainer(
  createStackNavigator({
    Home: {
      screen: Home,
      navigationOptions: {
        headerTitle: () => <HeaderTitle/>
      }
    },
    StudentRegister: {
      screen: StudentRegister,
      navigationOptions: {
        headerTitle: 'Cadastro',
      }
    },
    StudentShow: {
      screen: StudentShow,
      navigationOptions: {
        headerTitle: 'Dados do estudante',
      }
    }
  })
);

export default Routes;