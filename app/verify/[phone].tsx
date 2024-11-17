import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native'
import { Stack, useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import Colors from '@/constants/Colors'
import React from 'react'
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
  } from 'react-native-confirmation-code-field';
  import { isClerkAPIResponseError, useSignIn, useSignUp } from '@clerk/clerk-expo'

  const CELL_COUNT = 6;


const Page = () => {

    const  { phone, signin } = useLocalSearchParams<{phone: string, signin: string}>();
      console.log('signin value:', signin);  // Ensure that signin is exactly "true"
      console.log('phone value:', phone);
    const [code, setCode] = useState('');
    const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
      value: code,
      setValue: setCode,
    });
    const { signUp, setActive } = useSignUp();
    const { signIn } = useSignIn();

    useEffect(() => {
        if (code.length === 6) {
          if (signin === 'true') {
            VerifySignIn();
          } else {
            verifyCode();
          }
        }
      }, [code]);

      const verifyCode = async () => {
        try {
          await signUp!.attemptPhoneNumberVerification({
            code,
          });
    
          await setActive!({ session: signUp!.createdSessionId });
        } catch (err) {
          console.log('error', JSON.stringify(err, null, 2));
          if (isClerkAPIResponseError(err)) {
            Alert.alert('Error', err.errors[0].message);
          }
        }
      };
    
      const VerifySignIn = async () => {
        try {
          await signIn!.attemptFirstFactor({
            strategy: 'phone_code',
            code,
          });
    
          await setActive!({ session: signIn!.createdSessionId });
        } catch (err) {
          console.log('error', JSON.stringify(err, null, 2));
          if (isClerkAPIResponseError(err)) {
            Alert.alert('Error', err.errors[0].message);
          }
        }
      };
    
      const resendCode = async () => {
        try {
          if (signin === 'true') {
            const { supportedFirstFactors } = await signIn!.create({
              identifier: phone,
            });
    
            const firstPhoneFactor: any = supportedFirstFactors?.find((factor: any) => {
              return factor.strategy === 'phone_code';
            });
    
            const { phoneNumberId } = firstPhoneFactor;
    
            await signIn!.prepareFirstFactor({
              strategy: 'phone_code',
              phoneNumberId,
            });
          } else {
            await signUp!.create({
              phoneNumber: phone,
            });
            signUp!.preparePhoneNumberVerification();
          }
        } catch (err) {
          console.log('error', JSON.stringify(err, null, 2));
          if (isClerkAPIResponseError(err)) {
            Alert.alert('Error', err.errors[0].message);
          }
        }
      };

      
  return (
    <View style={styles.container}>
    <Stack.Screen options={{headerTitle: phone}} />
    <Text style={styles.legal}>We have sent you an SMS with a code to the number above.</Text>
    <Text style={styles.legal}>To complete your phone number verification, please enter the 6-digit activation cod.</Text>


    <CodeField
      ref={ref}
      {...props}
      // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
      value={code}
      onChangeText={setCode}
      cellCount={CELL_COUNT}
      rootStyle={styles.codeFieldRoot}
      keyboardType="number-pad"
      textContentType="oneTimeCode"
      // autoComplete={Platform.select({ android: 'sms-otp', default: 'one-time-code' })}
      testID="my-code-input"
      renderCell={({index, symbol, isFocused}) => (
        <View
          key={index}
          style={[styles.cellRoot, isFocused && styles.focusCell]}
          onLayout={getCellOnLayoutHandler(index)}>
          <Text style={styles.cellText}>{symbol || (isFocused ? <Cursor/> : null)}</Text>
        </View>
      )}
    />

    <TouchableOpacity style={styles.button} onPress={resendCode}>
      <Text style={styles.buttonText}>Didn't receive a verification code?</Text>
    </TouchableOpacity>
  </View>
  )
}

export default Page

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:20,
        gap:20,
        alignItems:'center',
        backgroundColor:Colors.background
      },
      loading:{
        backgroundColor:'rgba(0,0,0,0.5)',
        alignItems:'center',
        justifyContent:'center'
      },
      legal:{
        fontSize: 14,
        textAlign:'center',
        color:'#000',
    },
    button:{
      width:'100%',
      alignItems:'center',
  },
    enabled:{
        backgroundColor:Colors.primary,
        color:'#fff'
    },
    buttonText:{
        color:Colors.primary,
        fontSize:18,
    },
    codeFieldRoot:{
      marginTop: 20,
      width: 260,
      marginLeft: 'auto',
      marginRight: 'auto',
      gap: 8,
    },
    cellRoot:{
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems:'center',
      borderBottomColor: '#ccc',
      borderBottomWidth: 1,
    },
    cellText:{
      color:'#000',
      fontSize: 36,
      textAlign:'center'
    },
    focusCell:{
      paddingBottom:4,
      borderBottomColor: '#000',
      borderBottomWidth: 2
    }
    // root: {flex: 1, padding: 20},
    // title: {textAlign: 'center', fontSize: 30},
    // codeFieldRoot: {marginTop: 20},
    // cell: {
    //   width: 40,
    //   height: 40,
    //   lineHeight: 38,
    //   fontSize: 24,
    //   borderWidth: 2,
    //   borderColor: '#00000030',
    //   textAlign: 'center',
    // },
    // focusCell: {
    //   borderColor: '#000',
    // },
})