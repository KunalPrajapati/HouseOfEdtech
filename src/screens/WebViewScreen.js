import React, { useState, useRef } from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    ActivityIndicator,
    Text,
} from 'react-native';
import { WebView } from 'react-native-webview';
import NotificationButton from '../components/NotificationButton';
import NotificationService from '../services/NotificationService';
import { WEBSITE_URL } from '../constants/config';

export default function WebViewScreen({ navigation }) {
    const [loading, setLoading] = useState(true);
    const webViewRef = useRef(null);

    const handleNotification1 = async () => {
        await NotificationService.scheduleNotification(
            'Welcome! 🎉',
            'You triggered the first notification successfully!',
            3
        );
    };

    const handleNotification2 = async () => {
        await NotificationService.scheduleNotification(
            'Video Ready 📺',
            'Your video is ready to play. Tap to open the video player!',
            5,
            { screen: 'VideoPlayer', navigation }
        );
    };

    const handleWebViewLoad = async () => {
        setLoading(false);
        await NotificationService.scheduleNotification(
            'Page Loaded ✅',
            'The website has finished loading successfully!',
            1
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.webViewContainer}>
                {loading && (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size={40} color="#2196F3" />
                        <Text style={styles.loadingText}>Loading website...</Text>
                    </View>
                )}
                <WebView
                    ref={webViewRef}
                    source={{ uri: WEBSITE_URL }}
                    style={styles.webView}
                    onLoadEnd={handleWebViewLoad}
                    onLoadStart={() => setLoading(true)}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    startInLoadingState={true}
                    scalesPageToFit={true}
                />
            </View>
            
            <View style={styles.buttonContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <NotificationButton
                        title="Welcome Notification"
                        onPress={handleNotification1}
                        style={styles.notificationButton}
                    />
                    <NotificationButton
                        title="Video Player Notification"
                        onPress={handleNotification2}
                        style={styles.notificationButton}
                    />
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#030712',
    },
    webViewContainer: {
        flex: 1,
        position: 'relative',
    },
    webView: {
        flex: 1,
    },
    loadingContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(3, 7, 18, 0.9)',
        zIndex: 1,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#ffffff',
    },
    buttonContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255, 255, 255, 0.1)',
        maxHeight: 100,
    },
    notificationButton: {
        marginRight: 10,
    },
});