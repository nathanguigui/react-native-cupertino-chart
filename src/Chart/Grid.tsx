import React from "react";
import {Line} from "react-native-svg";
import {getYforValue} from "./utils";

export interface HorizontalGridProps {
    lineCount: number
    maxValue: number
    minValue: number
    height: number
    width: number
    inverted?: boolean
}

export const HorizontalGrid = ({lineCount, height, maxValue, minValue, width, inverted}: HorizontalGridProps) => {
    return (
        <>
            {[
                <Line key={`horizontal-grid-${-1}`} strokeOpacity={.2} stroke={inverted ? "white" : "black"} y1={0} y2={0} x1={0} x2={width}/>,
                ...[...Array(lineCount)].map((_e, i) => {
                    const displayedValue = ((maxValue - minValue) / lineCount * (i + 0.5)) + minValue;
                    const y = getYforValue(displayedValue, minValue, maxValue, height);
                    return (
                        <Line key={`horizontal-grid-${i}`} strokeOpacity={.2} strokeWidth={.5} stroke={inverted ? "white" : "black"} y1={y} y2={y} x1={0} x2={width}/>
                    )
                })]
            }
        </>
    )
}

export interface VerticalGridProps {
    lineCount: number
    paddingRight: number
    paddingBottom: number
    height: number
    width: number
    inverted?: boolean
}

export const VerticalGrid = ({height, lineCount, width, paddingRight, inverted}: VerticalGridProps) => {
    return (
        <>
            {[...Array(lineCount)].map((_e, i) => {
                const x = (width - paddingRight) * i / (lineCount - 1)
                return (
                    <Line key={`vertical-grid-${i}`} strokeOpacity={.2} strokeWidth={.5} stroke={inverted ? "white" : "black"} y1={0} y2={height} x1={x} x2={x}/>
                )
            })}
        </>
    )
}
