import React, { useState, useRef, ReactNode } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';

type ExpandableProps = {
  header: ReactNode;
  children: ReactNode;
};

const CustomExpandable = ({ header, children }: ExpandableProps) => {
  const [expanded, setExpanded] = useState(false);
  const animationValue = useRef(new Animated.Value(0)).current;
  const [contentHeight, setContentHeight] = useState(0); // Dynamic height of the content

  const toggleExpand = () => {
    setExpanded(!expanded);

    Animated.timing(animationValue, {
      toValue: expanded ? 0 : contentHeight, // Animate to dynamic content height
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleExpand} style={styles.header}>
        <Text style={styles.headerText}>{header}</Text>
      </TouchableOpacity>
      <Animated.View style={[styles.content, { height: animationValue }]}>
        <View
          onLayout={(event) => {
            const { height } = event.nativeEvent.layout;
            console.log('onLayout Height: ', height);
            setContentHeight(height); // Capture the height of the content
          }}
        >
          <Text style={styles.contentText}>{children}</Text>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  header: {
    padding: 15,
    backgroundColor: '#f7f7f7',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  contentText: {
    padding: 15,
    fontSize: 14,
    color: '#333',
  },
});

export default CustomExpandable;
