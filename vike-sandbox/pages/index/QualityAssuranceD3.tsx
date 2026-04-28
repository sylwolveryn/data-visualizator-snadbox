import { useMemo } from 'react'
import * as d3 from 'd3'
import { DataItem } from './data'


type PieChartProps = {
    width: number;
    height: number;
    data: DataItem[];
};

const MARGIN_X = 150
const MARGIN_Y = 50
const INFLEXION_PADDING = 20 // space between donut and label inflexion point

const colors = [
    'rgba(47, 47, 228, .7)',
]

export const QualityAssuranceD3 = ({ width, height, data }: PieChartProps) => {
    const radius = Math.min(width - 2 * MARGIN_X, height - 2 * MARGIN_Y) / 2

    const pie = useMemo(() => {
        const pieGenerator = d3.pie<any, DataItem>().value((d) => d.value)
        return pieGenerator(data)
    }, [data])

    const arcGenerator = d3.arc()

    const shapes = pie.map((grp, i) => {
        // First arc is for the pie
        const sliceInfo = {
            innerRadius: 0,
            outerRadius: radius,
            startAngle: grp.startAngle,
            endAngle: grp.endAngle,
        }
        const centroid = arcGenerator.centroid(sliceInfo)
        const slicePath = arcGenerator(sliceInfo)

        // Second arc is for the legend inflexion point
        const inflexionInfo = {
            innerRadius: radius + INFLEXION_PADDING,
            outerRadius: radius + INFLEXION_PADDING,
            startAngle: grp.startAngle,
            endAngle: grp.endAngle,
        }
        const inflexionPoint = arcGenerator.centroid(inflexionInfo)

        const isRightLabel = inflexionPoint[0] > 0
        const labelPosX = inflexionPoint[0] + 50 * (isRightLabel ? 1:-1)
        const textAnchor = isRightLabel ? 'start':'end'
        const label = grp.data.name + ' (' + grp.value + ')'

        return (
                <g key={i}>
                    <path fill="none" stroke-width="10"
                          d="
                            M86,388
                            L203,330
                            C320,272,554,156,673.8333333333334,165.83333333333334
                            C793.6666666666666,175.66666666666666,799.3333333333334,311.3333333333333,683.5,316.6666666666667
                            C567.6666666666666,322,330.3333333333333,197,211.66666666666666,134.5
                            L93,72">
                    </path>
                    <path d={slicePath} fill={colors[i]}/>
                    <circle cx={centroid[0]} cy={centroid[1]} r={2}/>
                    <line
                            x1={centroid[0]}
                            y1={centroid[1]}
                            x2={inflexionPoint[0]}
                            y2={inflexionPoint[1]}
                            stroke={'black'}
                            fill={'black'}
                    />
                    <line
                            x1={inflexionPoint[0]}
                            y1={inflexionPoint[1]}
                            x2={labelPosX}
                            y2={inflexionPoint[1]}
                            stroke={'black'}
                            fill={'black'}
                    />
                    <text
                            x={labelPosX + (isRightLabel ? 2:-2)}
                            y={inflexionPoint[1]}
                            textAnchor={textAnchor}
                            dominantBaseline="middle"
                            fontSize={14}
                    >
                        {label}
                    </text>
                </g>
        )
    })

    return (
            <svg width={width} height={height} style={{ display: 'inline-block' }}>
                <g transform={`translate(${width / 2}, ${height / 2})`}>{shapes}</g>
            </svg>
    )
}
