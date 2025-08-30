import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

// Configure notification handler
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowBanner: true,
        shouldShowList: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

class NotificationService {
    constructor() {
        this.notificationListener = null;
        this.responseListener = null;
        this.navigation = null;
    }

    setNavigation(navigation) {
        this.navigation = navigation;
    }

    async initialize() {
        // Request permissions
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== 'granted') {
            console.log('Notification permissions not granted');
            return false;
        }

        // Get push token for physical devices
        if (Device.isDevice) {
            const token = await this.registerForPushNotificationsAsync();
            console.log('Push token:', token);
        }

        // Set up notification listeners
        this.setupListeners();

        return true;
    }

    async registerForPushNotificationsAsync() {
        let token;

        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;

            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }

            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }

            token = (await Notifications.getExpoPushTokenAsync({
                projectId: Constants.expoConfig.extra.eas.projectId,
            })).data;
        }

        return token;
    }

    setupListeners() {
        // Handle notifications when app is in foreground
        this.notificationListener = Notifications.addNotificationReceivedListener(
            notification => {
                console.log('Notification received:', notification);
            }
        );

        // Handle notification taps
        this.responseListener = Notifications.addNotificationResponseReceivedListener(
            response => {
                console.log('Notification tapped:', response);
                const data = response.notification.request.content.data;

                // Navigate to video player if specified in notification data
                if (data?.screen === 'VideoPlayer' && this.navigation) {
                    this.navigation.navigate('VideoPlayer');
                }
            }
        );
    }

    async scheduleNotification(title, body, seconds, data = {}) {
        try {
            // If navigation is passed in data, store it temporarily
            if (data.navigation) {
                this.setNavigation(data.navigation);
                // Remove navigation from data to avoid serialization issues
                const { navigation, ...cleanData } = data;
                data = cleanData;
            }

            const notificationId = await Notifications.scheduleNotificationAsync({
                content: {
                    title,
                    body,
                    data,
                    sound: true,
                    priority: Notifications.AndroidNotificationPriority.HIGH,
                    badge: 1,
                },
                trigger: {
                    seconds,
                },
            });

            console.log(`Notification scheduled: ${notificationId}`);
            return notificationId;
        } catch (error) {
            console.error('Error scheduling notification:', error);
            return null;
        }
    }

    async cancelAllNotifications() {
        await Notifications.cancelAllScheduledNotificationsAsync();
    }

    cleanup() {
        if (this.notificationListener) {
            Notifications.removeNotificationSubscription(this.notificationListener);
        }
        if (this.responseListener) {
            Notifications.removeNotificationSubscription(this.responseListener);
        }
    }
}

export default new NotificationService();