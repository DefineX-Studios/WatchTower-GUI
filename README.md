# WatchTower GUI

Welcome to WatchTower GUI! This project provides a user-friendly interface for visualizing data collected by the WatchTower Python application. It allows you to monitor and analyze the performance of multiple machines running WatchTower Python by plotting beautiful graphs generated from the data they send to a common master server.

## Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
    - [Installation](#installation)
    - [Configuration](#configuration)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [To-Do List](#to-do-list)
- [Contributing](#contributing)
- [License](#license)

## Introduction

WatchTower GUI serves as a visualization tool for WatchTower, a Python application that collects data from multiple machines and sends it to a central master server. This graphical user interface (GUI) helps you make sense of the data by plotting insightful graphs and checking the status of configured websites.

![PHOTO-2023-09-26-20-18-03](https://github.com/DefineX-Studios/WatchTower-GUI/assets/96978109/1d991aa5-56de-4a69-b15c-82c5632522dc)

### Features

- **Graphical Data Visualization**: View beautiful graphs generated from data collected by WatchTower Python.
- **Website Status Checker**: Monitor the status of websites configured in the `website.json` file.
- **Easy Configuration**: Simple setup with configuration files for server endpoints and websites to monitor.
- **Dynamic Server API Calls** (To-Do): Configure server API calls dynamically with a `config.json` file.
- **Email Alerts** (To-Do): Implement email alerts for websites that are down.

## Prerequisites

Before getting started, ensure you have the following prerequisites installed on your system:

- [Node.js](https://nodejs.org/) (for the frontend)
- WatchTower Python installed on target machines (for data collection)
   ```bash
   git clone https://github.com/DefineX-Studios/WatchTower.git
   ```

## Getting Started

### Installation

1. Clone this repository to your local machine.

   ```bash
   git clone https://github.com/DefineX-Studios/WatchTower-GUI.git
   ```

2. Navigate to the project's root directory.

   ```bash
   cd watchtower-gui
   ```

3. Install the required Node.js dependencies.

   ```bash
   npm install
   ```

### Configuration

#### Server Configuration

To configure the server endpoints where WatchTower Python backend servers are sending data, create a `config.json` file in the root directory and define the `location` parameter as the path where the data is stored on the master server.

Example `config.json`:

```json
{
  "location": "/home/server_info"
}
```

#### Website Configuration

To monitor website statuses, create a `website.json` file in the root directory with the following structure:

```json
{
  "website_name": "website_url"
}
```

For example:

```json
{
  "My Website": "https://example.com",
  "Another Website": "https://example.org"
}
```

## Usage

1. Start the backend server in the root directory. This will initiate the server.js file, and all API calls will be available at port 5000.

   ```bash
   node server.js
   ```

2. In the `frontend` folder, initiate React at port 3000.

   ```bash
   npm start
   ```

3. Open a web browser and navigate to `http://localhost:3000` to access the WatchTower GUI.

4. Explore the graphs generated from WatchTower Python data and monitor the status of configured websites.

## Project Structure

The project structure is organized as follows:

- `Node.js` (server backend)
- `frontend` (React frontend)
- `.gitignore`
- `package.json`
- `server.js`

## To-Do List

- Make server API calls dynamic and implement a `config.json` to store server configuration.
- Maybe add an emailing system for websites that are down.

## Contributing

Contributions are welcome! If you have any ideas, bug fixes, or improvements, please feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE). You are free to use, modify, and distribute the code as per the terms of the license.
