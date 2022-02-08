import React from "react";
import {Line, Text} from "react-native-svg";

export interface XAxisProps {
    height: number,
    width: number,
    paddingBottom: number
    paddingRight: number
    infosCount: number
    data: Array<{ x: any, y: number }>
    inverted?: boolean
    valueFormatter?: (i: any) => string
}

export const XAxis = ({height, paddingBottom, paddingRight, width, infosCount, data, inverted, valueFormatter}: XAxisProps) => {
    return (
        <>
            <Line key={`yline--1`} stroke={inverted ? "white" : "black"} strokeOpacity={.5} y1={height - paddingBottom} y2={height - paddingBottom} x1={0} x2={width}/>
            {[...Array(infosCount)].map((_e, i) => {
                const displayedValue = data[Math.ceil((data.length - 1) * i / (infosCount - 1))]
                const x = (width - paddingRight) * i / (infosCount - 1)
                return (
                    <Text key={`xline-${i}`} fill={inverted ? "white" : "black"} fontWeight={"bold"} y={height - paddingBottom + 15} x={x + 5}>
                        {valueFormatter ? valueFormatter(displayedValue.x) : displayedValue.x}
                    </Text>
                )
            })
            }
        </>
    )
}
