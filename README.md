# Network Security Scanner & Firewall Visualizer

![Python](https://img.shields.io/badge/Python-3.x-blue?style=for-the-badge&logo=python)
![Flask](https://img.shields.io/badge/Flask-Backend-lightgrey?style=for-the-badge&logo=flask)
![JavaScript](https://img.shields.io/badge/JavaScript-Frontend-yellow?style=for-the-badge&logo=javascript)
![Nmap](https://img.shields.io/badge/Nmap-Scanner-red?style=for-the-badge)

A web-based educational and diagnostic tool designed to bridge fundamental network security concepts with practical application. This application allows users to scan target IP addresses for open ports and services, while also featuring a custom firewall simulator to visualize how traffic rules affect network packets.

---

## Features

- Active Network Scanning:** Perform TCP SYN, Full Connect, and UDP scans to discover open ports and running services using the Nmap engine.
- Firewall Simulator:** Build custom Allow/Deny rulesets based on Source IP, Port, and Protocol.
- Visual Traffic Flow:** Simulate incoming packets and visualize whether they are permitted or blocked by your active firewall rules.
- Dark-Themed UI:** A sleek, responsive, cybersecurity-inspired dashboard interface.

---

## Tech Stack

* **Frontend:** HTML5, CSS3, Vanilla JavaScript
* **Backend:** Python 3, Flask
* **Scanning Engine:** `nmap`, `python-nmap`

---

## Installation & Setup

### Prerequisites
1. **Python 3.x** installed on your machine.
2. **Nmap** executable installed and added to your system `PATH`. 
   * *Windows:* [Download Nmap](https://nmap.org/download.html)
   * *macOS:* `brew install nmap`
   * *Linux:* `sudo apt-get install nmap`

### Step-by-Step Setup

1. **Clone the repository (or create the project folder):**
   ```bash
   git clone [https://github.com/yourusername/net-sec-project.git](https://github.com/yourusername/net-sec-project.git)
   cd net-sec-project
   ```

2. **Create and activate a virtual environment:

```Bash
# On Windows
python -m venv venv
venv\Scripts\activate
```

```Bash
pip install Flask python-nmap
Run the application:
```
```Bash
python app.py
```
Open your browser: Navigate to http://127.0.0.1:5000 to view the dashboard.
```Bash
Project Structure
Plaintext
net-sec-project/
│
├── app.py                 # Core Flask backend and Nmap logic
├── templates/
│   └── index.html         # Main dashboard layout
└── static/
    ├── style.css          # Dark-theme styling and CSS layout
    └── script.js          # API calls and frontend logic
```
## How to Use
1. The Network Scanner
* Enter a target IP address (e.g., 127.0.0.1 or your router's IP like 192.168.1.1).
* Select the type of scan you wish to perform from the dropdown.
* Click Start Scan. Results will populate in the table below, showing discovered ports, protocols, and services.

2. The Firewall Simulator
* Add Rules: Use the Rule Inputs section to define what traffic to ALLOW or DENY. You can use specific IPs and Ports, or use * as a wildcard for "Any".
* Simulate Traffic: Enter test IP, Port, and Protocol details into the Traffic Simulator section.
* Observe Flow: Click Simulate Traffic to see a visual diagram indicating if the packet was successfully routed or dropped based on your priority rules.

## Disclaimer & Ethical Use

This tool is strictly for educational purposes and authorized auditing. Never scan a network, IP address, or device for which you do not have explicit permission. Unauthorized network scanning can be perceived as an attack and may violate local laws or your Internet Service Provider's Terms of Service. Always test responsibly on your local loopback address (127.0.0.1) or a dedicated lab environment.
