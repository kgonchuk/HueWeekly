import React from 'react';
import { View, Text } from 'react-native';
import { Canvas, Circle, Fill } from '@shopify/react-native-skia';

export default function SkiaTest() {
  return (
    <View style={{ flex: 1 }}>
      <Text style={{ padding: 20 }}>Якщо бачите кольоровий круг нижче — Skia працює:</Text>
      <Canvas style={{ width: 200, height: 200 }}>
        <Fill color="lightblue" />
        <Circle cx={100} cy={100} r={60} color="tomato" />
      </Canvas>
    </View>
  );
}