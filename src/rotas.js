import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './telas/Login';
import Cadastro from './telas/Cadastro';
import Principal from './telas/Principal';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createNativeStackNavigator()

export default function Rotas() {
    return(
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Login" component={Login} options={{ headerShown: false }}/>
                <Tab.Screen name="Cadastro" component={Cadastro} />
                <Tab.Screen name="Principal" component={Principal} options={{ headerShown: false }}/>
            </Tab.Navigator>
            <StatusBar style="auto" />
        </NavigationContainer>
    )    
}
