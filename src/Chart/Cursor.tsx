import React from "react";
import Svg, {Circle, G, Line, Rect} from "react-native-svg";
import {getValueForXpos, getYforValue} from "./utils";
import {Animated, StyleSheet, View} from "react-native";
import {PanGestureHandler} from "react-native-gesture-handler";
import {useState} from "react";
import type {CursorProps} from "./types";


const AnimatedLine = Animated.createAnimatedComponent(Line)
const AnimatedCircle = Animated.createAnimatedComponent(Circle)

const Cursor = ({data, width, height, paddingBottom, paddingRight, maxValue, minValue, backgroundColor, setCurrentValue, onCursorBegan, onCursorEnd}: CursorProps) => {
    const x = new Animated.Value(0);
    const y = new Animated.Value(0);
    const [show, setShow] = useState(false);

    const handleChangeCursor = (e: any, doShow?: boolean) => {
        const xBaseValue = (e.nativeEvent.x > (width - paddingRight) ? (width - paddingRight) : e.nativeEvent.x < 0 ? 0 : e.nativeEvent.x);
        const newXValue = Math.ceil(xBaseValue/width* data.length)/data.length * width
        x.setValue(newXValue+2)
        const value = getValueForXpos(width, paddingRight, newXValue, data) || data[data.length - 1];
        setCurrentValue && setCurrentValue(value)
        y.setValue(getYforValue(value.y, minValue, maxValue, height) - 8)
        if (doShow) setShow(true);
    }

    return (
        <View style={StyleSheet.absoluteFill}>
            <PanGestureHandler onBegan={(e: any) => {
                handleChangeCursor(e, true)
                onCursorBegan && onCursorBegan();
            }} onEnded={() => {
                onCursorEnd && onCursorEnd()
                setShow(false)
            }} onCancelled={() => {
                onCursorEnd && onCursorEnd()
                setShow(false)
            }} onGestureEvent={e => handleChangeCursor(e, false)}>
                <Svg width={width - paddingRight} height={height - paddingBottom}>
                    <G>
                    <Rect width="100%" height="100%" />
                        <AnimatedLine x1={x} x2={x} y1={0} stroke={show ? "#59c7fa" : "transparent"} strokeWidth={1} y2={height - paddingBottom}/>
                        <AnimatedCircle cx={x} cy={y} r={10} fill={show ? "#59c7fa" : "transparent"} strokeWidth={3} stroke={show ? backgroundColor : "transparent"}/>
                    </G>
                </Svg>
            </PanGestureHandler>
        </View>
    )
}

export default Cursor;
