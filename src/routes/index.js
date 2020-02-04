import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Home from '../pages/Home';
import StudentNew from '../pages/Student/New';

const Routes = createAppContainer(
  createStackNavigator({
    Home: {
      screen: Home,
      navigationOptions: {
        headerTitle: 'Lista de estudantes',
      }
    },
    StudentNew: {
      screen: StudentNew,
      navigationOptions: {
        headerTitle: 'Dados do estudante',
      }
    }
  })
);

export default Routes;