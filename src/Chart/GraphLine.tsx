import React from "react";
import {G, Line, Rect, rgbaArray, Text} from "react-native-svg";

export interface GraphLinePublicProps {
    y: number
    color: string | number | rgbaArray | undefined
    name?: string
}

interface GraphLineProps {
    yPos: number
    color: string | number | rgbaArray | undefined
    width: number
    name?: string
    paddingRight: number
}

const GraphLine = ({yPos, color, width, paddingRight, name}: GraphLineProps) => {
    return (
        <G>
            <Line strokeWidth={2} strokeOpacity={.9} stroke={color} y1={yPos} y2={yPos} x1={0} x2={width}/>
            <Rect y={yPos} x={width - paddingRight} width={paddingRight} height={14} fill={color}/>
            <G y={yPos + 11} x={width - paddingRight + 5}>
                <Text fontWeight={"bold"} dominant-baseline="middle" text-anchor="middle" fontSize={12} fill={"#fff"}>{name}</Text>
            </G>
        </G>
    )
}

export default GraphLine;
