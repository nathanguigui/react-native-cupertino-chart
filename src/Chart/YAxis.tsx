import React from "react";
import {Text} from "react-native-svg";
import {getYforValue} from "./utils";

export interface YAxisProps {
    height: number,
    width: number,
    paddingRight: number
    minValue: number
    maxValue: number
    infosCount: number
    inverted?: boolean
    valueFormatter?: (i: any) => string
}

export const YAxis = ({height, paddingRight, width, maxValue, minValue, infosCount, inverted, valueFormatter}: YAxisProps) => {
    return (
        <>
            {[...Array(infosCount)].map((_e, i) => {
                const displayedValue = ((maxValue - minValue) / infosCount * (i + 0.5)) + minValue;
                const y = getYforValue(displayedValue, minValue, maxValue, height);
                return (
                    <Text key={`yline-${i}`} fill={inverted ? "white" : "black"} fontWeight={"bold"} fontSize={14} y={y + 16} x={width - paddingRight + 3}>
                        {valueFormatter ? valueFormatter(displayedValue): displayedValue}
                    </Text>
                )
            })
            }
        </>
    )
}
