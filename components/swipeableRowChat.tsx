import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import React, { Component, PropsWithChildren } from 'react';
import { Animated, StyleSheet, Text, View, I18nManager } from 'react-native';

import { RectButton, Swipeable } from 'react-native-gesture-handler';

export default class ChatSwipeableRow extends Component<
  PropsWithChildren<unknown>
> {
//   private renderLeftActions = (
//     _progress: Animated.AnimatedInterpolation<number>,
//     dragX: Animated.AnimatedInterpolation<number>
//   ) => {
//     const trans = dragX.interpolate({
//       inputRange: [0, 50, 100, 101],
//       outputRange: [-20, 0, 0, 1],
//       extrapolate: 'clamp',
//     });
//     return (
//       <RectButton style={styles.leftAction} onPress={this.close}>
//         <Animated.Text
//           style={[
//             styles.actionText,
//             {
//               transform: [{ translateX: trans }],
//             },
//           ]}>
//           Archive
//         </Animated.Text>
//       </RectButton>
//     );
//   };

  private renderRightAction = (
    text: string,
    color: string,
    x: number,
    progress: Animated.AnimatedInterpolation<number>
  ) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    });
    const pressHandler = () => {
      this.close();
      // eslint-disable-next-line no-alert
      window.alert(text);
    };

    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
        <RectButton
          style={[styles.rightAction, { backgroundColor: color }]}
          onPress={pressHandler}>
          <Ionicons name={text === 'More' ? 'ellipsis-horizontal' : 'archive'} size={16} color="white" style={{paddingTop:10}} />
          <Text style={styles.actionText}>{text}</Text>
        </RectButton>
      </Animated.View>
    );
  };

  private renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>,
    _dragAnimatedValue: Animated.AnimatedInterpolation<number>
  ) => (
    <View
      style={{
        width: 192,
        flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
      }}>
      {this.renderRightAction('More', '#C8C7CD', 192, progress)}
      {this.renderRightAction('Archive', Colors.muted, 128, progress)}
    </View>
  );

  private swipeableRow?: Swipeable;

  private updateRef = (ref: Swipeable) => {
    this.swipeableRow = ref;
  };
  private close = () => {
    this.swipeableRow?.close();
  };
  render() {
    const { children } = this.props;
    return (
      <Swipeable
        ref={this.updateRef}
        friction={2}
        enableTrackpadTwoFingerGesture
        leftThreshold={30}
        rightThreshold={40}
        renderRightActions={this.renderRightActions}>
        {children}
      </Swipeable>
    );
  }
}

const styles = StyleSheet.create({
  actionText: {
    color: 'white',
    fontSize: 16,
    backgroundColor: 'transparent',
    padding: 10,
  },
  rightAction: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});