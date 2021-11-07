import React from 'react';
import { Chart } from "react-google-charts";



const options = {
    annotations: {
        stem: {
            color: '#097138'
        },
        style: 'line'
    },
    animation: {
        duration: 1000,
        easing: 'out',
        startup: true,
    },
    series: {
        0: {color: '#080808', lineWidth: 2},
        1: {color: '#008000', lineWidth: 3},
    },
    curveType: 'function',
    legend: 'none',
    colors: ['#a52714']
};



function BoundariesChart(props) {

    return (
        <div>
            <Chart
                chartType="AreaChart"
                loader={<div>Loading Chart</div>}
                data={props.data}
                options={options}
                chartEvents={[
                    {
                        eventName: 'select',
                        callback: ({ chartWrapper }) => {
                            const chart = chartWrapper.getChart()
                            const selection = chart.getSelection()
                            if (selection.length === 1) {
                                const [selectedItem] = selection
                                const dataTable = chartWrapper.getDataTable()
                                const { row, column } = selectedItem
                                alert(
                                    'You selected : ' +
                                    JSON.stringify({
                                        row,
                                        column,
                                        value: dataTable.getValue(row, column),
                                    }),
                                    null,
                                    2,
                                )
                            }
                            console.log(selection)
                        },
                    },
                ]}
            />
        </div>
    );
}

export default BoundariesChart;
