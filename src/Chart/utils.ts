
export const getValueForXpos = (width: number, paddingRight: number, xPos: number, data: Array<any>) => {
    const idx = Math.ceil(xPos / (width - paddingRight) * (data.length - 1))
    return data[idx];
}

export const getYforValue = (value: number, minValue: number, maxValue: number, height: number) => {
    return (1 - (value - minValue) / (maxValue - minValue)) * height
}

function factorial(n: number): number {
    if (n < 0)
        return (-1); /*Wrong value*/
    if (n == 0)
        return (1);  /*Terminating condition*/
    else {
        return (n * factorial(n - 1));
    }
}

function nCr(n: number, r: number) {
    return (factorial(n) / (factorial(r) * factorial(n - r)));
}


export function BezierCurve(points: Array<{ x: number, y: number }>): Array<{ x: number, y: number }> {
    let n = points.length;
    let curvepoints = [];
    for (let u = 0; u <= 1; u += 0.001) {

        let p = {x: 0, y: 0};

        for (let i = 0; i < n; i++) {
            let B = nCr(n - 1, i) * Math.pow((1 - u), (n - 1) - i) * Math.pow(u, i);
            let px = points[i].x * B;
            let py = points[i].y * B;

            p.x += px;
            p.y += py;

        }

        curvepoints.push(p);
    }

    return curvepoints;
}
