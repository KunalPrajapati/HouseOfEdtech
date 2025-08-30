import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView,
    Text,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    Alert,
} from 'react-native';
import { Video, ResizeMode } from 'expo-av';

import VideoControls from '../components/VideoControls';
import { VIDEO_STREAMS } from '../constants/config';

const { width: screenWidth } = Dimensions.get('window');

export default function VideoPlayerScreen() {
    const video = useRef(null);
    const [status, setStatus] = useState({});
    const [currentStreamIndex, setCurrentStreamIndex] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showControls, setShowControls] = useState(true);

    useEffect(() => {
        // Auto-hide controls after 3 seconds
        const timer = setTimeout(() => {
            if (status.isPlaying) {
                setShowControls(false);
            }
        }, 3000);

        return () => clearTimeout(timer);
    }, [status.isPlaying, showControls]);

    const handleStreamChange = async (index) => {
        if (index !== currentStreamIndex) {
            try {
                // Pause current video
                if (status.isPlaying) {
                    await video.current.pauseAsync();
                }
                
                // Update stream index
                setCurrentStreamIndex(index);
                
                // Load new stream
                await video.current.loadAsync(
                    { uri: VIDEO_STREAMS[index].url },
                    { shouldPlay: false }
                );
                
                console.log(`Switched to stream: ${VIDEO_STREAMS[index].name}`);
            } catch (error) {
                console.error('Error switching stream:', error);
                Alert.alert('Error', 'Failed to switch video stream');
            }
        }
    };

    const handlePlayPause = async () => {
        if (status.isPlaying) {
            await video.current.pauseAsync();
        } else {
            await video.current.playAsync();
        }
    };

    const handleSeek = async (value) => {
        const seekPosition = value * status.durationMillis;
        await video.current.setPositionAsync(seekPosition);
    };

    const handleSkip = async (seconds) => {
        const newPosition = status.positionMillis + (seconds * 1000);
        const clampedPosition = Math.max(0, Math.min(newPosition, status.durationMillis));
        await video.current.setPositionAsync(clampedPosition);
    };

    const handleMute = async () => {
        await video.current.setIsMutedAsync(!status.isMuted);
    };

    const handleFullscreen = async () => {
        try {
            if (!isFullscreen) {
                await video.current.presentFullscreenPlayer();
                setIsFullscreen(true);
            } else {
                await video.current.dismissFullscreenPlayer();
                setIsFullscreen(false);
            }
        } catch (error) {
            console.log('Fullscreen error:', error);
        }
    };

    const handleVideoPress = () => {
        setShowControls(!showControls);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={handleVideoPress}
                    style={styles.videoContainer}
                >
                    <Video
                        ref={video}
                        style={styles.video}
                        source={{ uri: VIDEO_STREAMS[currentStreamIndex].url }}
                        useNativeControls={false}
                        resizeMode={ResizeMode.CONTAIN}
                        isLooping
                        onPlaybackStatusUpdate={setStatus}
                        onFullscreenUpdate={async (status) => {
                            if (status.fullscreenUpdate) {
                                const isNowFullscreen = status.fullscreenUpdate === Video.FULLSCREEN_UPDATE_PLAYER_DID_PRESENT;
                                const wasFullscreen = status.fullscreenUpdate === Video.FULLSCREEN_UPDATE_PLAYER_DID_DISMISS;
                                
                                if (isNowFullscreen && !isFullscreen) {
                                    setIsFullscreen(true);
                                } else if (wasFullscreen && isFullscreen) {
                                    setIsFullscreen(false);
                                }
                            }
                        }}
                        shouldPlay={false}
                    />

                    {showControls && (
                        <VideoControls
                            status={status}
                            onPlayPause={handlePlayPause}
                            onSeek={handleSeek}
                            onSkip={handleSkip}
                            onMute={handleMute}
                            onFullscreen={handleFullscreen}
                        />
                    )}
                </TouchableOpacity>

                <View style={styles.streamSelector}>
                    <Text style={styles.sectionTitle}>Select Video Stream</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {VIDEO_STREAMS.map((stream, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.streamButton,
                                    currentStreamIndex === index && styles.activeStreamButton
                                ]}
                                onPress={() => handleStreamChange(index)}
                            >
                                <Text style={[
                                    styles.streamButtonText,
                                    currentStreamIndex === index && styles.activeStreamText
                                ]}>
                                    {stream.name}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
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
        flexGrow: 1,
    },
    videoContainer: {
        width: screenWidth,
        height: screenWidth * (9 / 16),
        backgroundColor: '#000',
        position: 'relative',
        marginBottom: 20,
    },
    video: {
        width: '100%',
        height: '100%',
    },
    streamSelector: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        padding: 20,
        margin: 15,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    sectionTitle: {
        color: '#ffffff',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    streamButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 25,
        marginRight: 12,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    activeStreamButton: {
        backgroundColor: 'rgba(33, 150, 243, 0.3)',
        borderColor: '#2196F3',
    },
    streamButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '500',
    },
    activeStreamText: {
        fontWeight: 'bold',
        color: '#ffffff',
    },
    infoContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        padding: 20,
        margin: 15,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
});