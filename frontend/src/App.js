import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import LineGraph from './Line_plotter';
import './index.css';

const MyComponent = () => {
    const [apiData, setApiData] = useState(null);
    const [isCollapsed, setIsCollapsed] = useState(true);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };
        useEffect(() => {
        // Fetch data from the API using a Promise
        const fetchData = () => {
            return fetch('http://localhost:5001/api/files')
                .then(response => response.json())
                .catch(error => {
                    console.error('Error fetching API data:', error);
                });
        };

        // Call the fetchData function and handle the promise result
        fetchData()
            .then(data => {
                // Set the fetched data in state
                setApiData(data);
            });

    }, []);
    function line_graph_generate(graphLabels, graphDatasetLabel, graphData,graphBorderColor, graphBackgroundColor) {

        return (
            <div className="line_graph">
                <header className={"text-bold"}>
                    <LineGraph
                        labels={graphLabels}
                        datasetLabel={graphDatasetLabel}
                        data={graphData}
                        borderColor={graphBorderColor}
                        backgroundColor={graphBackgroundColor}
                    />
                </header>
            </div>
        );
    }

    function card_ui_generator_for_history(hostname, stats){
        let cpu_value = []
        let ram_value = []
        let disks_value = []
        let hours = []

        let time_data = stats['history']
        let cpu_info =  stats['cpu']
        let ram_info = stats['ram']
        let diskData = stats['disk']
        let process_list = stats['process']

        let date = 0

        // Initialize arrays in disks_value for each key
        for (const key in time_data[Object.keys(time_data)[0]]) {
            if (key !== "cpu_used" && key !== "ram_used") {
                disks_value[key] = [];
            }
        }


        Object.keys(time_data).forEach(timestamp => {
            //console.log(time_data[timestamp])
            date = new Date(timestamp * 1000);
            cpu_value.push(time_data[timestamp]["cpu_used"])
            ram_value.push(time_data[timestamp]["ram_used"])
            //disks_value.push(time_data[timestamp]["cpu_used"])

            for (const key in time_data[timestamp]) {
                if(key !== "cpu_used" && key!== "ram_used"){
                    disks_value[key].push(time_data[timestamp][key]);
                }
            }
            hours.push(date.getHours() + ':' + date.getMinutes() + '-' + date.getDate())

        })

        return <div className={"card-main p-3"} key={hostname}>
            <div className={"row w-100"}>
                <div className={"col-sm-4"}></div>
                <div className={"col-sm-4"}><h1 className={"textflare text-center"}>{hostname}</h1></div>
                <div className={"col-sm-4"}></div>
            </div>

            <div className="collapsible-container">
                <div className={"row p-2"}>
                    <div className={"col-sm-4"}>
                        <div className="fcard">
                            <div className="card-body">
                                {line_graph_generate(hours,
                                    'CPU Usage',
                                    cpu_value,
                                    'rgba(75, 192, 192, 1)',
                                    'rgba(75, 76, 76, 0.2)'
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={"col-sm-4"}>
                        <div className="fcard">
                            <div className="card-body">
                                {line_graph_generate(hours,
                                    'RAM Usage',
                                    ram_value,
                                    'rgba(75, 192, 98, 1)',
                                    'rgba(75, 87, 98, 0.2)'
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={"col-sm-4"}>
                        <div className="fcard">
                            <div className="card-body">
                                {line_graph_generate(hours,
                                    "Disk Usage",
                                    disks_value,
                                    'rgba(75, 19, 39, 1)',
                                    'rgba(75, 19, 23, 0.2)'
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <button className="collapsible-button m-3 fcard" onClick={toggleCollapse}>
                    More Info
                </button>
                <div className={`collapsible-content ${isCollapsed ? 'collapsed' : ''}`}>
                    <div className={"row"}>
                        <div className={"col-sm-4"}>
                            {/*//Custom box css*/}
                            <div className="fcard mx-2">
                                <div className="fcard-content">
                                    <div className="fcard-top">
                                        <span className="fcard-title">{cpu_info['name']}</span>
                                    </div>
                                    <div className="fcard-bottom">
                                        <p>Cores: {cpu_info['cores']}</p>
                                        <p>Load: {cpu_info['load']}%</p>
                                    </div>
                                </div>
                                <div className="fcard-image">
                                    <img  width={"50"} height={"50"}  src={require('../src/images/cpu.svg')} alt={"CPU"}/>
                                </div>
                            </div>
                            {/*custom css end*/}
                        </div>

                        <div className={"col-sm-4"}>
                            {/*//Custom box css*/}
                            <div className="fcard">
                                <div className="fcard-content">
                                    <div className="fcard-top">
                                        <span className="fcard-title text-bold">Available: {ram_info['total']} MB  <br/> Used: {ram_info['used']} MB</span>
                                    </div>
                                    <div className="fcard-bottom">
                                        <p>Free: {ram_info['free']} MB</p>
                                        <p>Load: {ram_info['percent']}%</p>
                                    </div>
                                </div>
                                <div className="fcard-image">
                                    <img width={"50"} height={"50"}  src={require('../src/images/memory-solid.svg')} alt={"RAM"}/>
                                </div>
                            </div>
                            {/*custom css end*/}
                        </div>

                        {Object.keys(diskData).map(drive => (
                            <div className="col-sm-4 pb-4" key={drive}>
                                <div className="fcard">
                                    <div className="fcard-content">
                                        <div className="fcard-top">
                                <span className="fcard-title text-bold">
                                  Drive Name: {drive} /<br />
                                    Total: {diskData[drive][0]} GB
                                </span>
                                        </div>
                                        <div className="fcard-bottom">
                                            <p>Used: {diskData[drive][1]} GB</p>
                                        </div>
                                    </div>
                                    <div className="fcard-image">
                                        <img
                                            width={"50"}
                                            height={"50"}
                                            src={require('../src/images/hard-drive-regular.svg')}
                                            alt="Disk Icon"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={"row p-4"}>
                        <h1 className={"textflare mb-4"}>Running Processes</h1>
                        <div className={"fcard"}>
                            <table className="table table-striped">
                                <thead>
                                <tr>
                                    <th>PID</th>
                                    <th>Process Name</th>
                                    <th>Memory Used</th>
                                </tr>
                                </thead>
                                <tbody>
                                {Object.keys(process_list).map(pid => (
                                    <tr key={pid}>
                                        <td>{pid}</td>
                                        <td>{process_list[pid]["process_name"]}</td>
                                        <td>{process_list[pid]["memory_used"]}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>;

    }

//
    function main_ui(api_response){
        let obj = api_response
        let final = [];
        let cards = [];
        let card_elements = []

        const regex = /^(.*?)(?:-history.json|-live.json)$/;

        for (const [key, value] of Object.entries(obj)) {
            const match = key.match(regex);
            final[key] = JSON.parse(value);
            card_elements[match[1]] = []
        }
        Object.keys(final).forEach(key => {
            const match = key.match(regex);
            if (match) {
                const hostname = match[1];
                if(key.includes("live")){
                    card_elements[hostname]['cpu'] = final[key][0];
                    card_elements[hostname]['ram'] = final[key][1];
                    card_elements[hostname]['disk'] = final[key][2]
                    card_elements[hostname]['process'] = final[key][3]
                }

                if(key.includes("history")){
                    card_elements[hostname]['history'] = final[key];
                }
            }
        });

        for (const [host, stats] of Object.entries(card_elements)) {
            cards[host] = card_ui_generator_for_history(host, stats)
        }
        console.log(cards)
        return (

            <div className="container">
                <div className="row w-100 m-2 p-2">
                    <header><h1>WatchTower</h1></header>
                </div>
                {Object.keys(cards).map(key => cards[key])}
            </div>
        )
    }
    return (
        <div>
            {apiData ? (
                main_ui(apiData)
            ) : (
                <p>Loading data...</p>
            )}
        </div>
    );
};

export default MyComponent;

