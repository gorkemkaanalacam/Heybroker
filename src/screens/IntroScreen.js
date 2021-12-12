import React, { useRef, useState } from 'react';
import { Button, View, StyleSheet, ImageBackground, Text, TouchableOpacity, KeyboardAvoidingView, Image } from 'react-native';
import { Video } from 'expo-av';

export default IntroScreen = ({ navigation }) => {
    const video = useRef(null);
    const [status, setStatus] = useState({});
    const [isVideoFinished, setIsVideoFinished] = useState(false);

    return (
        <View style={styles.container}>

            <Video
                source={{ uri: "https://res.cloudinary.com/dj2pv0omx/video/upload/v1639238077/WhatsApp_Video_2021-12-07_at_16.09.56_psoxot.mp4" }}
                style={styles.backgroundVideo}
                rate={1}
                shouldPlay={true}
                isLooping={false}
                volume={1}
                muted={false}
                resizeMode="cover"
                onPlaybackStatusUpdate={(playbackStatus) => playbackStatus.didJustFinish && setIsVideoFinished(true)}
            />

            <KeyboardAvoidingView behavior='padding' style={styles.container}>


                <View style={styles.loginContainer}>
                    {/* <View style={{ flexDirection: "row", marginTop: 90 }}>
                        <Text style={styles.balansfx}>Hey Brokers !</Text>
                        <Text style={styles.welcome}>Hoşgeldiniz</Text>
                    </View>

                    <Image
                        style={{ width: 150, height: 150, alignSelf: 'center', marginTop: 30 }}
                        source={require('../../assets/icon.png')}
                    /> */}
                    {/* <Text style={{ fontSize: 22, color: "#79A7CC", textAlign: "center", marginTop: 30 }}>Dünya borsaları, endeksler, coinler, döviz ve emita da haber, analiz ve eğitim paylaşımları için</Text> */}
                    {/* <Text style={{ fontSize: 16, color: "#ffffff", textAlign: "center", marginTop: 20 }}>Foreks, Kripto, Hisseler ve Endeksler</Text> */}
                    {
                        isVideoFinished &&
                        <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={{ alignItems: "center", marginTop: "auto", marginBottom: 40 }}>
                            <Text style={styles.joinbutton}>BAŞLA</Text>
                        </TouchableOpacity>}
                    {/* <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 20, marginBottom: 40 }}>
                        <Text style={{ fontSize: 15, color: "#ffffff", textAlign: "center", fontWeight: "500" }}>Hesabınız var mı? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={{ fontSize: 15, color: "#ffffff", textAlign: "center", fontWeight: "700", textDecorationLine: "underline" }}>Giriş Yap</Text>
                        </TouchableOpacity>
                    </View> */}
                </View>

            </KeyboardAvoidingView>
        </View>);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    loginContainer: {
        alignItems: 'center',
        flexGrow: 1,
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    text: {
        color: "grey",
        fontSize: 30,
        fontWeight: "bold"
    },
    welcome: {
        color: "#ffffff",
        fontSize: 28,
        fontWeight: "500"
    },
    balansfx: {
        color: "#79A7CC",
        fontSize: 28,
        fontWeight: "700"
    },
    joinbutton: {
        color: "#FFFFFF",
        backgroundColor: "#00d4ff",
        borderRadius: 5,
        width: 200,
        height: 50,
        fontSize: 16,
        fontWeight: "700",
        textAlign: "center",
        textAlignVertical: "center"
    }
});
