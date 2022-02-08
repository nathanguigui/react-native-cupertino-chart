import React, {useState} from "react";
import {HorizontalGrid, VerticalGrid} from "./Grid";
import {YAxis} from "./YAxis";
import {XAxis} from "./XAxis";
import Svg, {Defs, LinearGradient, Path, Polyline, Stop} from "react-native-svg";
import {Text, View} from "react-native";
import {getYforValue} from "./utils";
import Cursor from "./Cursor";
import GraphLine, {GraphLinePublicProps} from "./GraphLine";
import {gestureHandlerRootHOC} from "react-native-gesture-handler";


interface ChartProps {
  data: Array<{ x: any, y: number }>
  width: number
  height: number
  lines?: GraphLinePublicProps[]
  backgroundGradient?: boolean
  paddingRight?: number
  innerGraphMarginRight?: number
  paddingBottom?: number
  color?: string
  backgroundColor?: string
  inverted?: boolean
  strokeWidth?: number
  xValueFormatter?: (value: any) => string
  yValueFormatter?: (value: number) => string
  onCursorMove?: (v: { x: any, y: number }) => any
  grid?: boolean
  onCursorBegan?: () => any
  onCursorEnd?: () => any
  errorText?: string
}

const Chart = (
  {
    data, lines, strokeWidth: propsStrokeWidth,
    height, width, backgroundColor, color: propsColor,
    backgroundGradient, inverted, grid,
    paddingBottom: propsPaddingBottom, paddingRight: propsPaddingRight, xValueFormatter, yValueFormatter,
    onCursorBegan, onCursorEnd, onCursorMove, errorText, innerGraphMarginRight
  }: ChartProps) => {
  const maxValue = lines ? Math.max(...data.map(d => d.y), Math.max(...lines?.map(l => l.y))) * 1.01 : Math.max(...data.map(d => d.y)) * 1.01
  const minValue = lines ? Math.min(...data.map(d => d.y), Math.min(...lines?.map(l => l.y))) * 0.99 : Math.min(...data.map(d => d.y)) * 0.99
  const paddingRight = !propsPaddingRight && propsPaddingRight !== 0 ? 55 : propsPaddingRight
  const paddingBottom = !propsPaddingBottom && propsPaddingBottom !== 0 ? 20 : propsPaddingBottom;
  const strokeWidth = propsStrokeWidth || 1.5
  const [color, setColor] = useState(propsColor);

  const getDatasetPoints = (d: boolean, stroke: boolean) => {
    const points = data.map((d, i) => ({
      x: i / (data.length - 1) * (width - (paddingRight + (innerGraphMarginRight || 0))),
      y: (1 - (d.y - minValue) / (maxValue - minValue)) * (height - paddingBottom) + 5
    }))
    if (d) {
      let bezierpath = "";
      points.forEach((p, i) => {
        bezierpath = `${bezierpath} ${i === 0 ? ` M ${p.x} ${p.y}` : i === 1 ? ` L ${p.x} ${p.y}` : ` ${p.x} ${p.y}`}`

      })
      if (stroke) {
        bezierpath = `${bezierpath} ${width - (paddingRight + (innerGraphMarginRight || 0))} ${points[points.length - 1].y}`
        points.reverse().forEach((p, i) => {
          bezierpath = `${bezierpath} ${i === 0 ? `M ${p.x} ${p.y}` : i === 1 ? `L ${p.x} ${p.y}` : `${p.x} ${p.y}`}`

        })
        bezierpath = `${bezierpath} ${points[points.length - 1].x} ${points[points.length - 1].y}`
        return bezierpath
      }
      bezierpath = `${bezierpath} ${width - (paddingRight + (innerGraphMarginRight || 0))} ${points[points.length - 1].y}`
      bezierpath = `${bezierpath} L ${width - (paddingRight + (innerGraphMarginRight || 0))} ${height} 0 ${height} 0 ${points[0].y}`
      return bezierpath

    }
    return (points).map(p => (`${p.x},${p.y}`)).join(" ")
  }

  return (
    <View style={{width, height, backgroundColor: backgroundColor, marginTop: 3, overflow: "visible"}}>
      {data && data.length ?
        <>
          <Svg width={width} height={height}>
            <Defs>
              <LinearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                <Stop offset="0%" stopColor={color} stopOpacity={.1}/>
                <Stop offset="30%" stopColor={color} stopOpacity={.1}/>
                <Stop offset="100%" stopColor={color} stopOpacity={0}/>
              </LinearGradient>
            </Defs>
            {grid &&
              <>
                <HorizontalGrid inverted={inverted} height={height - paddingBottom} width={width} minValue={minValue} maxValue={maxValue} lineCount={4}/>
                <VerticalGrid inverted={inverted} paddingBottom={paddingBottom} lineCount={5} paddingRight={paddingRight} height={height} width={width}/>
              </>
            }
            <YAxis valueFormatter={yValueFormatter} inverted={inverted} height={height - paddingBottom} width={width} paddingRight={paddingRight} minValue={minValue} maxValue={maxValue} infosCount={4}/>
            <XAxis valueFormatter={xValueFormatter} inverted={inverted} height={height} width={width} paddingBottom={paddingBottom} paddingRight={paddingRight} infosCount={5} data={data}/>
            {/*<Path fill={"none"} stroke={color} strokeWidth={1.5} d={getDatasetPoints(true, true)}/>*/}
            {backgroundGradient && <Path fill={"url(#grad1)"} stroke={"none"} strokeWidth={0} d={getDatasetPoints(true, false)}/>}
            <Polyline fill={"none"} strokeWidth={strokeWidth} stroke={color} points={getDatasetPoints(false, false)}/>
            {lines && lines.map((l, i) => <GraphLine key={`graph-line-${i}`} yPos={getYforValue(l.y, minValue, maxValue, height - paddingBottom)} color={l.color} width={width} name={l.name} paddingRight={paddingRight}/>)}
          </Svg>
          <Cursor data={data} width={width} backgroundColor={backgroundColor} onCursorBegan={() => {
            setColor("#49BFFA")
            onCursorBegan && onCursorBegan()
          }} onCursorEnd={() => {
            setColor(propsColor)
            onCursorEnd && onCursorEnd()
          }} height={height} paddingBottom={paddingBottom} setCurrentValue={onCursorMove} paddingRight={paddingRight + (innerGraphMarginRight || 0)} minValue={minValue} maxValue={maxValue}/>
        </> :
        <View style={{justifyContent: "center", alignItems: "center", height: "100%"}}>
          <Text style={{color: "#fff", fontSize: 17}}>{errorText || "Error"}</Text>
        </View>
      }
    </View>
  )
}

export default gestureHandlerRootHOC(Chart);
