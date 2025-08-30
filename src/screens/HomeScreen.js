import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NotificationButton from '../components/NotificationButton';
import NotificationService from '../services/NotificationService';

export default function HomeScreen({ navigation }) {
    const handleWelcomeNotification = async () => {
        await NotificationService.scheduleNotification(
            'Welcome! 🎉',
            'You triggered the welcome notification successfully!',
            3
        );
    };

    const handleVideoNotification = async () => {
        await NotificationService.scheduleNotification(
            'Video Ready 📺',
            'Your video is ready to play. Tap to open the video player!',
            5,
            { screen: 'VideoPlayer', navigation }
        );
    };

    const handleTestNotification = async () => {
        await NotificationService.scheduleNotification(
            'Test Notification 🔔',
            'This is a test notification to verify the system is working!',
            2
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>House of EdTech</Text>
                    <Text style={styles.subtitle}>Assignment Demo App</Text>
                </View>

                {/* Navigation Cards */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Navigate to Screens</Text>

                    <TouchableOpacity
                        style={styles.navigationCard}
                        onPress={() => navigation.navigate('WebView')}
                    >
                        <View style={styles.cardIcon}>
                            <Ionicons name="globe-outline" size={32} color="#2196F3" />
                        </View>
                        <View style={styles.cardContent}>
                            <Text style={styles.cardTitle}>WebView Screen</Text>
                            <Text style={styles.cardDescription}>
                                Browse the House of EdTech website with notification features
                            </Text>
                        </View>
                        <Ionicons name="chevron-forward" size={24} color="#666" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.navigationCard}
                        onPress={() => navigation.navigate('VideoPlayer')}
                    >
                        <View style={styles.cardIcon}>
                            <Ionicons name="play-circle-outline" size={32} color="#FF5722" />
                        </View>
                        <View style={styles.cardContent}>
                            <Text style={styles.cardTitle}>Video Player</Text>
                            <Text style={styles.cardDescription}>
                                Watch HLS video streams with custom controls
                            </Text>
                        </View>
                        <Ionicons name="chevron-forward" size={24} color="#666" />
                    </TouchableOpacity>
                </View>

                {/* Notification Controls */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Notification Controls</Text>
                    <Text style={styles.sectionDescription}>
                        Test the notification system with different types of notifications
                    </Text>

                    <View style={styles.notificationGrid}>
                        <NotificationButton
                            title="Welcome to House of EdTech"
                            onPress={handleWelcomeNotification}
                            icon="🎉"
                            color="#fff"
                        />
                        <NotificationButton
                            title="Video Ready"
                            onPress={handleVideoNotification}
                            icon="📺"
                            color="#fff"
                        />
                        <NotificationButton
                            title="Test Alert"
                            onPress={handleTestNotification}
                            icon="🔔"
                            color="#fff"
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#030712',
    },
    scrollContent: {
        padding: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
        paddingVertical: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 18,
        color: '#ffffff',
        opacity: 0.8,
        textAlign: 'center',
    },
    section: {
        marginBottom: 40,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 20,
        textAlign: 'center',
    },
    sectionDescription: {
        fontSize: 15,
        color: '#ffffff',
        opacity: 0.7,
        marginBottom: 20,
        textAlign: 'center',
        lineHeight: 20,
    },
    navigationCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        padding: 20,
        borderRadius: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    cardIcon: {
        marginRight: 18,
    },
    cardContent: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#ffffff',
        marginBottom: 8,
    },
    cardDescription: {
        fontSize: 15,
        color: '#ffffff',
        opacity: 0.7,
        lineHeight: 20,
    },
    notificationGrid: {
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        padding: 20,
        borderRadius: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    featureText: {
        fontSize: 18,
        color: '#ffffff',
        marginLeft: 18,
        fontWeight: 'bold',
    },
});