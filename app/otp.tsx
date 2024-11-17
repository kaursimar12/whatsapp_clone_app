import { StyleSheet, Text, View, KeyboardAvoidingView, Platform, Linking, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { useRouter } from 'expo-router'
import Colors from '@/constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import MaskInput from 'react-native-mask-input';
import { isClerkAPIResponseError, useSignIn, useSignUp } from '@clerk/clerk-expo'

const otp = () => {
    const [loading, setLoading] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const router = useRouter();
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 90 : 0;
    const { bottom } = useSafeAreaInsets();
    const { signUp, setActive } = useSignUp();
    const { signIn } = useSignIn();

    const IND_PHONE = ['+', '9', '1', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, /\d/];

    const openLink = () => {
        Linking.openURL('https://galaxies.dev')
    }

    const sendOTP = async () => {
        setLoading(true);
        try {
            await signUp!.create({
                phoneNumber
            });

            signUp!.preparePhoneNumberVerification();

            router.push(`/verify/${phoneNumber}`);
        } catch (err) {
            console.log(err);
            if (isClerkAPIResponseError(err)) {
                if (err.errors[0].code === 'form_identifier_exists') {
                    console.log('user exists');
                    await trySignIn();
                } else {
                    setLoading(false);
                    Alert.alert('Error', err.errors[0].message);
                }
            }
        }
    };

    const trySignIn = async () => {
        console.log('trySignIn', phoneNumber);

        const { supportedFirstFactors } = await signIn!.create({
            identifier: phoneNumber,
        });

        const firstPhoneFactor: any = supportedFirstFactors?.find((factor: any) => {
            return factor.strategy === 'phone_code';
        });

        const { phoneNumberId } = firstPhoneFactor;

        await signIn!.prepareFirstFactor({
            strategy: 'phone_code',
            phoneNumberId,
        });

        router.push(`/verify/${phoneNumber}?signin=true`);
        setLoading(false);
    };

    return (
        <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={keyboardVerticalOffset} style={{ flex: 1 }}>
            <View style={styles.container}>
                {loading && (
                    <View style={[StyleSheet.absoluteFill, styles.loading]}>
                        <ActivityIndicator size="large" color={Colors.primary} />
                        <Text style={styles.loadingText}>Sending Code...</Text>
                    </View>
                )}
                <Text style={styles.description}>
                    WhatsApp will need to verify your account. Carrier charges may apply.
                </Text>

                <View style={styles.list}>
                    <View style={styles.listItem}>
                        <Text style={styles.listItemText}>India</Text>
                        <Ionicons name="chevron-forward" size={20} color={Colors.gray} />
                    </View>
                    <View style={styles.seperator}></View>

                    <MaskInput
                        value={phoneNumber}
                        keyboardType='numeric'
                        autoFocus
                        style={styles.input}
                        onChangeText={(masked, unmasked) => {
                            setPhoneNumber(masked);
                        }}
                        mask={IND_PHONE}
                    />
                </View>

                <Text style={styles.legal}>You must be{' '}
                    <Text style={styles.link} onPress={openLink}>at least 16 years old</Text>
                    {' '}to register. Learn how WhatsApp works with the {' '}
                    <Text style={styles.link} onPress={openLink}>Meta Companies</Text>
                    .
                </Text>

                <View style={{ flex: 1 }}></View>

                <TouchableOpacity style={[styles.button, phoneNumber != '' ? styles.enabled : null, { marginBottom: bottom }]} disabled={phoneNumber === ''} onPress={sendOTP}>
                    <Text style={[styles.buttonText, phoneNumber != '' ? styles.enabled : null]}>Next</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default otp

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.background,
        padding: 20
    },
    description: {
        fontSize: 14,
        marginBottom: 20
    },
    list: {
        backgroundColor: '#fff',
        width: '100%',
        borderRadius: 10,
        padding: 10
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 6,
        marginBottom: 10
    },
    listItemText: {
        fontSize: 18,
        color: Colors.primary
    },
    seperator: {
        width: '100%',
        height: 1,
        backgroundColor: Colors.gray,
        opacity: 0.2
    },
    legal: {
        fontSize: 12,
        textAlign: 'center',
        color: '#000',
    },
    link: {
        color: Colors.primary
    },
    button: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: Colors.lightGray,
        padding: 10,
        borderRadius: 10
    },
    enabled: {
        backgroundColor: Colors.primary,
        color: '#fff'
    },
    buttonText: {
        color: Colors.gray,
        fontSize: 22,
        fontWeight: '500'
    },
    input: {
        backgroundColor: '#fff',
        width: '100%',
        fontSize: 16,
        padding: 6,
        marginTop: 10,

    },
    loading: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 10,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    loadingText: {
        padding: 10,
        fontSize: 18,
    }
});
