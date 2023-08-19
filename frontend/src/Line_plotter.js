import React from 'react';
import { Line } from 'react-chartjs-2';
import { LinearScale, CategoryScale, PointElement, LineElement, Tooltip, Title, Legend ,Chart } from "chart.js";
Chart.register(LinearScale);
Chart.register(CategoryScale);
Chart.register(PointElement);
Chart.register(LineElement);
Chart.register(Tooltip);
Chart.register(Title);
Chart.register(Legend);

//Why this? For some odd reason they removed this in v4 and now you gotta import them manually
const LineGraph = ({ labels, datasetLabel, data, borderColor, backgroundColor }) => {
    let chartData = {}
    if(data.length < 2){
        const datasets = [];

        for (const diskLabel in data) {
            const diskData = data[diskLabel];
            datasets.push({
                label: diskLabel,
                data: diskData,
                borderColor: borderColor,
                backgroundColor: backgroundColor,
            });
        }

        chartData = {
            labels: labels,
            datasets: datasets,
        };
    }
    else{
        chartData = {
            labels: labels,
            datasets: [
                {
                    label: datasetLabel,
                    data: data,
                    borderColor: borderColor,
                    backgroundColor: backgroundColor,
                },
            ],
        };
    }


    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: datasetLabel,
            },
        },
        scales: {
            y: {
                type: 'linear', // Make sure the type is 'linear'
                beginAtZero: true,
            },
        },
    };


    return (
        <div>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default LineGraph;
