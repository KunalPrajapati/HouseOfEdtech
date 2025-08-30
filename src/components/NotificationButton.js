import React, { useState, useRef } from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    Animated,
} from 'react-native';

export default function NotificationButton({ title, onPress, icon, color }) {
    const [loading, setLoading] = useState(false);
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePress = async () => {
        Animated.sequence([
            Animated.timing(scaleAnim, {
                toValue: 0.95,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            }),
        ]).start();

        setLoading(true);
        await onPress();
        setTimeout(() => setLoading(false), 1000);
        
    };

    return (
        <Animated.View
            style={[
                styles.container,
                { backgroundColor: color, transform: [{ scale: scaleAnim }] },
            ]}
        >
            <TouchableOpacity
                style={styles.button}
                onPress={handlePress}
                disabled={loading}
                activeOpacity={0.8}
            >
                {loading ? (
                    <ActivityIndicator size="small" color="#000" />
                ) : (
                    <>
                        <Text style={styles.icon}>{icon}</Text>
                        <Text style={styles.text}>{title}</Text>
                    </>
                )}
            </TouchableOpacity>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 5,
        borderRadius: 12,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    button: {
        backgroundColor: '#fff',
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        minHeight: 52,
        borderWidth: 1,
        borderColor: 'rgba(33, 150, 243, 0.4)',
    },
    disabledButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    icon: {
        fontSize: 20,
        marginRight: 10,
    },
    text: {
        color: '#000',
        fontSize: 16,
        fontWeight: '600',
    },
    disabledText: {
        color: 'rgba(255, 255, 255, 0.5)',
    },
    loadingContainer: {
        marginRight: 10,
    },
});