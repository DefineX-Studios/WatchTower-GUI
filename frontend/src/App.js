import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import LineGraph from './Line_plotter';
import './index.css';

const WatchTower = () => {
    const [apiData, setApiData] = useState(null);
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [websites, setWebsites] = useState({});
    const [activeId, setActiveId] = useState(null);

    const toggleCollapse = (id) => {
        setActiveId(id === activeId ? null : id);
    };

    //For fetching api data
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

    useEffect(() => {
        const fetchData = () => {
            return fetch('http://localhost:5001/api/websites')
                .then(response => response.json())
                .catch(error => {
                    console.error('Error fetching API data:', error);
                });
        };

        fetchData()
            .then(data => {
                setWebsites(data);
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
        let last_update

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

        last_update = date.getMonth() + '/' + + date.getDate() + ' ' + date.getHours()+':' + date.getMinutes()

        return <div className={"card-main p-3 m-2"} key={hostname+"-card"}>
            <div className={"row w-100"}>
                <div className={"col-sm-1"}></div>
                <div className={"col-sm-10"}><h1 className={"textflare text-center"}>{hostname} | Last Updated: {last_update}</h1></div>
                <div className={"col-sm-1"}></div>
            </div>

            <div className="collapsible-container">
                <div className={"row p-2"}>
                    <div className={"col-sm-4"}>
                        <div className="fcard">
                            <div className="card-body">
                                {line_graph_generate(hours,
                                    'CPU Usage',
                                    cpu_value,
                                    '#fa7970',
                                    '#fa797055'
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
                                    '#faa356',
                                    '#faa35655'
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
                                    '#77bdfb',
                                    '#77bdfb'
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    className="collapsible-button m-3 fcard"
                    onClick={() => toggleCollapse(hostname)}>
                    More Info
                </button>
                <div className={`collapsible-content ${hostname === activeId ? '' : 'collapsed'}`}>
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
                            <table className="table table-dark">
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

    function WebsiteStatusCard({ website, status }) {
        return (
            <div className={`fcard text-white ${status === 200 ? 'bg-suc' : 'bg-fail'} mb-3`}>
                <h1 className="card-title text-dark">{website} {status === 200 ? <span className={"float-end"}><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg></span>
                    : <span className={"float-end"}><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512" fill={"black"} ><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg></span>}</h1>
                <div className="card-body">
                    <h5 className="text-dark">Status: {status === 200 ? 'Up' : 'Down, Error code: ' + status }</h5>
                </div>
            </div>
        );
    }

    function websites_url(websites){
        console.log(websites);
        return (
            <div className="container mt-4 headerflare">
                <h1 className={"headerflare"}>Website Status</h1>
                <div className="row">
                    {Object.entries(websites).map(([website, status]) => (
                        <div key={website} className="col-md-4">
                            <WebsiteStatusCard website={website} status={status} />
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    //Main ui function
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
        //console.log(cards)
        return (

            <div className="container">
                <div className="row w-100 m-2 p-2">
                    <header><h1>WatchTower</h1></header>

                    <div className="main">
                        <span className={"ani"}>D</span>
                        <span className={"ani"}>E</span>
                        <span className={"ani"}>F</span>
                        <span className={"ani"}>I</span>
                        <span className={"ani"}>N</span>
                        <span className={"ani"}>E</span>
                        <span className={"ani letter add-text"}>╳</span>
                        <span className={"ani"}>I</span>
                        <span className={"ani"}>N</span>
                    </div>
                </div>
                {
                    Object.keys(cards).map(key => cards[key])
                }
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
            {websites ? (websites_url(websites)) : (<p>Fetching website</p>)}
        </div>
    );
}

export default WatchTower;

