from flask import Flask, render_template, request, jsonify
import nmap

app = Flask(__name__)
nm = nmap.PortScanner(nmap_search_path=('D:\\Nmap\\nmap.exe',))

firewall_rules = []

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/scan', methods=['POST'])
def scan_network():
    data = request.json
    target = data.get('target')
    scan_type = data.get('scan_type')

    args = '-F'
    if scan_type == 'TCP SYN':
        args = '-sS -F'
    elif scan_type == 'UDP':
        args = '-sU -F'
    elif scan_type == 'Full Connect':
        args = '-sT -F'

    results = []
    try:
        nm.scan(hosts=target, arguments=args)
        
        # Parse the output
        for host in nm.all_hosts():
            for proto in nm[host].all_protocols():
                ports = nm[host][proto].keys()
                for port in sorted(ports):
                    state = nm[host][proto][port]['state']
                    name = nm[host][proto][port]['name']
                    results.append({
                        "ip": host,
                        "port": port,
                        "protocol": proto,
                        "service": name,
                        "status": state
                    })
        return jsonify({"status": "success", "data": results})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})

@app.route('/api/firewall/simulate', methods=['POST'])
def simulate_firewall():
    traffic = request.json.get('traffic')
    rules = request.json.get('rules')
    
    action = "ALLOW"
    
    for rule in rules:
        ip_match = rule['ip'] == '*' or rule['ip'] == traffic['ip']
        port_match = rule['port'] == '*' or str(rule['port']) == str(traffic['port'])
        proto_match = rule['protocol'] == 'ANY' or rule['protocol'].lower() == traffic['protocol'].lower()
        
        if ip_match and port_match and proto_match:
            action = rule['action']
            break
            
    return jsonify({"status": "success", "action": action, "traffic": traffic})

if __name__ == '__main__':
    app.run(debug=True)