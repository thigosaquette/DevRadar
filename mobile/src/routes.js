import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Main from './pages/Main'
import Profile from './pages/Profile'

const AppStack = createStackNavigator();

const headerOptions={
    title: "DevRadar", 
    headerTitleAlign : 'center',
    headerTintColor : '#FFF',
    headerStyle : {
        backgroundColor : '#7d40e7'
        }
    }

export default function Routes() {
    return(
        <NavigationContainer>
            <AppStack.Navigator>
                <AppStack.Screen 
                    name="Main" 
                    component={Main}
                    options={{...headerOptions, title : 'DevRadar'}}
                />
                <AppStack.Screen 
                    name="Profile" 
                    component={Profile}
                    options={{...headerOptions, title : 'Perfil do Github'}}/>
            </AppStack.Navigator>
        </NavigationContainer>
    );
}