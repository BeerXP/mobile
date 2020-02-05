import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TextInput } from 'react-native';
import { Button, Input, SocialIcon } from "react-native-elements";

import Animated, { Easing } from 'react-native-reanimated';
import { TapGestureHandler, State } from 'react-native-gesture-handler';

import { AccessToken, LoginManager } from "react-native-fbsdk";

import { firebase } from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
import analytics from '@react-native-firebase/analytics';

const { width, height } = Dimensions.get('window');

const {
    Value,
    event,
    block,
    cond,
    eq,
    set,
    Clock,
    startClock,
    stopClock,
    debug,
    timing,
    clockRunning,
    interpolate,
    Extrapolate,
    concat
} = Animated;

function runTiming(clock, value, dest) {
    const state = {
        finished: new Value(0),
        position: new Value(0),
        time: new Value(0),
        frameTime: new Value(0)
    };

    const config = {
        duration: 1000,
        toValue: new Value(0),
        easing: Easing.inOut(Easing.ease)
    };

    return block([
        cond(clockRunning(clock), 0, [
            set(state.finished, 0),
            set(state.time, 0),
            set(state.position, value),
            set(state.frameTime, 0),
            set(config.toValue, dest),
            startClock(clock)
        ]),
        timing(clock, state, config),
        cond(state.finished, debug('stop clock', stopClock(clock))),
        state.position
    ]);
}
class Login extends Component {

    //state object
    state = { isLoading: false, isFacebookLoading: false, email: "", password: "" };
    // const[isFacebookLoading, setIsFacebookLoading] = useState(false);

    constructor() {
        super();

        this.handleLogin = this.handleLogin.bind(this);
        this.facebookLogin = this.facebookLogin.bind(this);
        // this.onChange = this.onChange.bind(this);

        this.buttonOpacity = new Value(1);

        this.onStateChange = event([
            {
                nativeEvent: ({ state }) =>
                    block([
                        cond(
                            eq(state, State.END),
                            set(this.buttonOpacity, runTiming(new Clock(), 1, 0))
                        )
                    ])
            }
        ]);

        this.onCloseState = event([
            {
                nativeEvent: ({ state }) =>
                    block([
                        cond(
                            eq(state, State.END),
                            set(this.buttonOpacity, runTiming(new Clock(), 0, 1))
                        )
                    ])
            }
        ]);

        this.buttonY = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [100, 0],
            extrapolate: Extrapolate.CLAMP
        });

        this.bgY = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [-height / 3, 0],
            extrapolate: Extrapolate.CLAMP
        });

        this.textInputZindex = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [1, -1],
            extrapolate: Extrapolate.CLAMP
        });

        this.textInputY = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [0, 100],
            extrapolate: Extrapolate.CLAMP
        });

        this.textOpacity = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [1, 0],
            extrapolate: Extrapolate.CLAMP
        });

        this.rotateCross = interpolate(this.buttonOpacity, {
            inputRange: [0, 1],
            outputRange: [180, 360],
            extrapolate: Extrapolate.CLAMP
        });
    }


    handleLogin() {
        this.setState({ isLoading: true });
        // TODO: Firebase stuff...
        auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                //Grava o evento de Login no Analytics
                analytics().logLogin({
                    method: 'email',
                });
                if (credential) {
                    console.log("default app user ->", credential.user.toJSON());
                }
                // Clear out the fields when the user logs in and hide the progress indicator.
                this.setState({ email: "", password: "" });
                // setEmail("");
                // setPassword("");
                //natigate to Main
                navigation.navigate("Main");
            })
            .catch(error => {
                this.setState({ error: error.message });
                // setErrorMessage(error.message);
            }).finally(() => this.setState({ isLoading: false }));
    };

    // Calling the following function will open the FB login dialogue:
    async facebookLogin() {
        // When waiting for the firebase server show the loading indicator.
        this.setState({ isFacebookLoading: true });
        // setIsFacebookLoading(true);
        try {
            // Login with permissions
            const result = LoginManager.logInWithPermissions(['public_profile', 'email']);

            if (result.isCancelled) {
                throw new Error('User cancelled the login process');
            }

            console.log(
                "Login success with permissions: " + `${result.grantedPermissions.toString()}`
            );

            // get the access token
            const data = await AccessToken.getCurrentAccessToken();

            if (!data) {
                throw new Error(
                    "Something went wrong obtaining the users access token"
                ); // Handle this however fits the flow of your app
            }

            // create a new firebase credential with the token
            const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);

            // login with credential
            const currentUser = await auth()
                .signInWithCredential(credential)
                .then(() => {
                    this.setState({ isFacebookLoading: true });
                    //Grava o evento de SignUp Facebook no Analytics
                    analytics().logLogin({
                        method: 'facebook.com',
                    });
                    analytics().logSignUp({
                        method: 'facebook.com',
                    });

                    //Navega para a tela principal
                    navigation.navigate("Main");
                    // Clear out the fields when the user logs in and hide the progress indicator.
                })
                .catch(error => {
                    // Leave the fields filled when an error occurs and hide the progress indicator.
                    setErrorMessage(error.message);
                }).finally(() => this.setState({ isFacebookLoading: false }));;
        } catch (e) {
            console.error(e);
        }
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: 'white',
                    justifyContent: 'flex-end'
                }}
            >
                <Animated.View
                    style={{
                        ...StyleSheet.absoluteFill,
                        transform: [{ translateY: this.bgY }]
                    }}
                >
                    <Image
                        source={require('../../assets/beerXp_bg_splash.png')}
                        style={{ flex: 1, height: null, width: null }}
                    />
                </Animated.View>
                <View style={{ height: height / 3, justifyContent: 'center' }}>
                    {/* <TapGestureHandler onHandlerStateChange={this.onStateChange}>
                        <Animated.View
                            style={{
                                ...styles.buttonSignUp,
                                opacity: this.buttonOpacity,
                                transform: [{ translateY: this.buttonY }]
                            }}
                        >
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>CADASTRAR</Text>
                        </Animated.View>
                    </TapGestureHandler> */}
                    <TapGestureHandler onHandlerStateChange={this.onStateChange} >
                        <Animated.View
                            style={{
                                ...styles.button,
                                opacity: this.buttonOpacity,
                                transform: [{ translateY: this.buttonY }]
                            }}
                        >
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>ENTRAR</Text>
                        </Animated.View>
                    </TapGestureHandler>
                    <TapGestureHandler onHandlerStateChange={this.facebookLogin}>
                        <Animated.View
                            style={{
                                ...styles.button,
                                backgroundColor: '#2E71DC',
                                opacity: this.buttonOpacity,
                                transform: [{ translateY: this.buttonY }]
                            }}
                        >
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
                                SIGN IN WITH FACEBOOK
                            </Text>
                        </Animated.View>
                    </TapGestureHandler>
                    <Animated.View style={{ zIndex: this.textInputZindex, opacity: this.textOpacity, transform: [{ translateY: this.textInputY }], height: height / 3, ...StyleSheet.absoluteFill, top: null, justifyContent: 'center' }}>
                        <TapGestureHandler onHandlerStateChange={this.onCloseState}>
                            <Animated.View style={styles.closeButton}>
                                <Animated.Text style={{ fontSize: 15, transform: [{ rotate: concat(this.rotateCross, 'deg') }] }}>
                                    X
                                </Animated.Text>
                            </Animated.View>
                        </TapGestureHandler>
                        <TextInput
                            placeholder="E-mail"
                            autoCapitalize="none"
                            style={styles.textInput}
                            placeholderTextColor="black"
                            value={this.state.email}
                            onChangeText={email => this.setState({ email })}
                        />
                        <TextInput
                            secureTextEntry
                            placeholder="Senha"
                            style={styles.textInput}
                            placeholderTextColor="black"
                            value={this.state.password}
                            onChangeText={password => this.setState({ password })}
                        />
                        <TapGestureHandler onHandlerStateChange={this.handleLogin}>
                            <Animated.View style={styles.buttonSignUp} >
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }} disabled={this.state.isLoading}>
                                    ACESSAR
                                </Text>
                            </Animated.View>
                        </TapGestureHandler>
                    </Animated.View>
                    {/* <Animated.View style={{ zIndex: this.textInputZindex, opacity: this.textOpacity, transform: [{ translateY: this.textInputY }], height: height / 3, ...StyleSheet.absoluteFill, top: null, justifyContent: 'center' }}>
                        <TapGestureHandler onHandlerStateChange={this.onCloseState}>
                            <Animated.View style={styles.closeButton}>
                                <Animated.Text style={{ fontSize: 15, transform: [{ rotate: concat(this.rotateCross, 'deg') }] }}>
                                    X
                                </Animated.Text>
                            </Animated.View>
                        </TapGestureHandler>

                        <TextInput
                            placeholder="E-mail"
                            style={styles.textInput}
                            placeholderTextColor="black"
                        />
                        <TextInput
                            secureTextEntry
                            placeholder="Senha"
                            style={styles.textInput}
                            placeholderTextColor="black"
                        />
                        <TextInput
                            secureTextEntry
                            placeholder="Senha"
                            style={styles.textInput}
                            placeholderTextColor="black"
                        />
                        <Animated.View style={styles.button}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }} >
                                CADASTRAR
                            </Text>

                        </Animated.View>
                    </Animated.View> */}
                </View>
            </View >
        );
    }
}
export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        backgroundColor: 'white',
        height: 70,
        marginHorizontal: 20,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: 'black',
        shadowOpacity: 0.2
    },
    buttonSignUp: {
        backgroundColor: 'darkorange',
        height: 70,
        marginHorizontal: 20,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: 'black',
        shadowOpacity: 0.2
    },
    closeButton: {
        height: 40,
        width: 40,
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: -20,
        left: width / 2 - 20,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: 'black',
        shadowOpacity: 0.2
    },
    textInput: {
        height: 50,
        borderRadius: 25,
        borderWidth: 0.5,
        marginHorizontal: 20,
        marginVertical: 5,
        paddingLeft: 10,
        // borderColor: 'rgba(0, 0, 0, 0, 2)'
    },
});