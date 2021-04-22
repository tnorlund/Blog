export interface Step {
  start: number, stop: number,
}

export const setSteps = ( min_x: number, max_x: number, steps: number[] ): Step[] => {
    const sum = steps.reduce( ( a, b ) => a + b ) / max_x
    let start = min_x
    return Object.values( steps ).map( ( value: number, index: number ) => {
        let output: Step = { start: 0, stop: 0 }
        output[`start`] = start;
        output[`stop`] = start + ( steps[ index ] / sum );
        start = start + ( steps[ index ] / sum )
        return output
    } )
}

export interface Point {
  x: number, y: number
}

export const translate = ( 
  point: Point, height: number, width: number, letterDiff: number 
) => `translate3d(${
  point.x <= 0.5 * width ? point.x - letterDiff : point.x + letterDiff
}px, ${
  point.y <= 0.5 * height ? point.y - letterDiff : point.y + letterDiff
}px, 0)`