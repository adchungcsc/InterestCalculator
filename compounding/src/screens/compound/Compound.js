import React from 'react';

import { Line, Bar } from "react-chartjs-2";
import * as ChartAnnotation from 'chartjs-plugin-annotation'

const data = {
    datasets: [
        {
            label: 'number',
            fill: true,
            beginAtZero: true,
            data: [0, 3, 5, 1, 7, 5, 7, 4, 9],
        },
    ],
    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
}

const options = {
    annotation: {
        annotations: [
            {
                type: 'line',
                mode: 'horizontal',
                scaleID: 'y-axis-0',
                value: 6,
                borderColor: 'black',
                borderWidth: 10,
                label: {
                    backgroundColor: 'red',
                    content: 'Test Label',
                    enabled: true,
                },
            },
        ],
    },
}

function Compound(props) {
    return (
        <div>
            <h1>Hello World!</h1>
            <Bar data={data} options={options} plugins={ChartAnnotation}/>
        </div>
    );
}

export default Compound;
