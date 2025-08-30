import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';

export default function VideoControls({
    status,
    onPlayPause,
    onSeek,
    onSkip,
    onMute,
    onFullscreen,
}) {
    const progress = status.durationMillis
        ? status.positionMillis / status.durationMillis
        : 0;

    const formatTime = (millis) => {
        const totalSeconds = Math.floor(millis / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <View style={styles.container}>
            <View style={styles.progressContainer}>
                <Text style={styles.timeText}>
                    {formatTime(status.positionMillis || 0)}
                </Text>
                <Slider
                    style={styles.slider}
                    value={progress}
                    onSlidingComplete={onSeek}
                    minimumTrackTintColor="#2196F3"
                    maximumTrackTintColor="#666"
                    thumbTintColor="#2196F3"
                />
                <Text style={styles.timeText}>
                    {formatTime(status.durationMillis || 0)}
                </Text>
            </View>

            <View style={styles.controlsRow}>
                <TouchableOpacity
                    style={styles.controlButton}
                    onPress={() => onSkip(-10)}
                >
                    <Ionicons name="play-back" size={15} color="#fff" />
                    <Text style={styles.skipText}>10</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.controlButton, styles.playButton]}
                    onPress={onPlayPause}
                >
                    <Ionicons 
                        name={status.isPlaying ? 'pause' : 'play'} 
                        size={20} 
                        color="#fff" 
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.controlButton}
                    onPress={() => onSkip(10)}
                >
                    <Ionicons name="play-forward" size={15} color="#fff" />
                    <Text style={styles.skipText}>10</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.controlButton} onPress={onMute}>
                    <Ionicons 
                        name={status.isMuted ? 'volume-mute' : 'volume-high'} 
                        size={15} 
                        color="#fff" 
                    />
                </TouchableOpacity>

                <TouchableOpacity style={styles.controlButton} onPress={onFullscreen}>
                    <Ionicons name="expand" size={15} color="#fff" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(3, 7, 18, 0.9)',
        padding: 10,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    slider: {
        flex: 1,
        height: 40,
        marginHorizontal: 10,
    },
    timeText: {
        color: '#ffffff',
        fontSize: 14,
        minWidth: 45,
        fontWeight: '500',
    },
    controlsRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    controlButton: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        padding: 10,
        marginHorizontal: 8,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 49,
        minHeight: 40,
        borderRadius: 22,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    playButton: {
        backgroundColor: 'rgba(33, 150, 243, 0.3)',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: 'rgba(33, 150, 243, 0.5)',
    },
    controlText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    skipText: {
        color: '#ffffff',
        fontSize: 12,
        fontWeight: '500',
    },
});