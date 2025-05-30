// Main application logic
document.addEventListener('DOMContentLoaded', function() {
    // Case submission for officer dashboard
    const emergencyForm = document.getElementById('emergencyForm');
    if (emergencyForm) {
        emergencyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Collect form data
            const caseData = {
                caseNumber: document.getElementById('caseNumber').value,
                callerName: document.getElementById('callerName').value,
                callerPhone: document.getElementById('callerPhone').value,
                emergencyType: document.getElementById('emergencyType').value,
                description: document.getElementById('emergencyDescription').value,
                location: {
                    name: document.getElementById('incidentLocation').value,
                    lat: parseFloat(document.getElementById('latitude').textContent),
                    lng: parseFloat(document.getElementById('longitude').textContent)
                },
                referralStation: document.getElementById('referralStation').value,
                dateTime: new Date().toISOString(),
                status: 'pending',
                assignedOfficer: localStorage.getItem('currentUser') || 'Unknown Officer'
            };
            
            // Save case (in a real system, this would be an API call)
            let cases = JSON.parse(localStorage.getItem('emergencyCases')) || [];
            cases.push(caseData);
            localStorage.setItem('emergencyCases', JSON.stringify(cases));
            
            // Send SMS notifications (mock)
            const smsMessage = `[UPF EMS] New case ${caseData.caseNumber}: ${caseData.emergencyType} at ${caseData.location.name}. Caller: ${caseData.callerName} ${caseData.callerPhone}`;
            
            // Mock recipients based on station
            const recipients = {
                'naguru': ['DPC_Naguru', 'OC_Naguru', 'OPS_Naguru'],
                'kiira': ['DPC_Kiira', 'OC_Kiira', 'OPS_Kiira'],
                'ntinda': ['DPC_Ntinda', 'OC_Ntinda', 'OPS_Ntinda'],
                'jinja': ['DPC_Jinja', 'OC_Jinja', 'OPS_Jinja']
            };
            
            // Send to all recipients for the referred station
            recipients[caseData.referralStation]?.forEach(recipient => {
                sendSMSNotification(recipient, smsMessage);
            });
            
            alert(`Case ${caseData.caseNumber} submitted successfully and referred to ${caseData.referralStation}`);
            emergencyForm.reset();
            
            // Generate new case number
            const now = new Date();
            const year = now.getFullYear().toString().slice(-2);
            const month = (now.getMonth() + 1).toString().padStart(2, '0');
            const day = now.getDate().toString().padStart(2, '0');
            const sequence = Math.floor(Math.random() * 50) + 1;
            document.getElementById('caseNumber').value = `UPF/${year}${month}${day}/${sequence.toString().padStart(3, '0')}`;
            document.getElementById('reportDateTime').value = now.toLocaleString();
        });
    }
    
    // Case file creation for station dashboard
    const createCaseFileBtn = document.getElementById('createCaseFile');
    if (createCaseFileBtn) {
        createCaseFileBtn.addEventListener('click', function() {
            const caseNumber = document.getElementById('modalCaseNumber').textContent;
            const officerNotes = document.getElementById('officerNotes').value;
            
            // Create case file (in a real system, this would be an API call)
            const caseFile = {
                fileNumber: `CF/${new Date().getFullYear()}/${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
                caseNumber: caseNumber,
                notes: officerNotes,
                createdBy: localStorage.getItem('currentUser') || 'Unknown Officer',
                createdAt: new Date().toISOString(),
                status: 'open'
            };
            
            let caseFiles = JSON.parse(localStorage.getItem('caseFiles')) || [];
            caseFiles.push(caseFile);
            localStorage.setItem('caseFiles', JSON.stringify(caseFiles));
            
            alert(`Case file ${caseFile.fileNumber} created successfully for case ${caseNumber}`);
        });
    }
    
    // Report submission for station dashboard
    const reportForm = document.getElementById('stationReportForm');
    if (reportForm) {
        reportForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const reportData = {
                reportId: `RPT/${new Date().getFullYear()}/${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
                type: document.getElementById('reportType').value,
                date: document.getElementById('reportDate').value,
                period: document.getElementById('reportPeriod').value,
                content: document.getElementById('reportContent').value,
                submittedBy: localStorage.getItem('currentUser') || 'Unknown Officer',
                submittedAt: new Date().toISOString(),
                status: 'pending'
            };
            
            // Save report (in a real system, this would be an API call)
            let reports = JSON.parse(localStorage.getItem('stationReports')) || [];
            reports.push(reportData);
            localStorage.setItem('stationReports', JSON.stringify(reports));
            
            alert(`Report ${reportData.reportId} submitted successfully to National Command Center`);
            reportForm.reset();
        });
    }
    
    // Case escalation for station dashboard
    const escalationForm = document.getElementById('caseEscalationForm');
    if (escalationForm) {
        escalationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const escalationData = {
                caseNumber: document.getElementById('escalationCase').value,
                type: document.getElementById('escalationType').value,
                reason: document.getElementById('escalationReason').value,
                escalatedBy: localStorage.getItem('currentUser') || 'Unknown Officer',
                escalatedAt: new Date().toISOString(),
                status: 'pending'
            };
            
            // Save escalation (in a real system, this would be an API call)
            let escalations = JSON.parse(localStorage.getItem('caseEscalations')) || [];
            escalations.push(escalationData);
            localStorage.setItem('caseEscalations', JSON.stringify(escalations));
            
            alert(`Case ${escalationData.caseNumber} escalated successfully for ${escalationData.type}`);
            escalationForm.reset();
        });
    }
});
// Mock function to simulate sending SMS notifications
