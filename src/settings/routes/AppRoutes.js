import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from '../../screens/auth/Login';
import ForgotPassword from '../../screens/auth/ForgotPassword';
import EmailVerify from '../../screens/auth/EmailVerify';
import RedefinePassword from '../../screens/auth/RedefinePassword';
import CreateAccount from '../../screens/auth/CreateAccount';
import { RouteKeys } from './RouteActions';
import InsertMedicalRecord from '../../screens/doctor/InsertMedicalRecord';
import TabNavigationDoctor from './TabNavigationDoctor';
import TabNavigationPatient from './TabNavigationPatient';
import SelectClinic from '../../screens/patient/SelectClinic';
import SelectDoctor from '../../screens/patient/SelectDoctor';
import SelectDate from '../../screens/patient/SelectDate';
import SeeAppointmentLocalScreen from '../../screens/patient/SeeAppointmentLocalScreen';
import MedicalRecord from '../../screens/patient/MedicalRecord';
import ScanExamsScreen from '../../screens/patient/ScanExamsScreen';
import { AppColors } from '../AppColors';
import { Flex } from '../AppEnums';
import { FontFamily } from '../AppFonts';

const Stack = createNativeStackNavigator();

export default function AppRoutes() {

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>

                <Stack.Screen
                    name={RouteKeys.loginScreen}
                    component={Login} />
                <Stack.Screen
                    name={RouteKeys.tabNavigationDoctor}
                    component={TabNavigationDoctor} />
                <Stack.Screen
                    name={RouteKeys.tabNavigationPatient}
                    component={TabNavigationPatient} />
                <Stack.Screen
                    name={RouteKeys.seeAppointmentLocalScreen}
                    component={SeeAppointmentLocalScreen} />



                <Stack.Screen
                    name={RouteKeys.medicalRecordScreen}
                    component={MedicalRecord} />

                <Stack.Screen
                    options={{
                        headerShown: true,
                        title: 'ESCANEAR EXAME',
                        headerTitleAlign: Flex.center,

                        headerTitleStyle: {
                            fontFamily: FontFamily.montSerratBold,
                            fontSize: 16
                        },
                        animation: "fade"
                    }}
                    name={RouteKeys.scanExamsScreen}
                    component={ScanExamsScreen} />


                <Stack.Screen
                    name={RouteKeys.selectDateScreen}
                    component={SelectDate} />

                <Stack.Screen
                    name={RouteKeys.selectDoctorScreen}
                    component={SelectDoctor} />

                <Stack.Screen
                    name={RouteKeys.selectClinicScreen}
                    component={SelectClinic} />

                <Stack.Screen
                    name={RouteKeys.forgotPassword}
                    component={ForgotPassword} />

                <Stack.Screen
                    name={RouteKeys.emailVerify}
                    component={EmailVerify} />

                <Stack.Screen
                    name={RouteKeys.redefinePassword}
                    component={RedefinePassword} />

                <Stack.Screen
                    name={RouteKeys.createAccount}
                    component={CreateAccount} />

                <Stack.Screen
                    name={RouteKeys.insertMedicalRecordScreen}
                    component={InsertMedicalRecord} />

            </Stack.Navigator>
        </NavigationContainer>
    )
}



