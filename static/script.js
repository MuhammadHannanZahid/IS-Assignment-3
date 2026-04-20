let firewallRules = [];

// --- Scanning Engine ---
async function startScan() {
    const target = document.getElementById('targetIp').value;
    const scanType = document.getElementById('scanType').value;
    const tbody = document.getElementById('resultsBody');
    
    tbody.innerHTML = "<tr><td colspan='5'>Scanning... Please wait.</td></tr>";
    
    const response = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target, scan_type: scanType })
    });
    
    const result = await response.json();
    tbody.innerHTML = "";
    
    if (result.status === "success") {
        result.data.forEach(row => {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${row.ip}</td><td>${row.port}</td><td>${row.protocol}</td><td>${row.service}</td><td>${row.status}</td>`;
            tbody.appendChild(tr);
        });
    } else {
        tbody.innerHTML = `<tr><td colspan='5'>Error: ${result.message}</td></tr>`;
    }
}

// --- Firewall Simulation ---
function addRule() {
    const action = document.getElementById('fwAction').value;
    const ip = document.getElementById('fwIp').value || '*';
    const port = document.getElementById('fwPort').value || '*';
    const protocol = document.getElementById('fwProto').value;
    
    firewallRules.push({ action, ip, port, protocol });
    updateRulesUI();
}

function updateRulesUI() {
    const list = document.getElementById('rulesList');
    list.innerHTML = "";
    firewallRules.forEach((rule, index) => {
        const li = document.createElement('li');
        li.textContent = `${index + 1}. [${rule.action}] IP: ${rule.ip} | Port: ${rule.port} | Protocol: ${rule.protocol}`;
        list.appendChild(li);
    });
}

async function simulateTraffic() {
    const ip = document.getElementById('simIp').value;
    const port = document.getElementById('simPort').value;
    const protocol = document.getElementById('simProto').value;
    const diagramBox = document.getElementById('flowDiagram');
    
    const response = await fetch('/api/firewall/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            traffic: { ip, port, protocol },
            rules: firewallRules
        })
    });
    
    const result = await response.json();
    
    // Simple visual flow diagram logic
    let color = result.action === "ALLOW" ? "green" : "red";
    diagramBox.innerHTML = `
        <div style="border: 2px solid ${color}; padding: 10px; margin-top: 10px;">
            <strong>Incoming Packet:</strong> ${ip}:${port} (${protocol}) <br>
            <strong>Result:</strong> <span style="color:${color}; font-weight:bold;">${result.action}</span>
        </div>
    `;
}