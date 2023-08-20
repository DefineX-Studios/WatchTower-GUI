import React from 'react';
import { Line } from 'react-chartjs-2';
import { LinearScale, CategoryScale, PointElement, LineElement, Tooltip, Title, Legend, defaults ,Chart } from "chart.js";

Chart.register(LinearScale);
Chart.register(CategoryScale);
Chart.register(PointElement);
Chart.register(LineElement);
Chart.register(Tooltip);
Chart.register(Title);
Chart.register(Legend);

defaults.font.family = 'Monospace';
defaults.font.style = "bold"
defaults.color = "#000"

//Why this? For some odd reason they removed this in v4, and now you go to import them manually
const LineGraph = ({ labels, datasetLabel, data, borderColor, backgroundColor }) => {
    let chartData
    let options
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

        options = {
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
                    min: 0,
                    ticks: {
                        stepSize: 500,
                        callback: function (value) {
                            return value + " MB";
                        }
                    }
                },

            },
            legend: {
                labels: {
                    fontSize: 25,
                }
            }
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

        options = {
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
                    min: 0,
                    max: 100,
                    ticks: {
                        stepSize: 20,
                        callback: function (value) {
                            return value + " %";
                        }
                    }
                },

            },
            legend: {
                labels: {
                    fontSize: 25
                }
            }
        };
    }



    return (
        <div>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default LineGraph;
