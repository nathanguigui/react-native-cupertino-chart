export type ChartData = { x: any, y: number }[];

export interface CursorProps {
    width: number
    height: number
    paddingBottom: number
    paddingRight: number
    minValue: number
    backgroundColor?: string
    maxValue: number
    data: ChartData
    setCurrentValue?: (v: {x: any, y: number}) => any
    onCursorBegan?: () => any
    onCursorEnd?: () => any
}
