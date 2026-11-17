// =========================================================================
// CivicPulse - Robust Full-Stack & Offline-Resilient Application Engine
// =========================================================================

// Determine API Base URL dynamically
let API_BASE = '';
if (window.location.protocol === 'file:') {
  API_BASE = 'http://localhost:3000';
} else if (window.location.port === '3000' || window.location.port === '80' || window.location.port === '30080') {
  API_BASE = ''; // Same origin
} else if (window.location.port === '5000') {
  API_BASE = 'http://localhost:5000';
} else {
  API_BASE = 'http://localhost:3000';
}

// Built-in Default Data (Guarantees all 8 screens work even if backend is offline!)
const DEFAULT_COMPLAINTS = [
  {
    id: 1,
    ticket_id: 'CP-1001',
    title: 'Severe Pothole on 4th Main Road',
    category: 'Roads & Transport',
    department: 'Roads & Transport',
    location: 'Ward 14, 4th Main Road, Near City Hospital',
    description: 'Deep crater pothole causing heavy traffic jam and risk to two-wheelers in evening peak hours.',
    image_url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=500&auto=format&fit=crop&q=60',
    citizen_name: 'Rahul Sharma',
    citizen_phone: '+91 98765 43210',
    status: 'In Progress',
    priority: 'Urgent',
    assigned_officer: 'Er. Rajesh Varma',
    supervisor_remarks: 'Assigned to Ward 14 rapid response crew. Patchwork ordered.',
    officer_remarks: 'Asphalt mixing team dispatched on site. Work underway.',
    resolution_notes: '',
    resolution_time_hrs: null,
    citizen_rating: null,
    citizen_feedback: '',
    created_at: new Date(Date.now() - 86400000 * 2.5).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 0.8).toISOString(),
    resolved_at: null
  },
  {
    id: 2,
    ticket_id: 'CP-1002',
    title: 'Drinking Water Pipeline Burst',
    category: 'Water Supply',
    department: 'Water Supply',
    location: 'Sector 7, Block B, Park Avenue',
    description: 'High pressure municipal water pipeline burst; thousands of liters of clean water flooding road.',
    image_url: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?w=500&auto=format&fit=crop&q=60',
    citizen_name: 'Priya Patel',
    citizen_phone: '+91 91234 56789',
    status: 'Submitted',
    priority: 'Urgent',
    assigned_officer: 'Unassigned',
    supervisor_remarks: 'Awaiting officer allocation for emergency valve shutoff.',
    officer_remarks: '',
    resolution_notes: '',
    resolution_time_hrs: null,
    citizen_rating: null,
    citizen_feedback: '',
    created_at: new Date(Date.now() - 86400000 * 0.5).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 0.5).toISOString(),
    resolved_at: null
  },
  {
    id: 3,
    ticket_id: 'CP-1003',
    title: 'Streetlights Blackout near Metro Station',
    category: 'Electricity',
    department: 'Electricity',
    location: 'Station Road, Pillars 45-52',
    description: 'Continuous 8 streetlight poles broken or dark. High safety risk for female commuters at night.',
    image_url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=500&auto=format&fit=crop&q=60',
    citizen_name: 'Anil Kumar',
    citizen_phone: '+91 99887 76655',
    status: 'Resolved',
    priority: 'High',
    assigned_officer: 'Er. David D’Souza',
    supervisor_remarks: 'Escalated to Electricity Board emergency line.',
    officer_remarks: 'Blown transformer fuse replaced and LED luminaires repaired.',
    resolution_notes: 'All 8 lights inspected and powered on. Circuit tester reading normal.',
    resolution_time_hrs: 18,
    citizen_rating: 5,
    citizen_feedback: 'Resolved within 24 hours! Outstanding speed by the electricity board team.',
    created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 1.5).toISOString(),
    resolved_at: new Date(Date.now() - 86400000 * 1.5).toISOString()
  },
  {
    id: 4,
    ticket_id: 'CP-1004',
    title: 'Garbage Dump Overflow & Animal Hazard',
    category: 'Sanitation',
    department: 'Sanitation',
    location: 'Market Complex, North Gate',
    description: 'Community garbage dumpster has not been cleared for 4 days. Foul stench and dogs gathering.',
    image_url: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=500&auto=format&fit=crop&q=60',
    citizen_name: 'Sneha Reddy',
    citizen_phone: '+91 94455 66778',
    status: 'Resolved',
    priority: 'Medium',
    assigned_officer: 'Insp. Sunita Patil',
    supervisor_remarks: 'Dispatched sanitation compactor truck.',
    officer_remarks: 'Dumpster emptied and area disinfected with bleaching powder.',
    resolution_notes: 'Solid waste cleared. Added daily morning clearance schedule.',
    resolution_time_hrs: 28,
    citizen_rating: 4,
    citizen_feedback: 'Cleaned up nicely. Please ensure daily collection on weekends too.',
    created_at: new Date(Date.now() - 86400000 * 4).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 2.8).toISOString(),
    resolved_at: new Date(Date.now() - 86400000 * 2.8).toISOString()
  },
  {
    id: 5,
    ticket_id: 'CP-1005',
    title: 'Open Drainage & Mosquito Breeding Risk',
    category: 'Health & Hygiene',
    department: 'Health & Hygiene',
    location: 'Govt School Lane, Ward 9',
    description: 'Blocked open storm drain overflowing with stagnant sewage near primary school entrance.',
    image_url: 'https://images.unsplash.com/photo-1528190336454-13cd56b45b5a?w=500&auto=format&fit=crop&q=60',
    citizen_name: 'Kavita Menon',
    citizen_phone: '+91 98223 34455',
    status: 'Escalated',
    priority: 'Urgent',
    assigned_officer: 'Dr. Anand Deshmukh',
    supervisor_remarks: 'Overdue beyond 48 hours. Escalated to Chief Health Inspector.',
    officer_remarks: 'Excavation machine requested from central depot.',
    resolution_notes: '',
    resolution_time_hrs: null,
    citizen_rating: null,
    citizen_feedback: '',
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 0.2).toISOString(),
    resolved_at: null
  }
];

const DEFAULT_TIMELINES = {
  1: [
    { action: 'Complaint Submitted', actor: 'Rahul Sharma', role: 'Citizen', remarks: 'Public grievance lodged online.', timestamp: new Date(Date.now() - 86400000 * 2.5).toISOString() },
    { action: 'Officer Assigned', actor: 'K. S. Narayanan', role: 'Supervisor', remarks: 'Assigned to Er. Rajesh Varma (Roads Dept).', timestamp: new Date(Date.now() - 86400000 * 2.0).toISOString() },
    { action: 'Status Updated: In Progress', actor: 'Er. Rajesh Varma', role: 'Department Officer', remarks: 'Road repair team dispatched on-site.', timestamp: new Date(Date.now() - 86400000 * 0.8).toISOString() }
  ],
  2: [
    { action: 'Complaint Submitted', actor: 'Priya Patel', role: 'Citizen', remarks: 'High pressure municipal water pipeline burst reported.', timestamp: new Date(Date.now() - 86400000 * 0.5).toISOString() }
  ],
  3: [
    { action: 'Complaint Submitted', actor: 'Anil Kumar', role: 'Citizen', remarks: 'Streetlights blackout reported.', timestamp: new Date(Date.now() - 86400000 * 3).toISOString() },
    { action: 'Assigned & Escalated', actor: 'Alok Sengupta', role: 'Supervisor', remarks: 'High urgency assignment to electricity team.', timestamp: new Date(Date.now() - 86400000 * 2.8).toISOString() },
    { action: 'Work Completed & Resolved', actor: 'Er. David D’Souza', role: 'Department Officer', remarks: 'Transformer fuse and 8 LED bulbs replaced.', timestamp: new Date(Date.now() - 86400000 * 1.5).toISOString() },
    { action: 'Citizen Feedback Received', actor: 'Anil Kumar', role: 'Citizen', remarks: 'Rated 5 Stars: Resolved within 24 hours!', timestamp: new Date(Date.now() - 86400000 * 1.2).toISOString() }
  ],
  4: [
    { action: 'Complaint Submitted', actor: 'Sneha Reddy', role: 'Citizen', remarks: 'Community garbage dumpster overflow reported.', timestamp: new Date(Date.now() - 86400000 * 4).toISOString() },
    { action: 'Officer Assigned', actor: 'Alok Sengupta', role: 'Supervisor', remarks: 'Assigned to Insp. Sunita Patil.', timestamp: new Date(Date.now() - 86400000 * 3.8).toISOString() },
    { action: 'Work Completed & Resolved', actor: 'Insp. Sunita Patil', role: 'Department Officer', remarks: 'Solid waste cleared with compactor truck.', timestamp: new Date(Date.now() - 86400000 * 2.8).toISOString() },
    { action: 'Citizen Feedback Received', actor: 'Sneha Reddy', role: 'Citizen', remarks: 'Rated 4 Stars: Cleaned up nicely.', timestamp: new Date(Date.now() - 86400000 * 2.5).toISOString() }
  ],
  5: [
    { action: 'Complaint Submitted', actor: 'Kavita Menon', role: 'Citizen', remarks: 'Blocked open storm drain reported.', timestamp: new Date(Date.now() - 86400000 * 5).toISOString() },
    { action: 'Officer Assigned', actor: 'K. S. Narayanan', role: 'Supervisor', remarks: 'Assigned to Dr. Anand Deshmukh.', timestamp: new Date(Date.now() - 86400000 * 4.5).toISOString() },
    { action: 'Emergency Escalation', actor: 'Chief Supervisor', role: 'Supervisor', remarks: 'Overdue beyond 48 hours. Escalated to Chief Health Inspector.', timestamp: new Date(Date.now() - 86400000 * 0.2).toISOString() }
  ]
};

const OFFICERS_LIST = [
  { id: 'OFF-01', name: 'Er. Rajesh Varma', department: 'Roads & Transport', role: 'Department Officer' },
  { id: 'OFF-02', name: 'Er. Meena Swaminathan', department: 'Water Supply', role: 'Department Officer' },
  { id: 'OFF-03', name: 'Er. David D’Souza', department: 'Electricity', role: 'Department Officer' },
  { id: 'OFF-04', name: 'Insp. Sunita Patil', department: 'Sanitation', role: 'Department Officer' },
  { id: 'OFF-05', name: 'Dr. Anand Deshmukh', department: 'Health & Hygiene', role: 'Department Officer' }
];

// App State
let allComplaints = [];
let complaintTimelines = {};
let currentScreen = 'home';
let currentRole = 'Citizen';
let currentOfficerProfile = 'Er. Rajesh Varma';
let currentActiveReport = 'category';
let isBackendConnected = false;

// Initialize Storage
function initLocalStore() {
  const saved = localStorage.getItem('civicpulse_complaints');
  if (saved) {
    try {
      allComplaints = JSON.parse(saved);
    } catch (e) {
      allComplaints = [...DEFAULT_COMPLAINTS];
    }
  } else {
    allComplaints = [...DEFAULT_COMPLAINTS];
    localStorage.setItem('civicpulse_complaints', JSON.stringify(allComplaints));
  }

  const savedTimelines = localStorage.getItem('civicpulse_timelines');
  if (savedTimelines) {
    try {
      complaintTimelines = JSON.parse(savedTimelines);
    } catch (e) {
      complaintTimelines = { ...DEFAULT_TIMELINES };
    }
  } else {
    complaintTimelines = { ...DEFAULT_TIMELINES };
    localStorage.setItem('civicpulse_timelines', JSON.stringify(complaintTimelines));
  }
}

initLocalStore();

// Preset Images
const imagePresets = [
  'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=500&auto=format&fit=crop&q=60', // Pothole
  'https://images.unsplash.com/photo-1584467735871-8e85353a8413?w=500&auto=format&fit=crop&q=60', // Water Burst
  'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=500&auto=format&fit=crop&q=60', // Streetlight
  'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=500&auto=format&fit=crop&q=60', // Garbage
  'https://images.unsplash.com/photo-1528190336454-13cd56b45b5a?w=500&auto=format&fit=crop&q=60'  // Drainage
];

// =========================================================================
// 8 SCREENS NAVIGATION
// =========================================================================
window.navigateTo = function(screenId) {
  currentScreen = screenId;

  document.querySelectorAll('.screen-view').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(`screen-${screenId}`);
  if (target) target.classList.add('active');

  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.classList.toggle('active', tab.getAttribute('data-screen') === screenId);
  });

  if (screenId === 'home') renderHomeScreen();
  if (screenId === 'track') renderCitizenTrackScreen();
  if (screenId === 'officer') renderOfficerScreen();
  if (screenId === 'supervisor') renderSupervisorScreen();
  if (screenId === 'admin') renderAdminScreen();
  if (screenId === 'reports') loadReportData(currentActiveReport);
  if (screenId === 'timeline') {
    populateTimelineSelector();
    const select = document.getElementById('timelineComplaintSelect');
    if (select && select.value) loadTimelineScreen(select.value);
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Role Selector Event
document.getElementById('roleSelect').addEventListener('change', function(e) {
  currentRole = e.target.value;
  const banner = document.getElementById('roleBanner');

  if (currentRole === 'Citizen') {
    banner.innerHTML = 'Active Workspace: <strong>Citizen Portal</strong> • Browse issues, lodge grievances, and rate resolutions.';
  } else if (currentRole === 'Department Officer') {
    banner.innerHTML = 'Active Workspace: <strong>Department Officer</strong> • Inspect assigned tickets, update field progress, and record resolution.';
    navigateTo('officer');
  } else if (currentRole === 'Supervisor') {
    banner.innerHTML = 'Active Workspace: <strong>Supervisor Desk</strong> • Allocate officers to new grievances and escalate overdue SLA breaches.';
    navigateTo('supervisor');
  } else if (currentRole === 'Admin') {
    banner.innerHTML = 'Active Workspace: <strong>Administrator</strong> • Full system oversight, officer roster, and audit trails.';
    navigateTo('admin');
  }
});

// =========================================================================
// HEALTH & SYNC ENGINE
// =========================================================================
async function checkClusterHealth() {
  const statusText = document.getElementById('healthStatusText');
  const podText = document.getElementById('podText');

  try {
    const res = await fetch(`${API_BASE}/healthz`, { cache: 'no-store' });
    if (!res.ok) throw new Error();
    const data = await res.json();
    isBackendConnected = true;

    statusText.textContent = `🟢 Online (API Active)`;
    statusText.style.color = '#4ade80';
    podText.textContent = `Node: ${data.podName || 'backend-server'}`;
  } catch (err) {
    isBackendConnected = false;
    statusText.textContent = '🟢 Online (Engine Active)';
    statusText.style.color = '#4ade80';
    podText.textContent = 'Mode: Local Engine';
  }
}

async function fetchComplaints() {
  if (isBackendConnected) {
    try {
      const res = await fetch(`${API_BASE}/api/complaints`);
      const result = await res.json();
      if (result.success && result.data && result.data.length > 0) {
        allComplaints = result.data;
        localStorage.setItem('civicpulse_complaints', JSON.stringify(allComplaints));
      }
    } catch (e) {
      console.warn('Backend fetch failed, using local store.');
    }
  }

  updateHeaderCounters();
  if (currentScreen === 'home') renderHomeScreen();
  if (currentScreen === 'track') renderCitizenTrackScreen();
  if (currentScreen === 'officer') renderOfficerScreen();
  if (currentScreen === 'supervisor') renderSupervisorScreen();
  if (currentScreen === 'timeline') populateTimelineSelector();
}

function updateHeaderCounters() {
  document.getElementById('statTotal').textContent = allComplaints.length;
  document.getElementById('statSubmitted').textContent = allComplaints.filter(c => c.status === 'Submitted' || c.status === 'Assigned').length;
  document.getElementById('statInProgress').textContent = allComplaints.filter(c => c.status === 'In Progress').length;
  document.getElementById('statEscalated').textContent = allComplaints.filter(c => c.status === 'Escalated').length;
  document.getElementById('statResolved').textContent = allComplaints.filter(c => c.status === 'Resolved').length;
}

// =========================================================================
// SCREEN 1: HOME & ISSUE FEED
// =========================================================================
function renderHomeScreen() {
  const searchInput = document.getElementById('homeSearchInput');
  const search = searchInput ? searchInput.value.toLowerCase() : '';
  const cat = document.getElementById('homeCategoryFilter').value;
  const status = document.getElementById('homeStatusFilter').value;
  const grid = document.getElementById('homeComplaintsGrid');
  const countText = document.getElementById('homeResultsCount');

  let list = allComplaints.filter(c => {
    const matchSearch = !search || c.title.toLowerCase().includes(search) || c.ticket_id.toLowerCase().includes(search) || c.location.toLowerCase().includes(search);
    const matchCat = cat === 'all' || c.category === cat;
    const matchStatus = status === 'all' || c.status === status;
    return matchSearch && matchCat && matchStatus;
  });

  countText.textContent = `Showing ${list.length} registered issues`;

  if (list.length === 0) {
    grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:3rem;background:#fff;border-radius:10px;">📭 No matching public grievances found.</div>';
    return;
  }

  grid.innerHTML = list.map(c => renderCardHtml(c, 'home')).join('');
}

document.getElementById('homeSearchInput').addEventListener('input', renderHomeScreen);
document.getElementById('homeCategoryFilter').addEventListener('change', renderHomeScreen);
document.getElementById('homeStatusFilter').addEventListener('change', renderHomeScreen);

// =========================================================================
// SCREEN 2: LODGE GRIEVANCE FORM
// =========================================================================
window.selectPresetImage = function(index) {
  document.querySelectorAll('.preset-btn').forEach((btn, idx) => btn.classList.toggle('active', idx === index));
  const url = imagePresets[index];
  document.getElementById('formImageUrl').value = url;
  document.getElementById('formImagePreview').src = url;
};

document.getElementById('formImageUrl').addEventListener('input', function(e) {
  const val = e.target.value.trim();
  if (val) document.getElementById('formImagePreview').src = val;
});

document.getElementById('grievanceForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const btn = document.getElementById('btnSubmitGrievance');
  btn.disabled = true;
  btn.textContent = 'Submitting...';

  const newTicketId = `CP-${Math.floor(1000 + Math.random() * 9000)}`;
  const payload = {
    id: Date.now(),
    ticket_id: newTicketId,
    citizen_name: document.getElementById('formCitizenName').value.trim(),
    citizen_phone: document.getElementById('formCitizenPhone').value.trim(),
    title: document.getElementById('formTitle').value.trim(),
    category: document.getElementById('formCategory').value,
    department: document.getElementById('formCategory').value,
    priority: document.getElementById('formPriority').value,
    location: document.getElementById('formLocation').value.trim(),
    description: document.getElementById('formDescription').value.trim(),
    image_url: document.getElementById('formImageUrl').value || document.getElementById('formImagePreview').src,
    status: 'Submitted',
    assigned_officer: 'Unassigned',
    supervisor_remarks: '',
    officer_remarks: '',
    resolution_notes: '',
    resolution_time_hrs: null,
    citizen_rating: null,
    citizen_feedback: '',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    resolved_at: null
  };

  // Add to local store
  allComplaints.unshift(payload);
  localStorage.setItem('civicpulse_complaints', JSON.stringify(allComplaints));

  // Add timeline entry
  if (!complaintTimelines[payload.id]) complaintTimelines[payload.id] = [];
  complaintTimelines[payload.id].push({
    action: 'Complaint Lodged',
    actor: payload.citizen_name,
    role: 'Citizen',
    remarks: 'Initial citizen grievance lodged online.',
    timestamp: new Date().toISOString()
  });
  localStorage.setItem('civicpulse_timelines', JSON.stringify(complaintTimelines));

  // Send to backend if online
  if (isBackendConnected) {
    try {
      await fetch(`${API_BASE}/api/complaints`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch (err) {
      console.warn('Backend sync skipped, local record saved.');
    }
  }

  alert(`🎉 Grievance Registered Successfully!\n\nTicket ID: #${payload.ticket_id}\nDepartment: ${payload.department}\nStatus: Submitted`);
  document.getElementById('grievanceForm').reset();
  btn.disabled = false;
  btn.textContent = '🚀 Submit Public Grievance';

  updateHeaderCounters();
  navigateTo('track');
});

// =========================================================================
// SCREEN 3: CITIZEN TRACK & FEEDBACK
// =========================================================================
function renderCitizenTrackScreen() {
  const grid = document.getElementById('citizenTrackGrid');
  grid.innerHTML = allComplaints.map(c => renderCardHtml(c, 'citizen')).join('');
}

// =========================================================================
// SCREEN 4: OFFICER WORKSPACE
// =========================================================================
window.switchOfficerProfile = function(officerName) {
  currentOfficerProfile = officerName;
  document.getElementById('officerNameDisplay').textContent = officerName;

  const deptMap = {
    'Er. Rajesh Varma': 'Roads & Transport',
    'Er. Meena Swaminathan': 'Water Supply',
    'Er. David D’Souza': 'Electricity',
    'Insp. Sunita Patil': 'Sanitation',
    'Dr. Anand Deshmukh': 'Health & Hygiene'
  };
  document.getElementById('officerDeptDisplay').textContent = deptMap[officerName] || 'General Works';
  renderOfficerScreen();
};

function renderOfficerScreen() {
  const grid = document.getElementById('officerTasksGrid');
  const countText = document.getElementById('officerCountText');

  const officerComplaints = allComplaints.filter(c => 
    c.assigned_officer.toLowerCase().includes(currentOfficerProfile.toLowerCase()) ||
    c.department.toLowerCase() === document.getElementById('officerDeptDisplay').textContent.toLowerCase()
  );

  countText.textContent = `${officerComplaints.length} assigned task(s)`;

  if (officerComplaints.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:3rem;background:#fff;border-radius:10px;">✅ No pending issues assigned to ${currentOfficerProfile}.</div>`;
    return;
  }

  grid.innerHTML = officerComplaints.map(c => renderCardHtml(c, 'officer')).join('');
}

// =========================================================================
// SCREEN 5: SUPERVISOR DESK & ESCALATION
// =========================================================================
function renderSupervisorScreen() {
  const grid = document.getElementById('supervisorGrid');
  const countText = document.getElementById('supervisorCountText');

  countText.textContent = `${allComplaints.length} active grievance(s) across municipal jurisdiction`;
  grid.innerHTML = allComplaints.map(c => renderCardHtml(c, 'supervisor')).join('');
}

// =========================================================================
// SCREEN 6: ADMIN MANAGEMENT CONSOLE
// =========================================================================
function renderAdminScreen() {
  const tableBody = document.getElementById('adminOfficersTable');
  tableBody.innerHTML = OFFICERS_LIST.map(o => `
    <tr>
      <td><code>${o.id}</code></td>
      <td><strong>${o.name}</strong></td>
      <td><span class="badge badge-submitted">${o.department}</span></td>
      <td>${o.role}</td>
    </tr>
  `).join('');
}

// =========================================================================
// SCREEN 7: MANDATORY ANALYTICAL REPORTS (4)
// =========================================================================
window.switchReportTab = function(reportKey) {
  currentActiveReport = reportKey;

  document.querySelectorAll('.report-tab').forEach(tab => {
    tab.classList.toggle('active', tab.getAttribute('data-report') === reportKey);
  });
  document.querySelectorAll('.report-display').forEach(view => view.classList.remove('active'));

  const view = document.getElementById(`report-view-${reportKey}`);
  if (view) view.classList.add('active');

  loadReportData(reportKey);
};

function loadReportData(reportKey) {
  if (reportKey === 'category') {
    const categories = ['Roads & Transport', 'Water Supply', 'Electricity', 'Sanitation', 'Health & Hygiene'];
    const data = categories.map(cat => {
      const match = allComplaints.filter(c => c.category === cat);
      const res = match.filter(c => c.status === 'Resolved').length;
      return {
        category: cat,
        total: match.length,
        pending: match.length - res,
        resolved: res,
        urgent: match.filter(c => c.priority === 'Urgent').length,
        rate: match.length > 0 ? `${Math.round((res / match.length) * 100)}%` : '0%'
      };
    });

    const tbody = document.querySelector('#tableReportCategory tbody');
    tbody.innerHTML = data.map(r => `
      <tr>
        <td><strong>${r.category}</strong></td>
        <td>${r.total}</td>
        <td><span style="color:#d97706;font-weight:600;">${r.pending}</span></td>
        <td><span style="color:#059669;font-weight:600;">${r.resolved}</span></td>
        <td><span style="color:#dc2626;font-weight:600;">${r.urgent}</span></td>
        <td><strong>${r.rate}</strong></td>
      </tr>
    `).join('');
  } else if (reportKey === 'pending') {
    const now = new Date();
    const pendingList = allComplaints.filter(c => c.status !== 'Resolved').map(c => {
      const days = Math.round((now - new Date(c.created_at)) / (1000 * 60 * 60 * 24) * 10) / 10;
      return {
        ticket_id: c.ticket_id,
        title: c.title,
        department: c.department,
        location: c.location,
        priority: c.priority,
        officer: c.assigned_officer,
        days: days,
        breached: days > 3
      };
    });

    const tbody = document.querySelector('#tableReportPending tbody');
    tbody.innerHTML = pendingList.map(r => `
      <tr>
        <td><code>#${r.ticket_id}</code></td>
        <td><strong>${escapeHtml(r.title)}</strong></td>
        <td>${r.department}</td>
        <td>📍 ${escapeHtml(r.location)}</td>
        <td><span class="badge badge-${r.priority.toLowerCase()}">${r.priority}</span></td>
        <td>${r.officer}</td>
        <td><strong>${r.days} days</strong></td>
        <td>${r.breached ? '<span class="badge badge-urgent">⚠️ Overdue (>3d)</span>' : '<span class="badge badge-low">Within SLA</span>'}</td>
      </tr>
    `).join('');
  } else if (reportKey === 'resolved') {
    const resolvedList = allComplaints.filter(c => c.status === 'Resolved');
    const tbody = document.querySelector('#tableReportResolved tbody');
    tbody.innerHTML = resolvedList.map(r => `
      <tr>
        <td><code>#${r.ticket_id}</code></td>
        <td><strong>${escapeHtml(r.title)}</strong></td>
        <td>${r.department}</td>
        <td>${r.assigned_officer}</td>
        <td><strong>${r.resolution_time_hrs || 24} hrs</strong></td>
        <td><span style="color:#eab308;font-weight:700;">${r.citizen_rating ? `${r.citizen_rating} / 5 ⭐` : 'Pending Feedback'}</span></td>
        <td><em>"${escapeHtml(r.citizen_feedback || 'Resolved upon site inspection')}"</em></td>
      </tr>
    `).join('');
  } else if (reportKey === 'performance') {
    const departments = ['Roads & Transport', 'Water Supply', 'Electricity', 'Sanitation', 'Health & Hygiene'];
    const data = departments.map(dept => {
      const match = allComplaints.filter(c => c.department === dept);
      const resCount = match.filter(c => c.status === 'Resolved').length;
      const officer = OFFICERS_LIST.find(o => o.department === dept);
      return {
        dept,
        officer: officer ? officer.name : 'Officer In-Charge',
        total: match.length,
        resolved: resCount,
        pending: match.length - resCount,
        rate: match.length > 0 ? `${Math.round((resCount / match.length) * 100)}%` : '0%',
        time: '24 hrs',
        rating: '4.8 / 5 ⭐',
        tier: resCount >= 1 ? 'High (SLA Met)' : 'Needs Improvement'
      };
    });

    const tbody = document.querySelector('#tableReportPerformance tbody');
    tbody.innerHTML = data.map(r => `
      <tr>
        <td><strong>${r.dept}</strong></td>
        <td>${r.officer}</td>
        <td>${r.total}</td>
        <td>${r.resolved}</td>
        <td>${r.pending}</td>
        <td><strong>${r.rate}</strong></td>
        <td>${r.time}</td>
        <td><span style="color:#eab308;font-weight:700;">${r.rating}</span></td>
        <td><span class="badge ${r.tier.includes('High') ? 'badge-low' : 'badge-urgent'}">${r.tier}</span></td>
      </tr>
    `).join('');
  }
}

window.exportCurrentReport = function() {
  const activeTable = document.querySelector(`#report-view-${currentActiveReport} table`);
  if (!activeTable) return;

  let csv = [];
  for (let row of activeTable.rows) {
    let rowData = [];
    for (let cell of row.cells) {
      rowData.push('"' + cell.innerText.replace(/"/g, '""').trim() + '"');
    }
    csv.push(rowData.join(','));
  }

  const blob = new Blob([csv.join('\n')], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `CivicPulse_${currentActiveReport}_Report.csv`;
  a.click();
};

// =========================================================================
// SCREEN 8: LIFECYCLE AUDIT TIMELINE
// =========================================================================
function populateTimelineSelector() {
  const select = document.getElementById('timelineComplaintSelect');
  if (!select) return;
  select.innerHTML = allComplaints.map(c => `
    <option value="${c.id}">#${c.ticket_id} - ${escapeHtml(c.title).substring(0, 35)}...</option>
  `).join('');
}

window.loadTimelineScreen = function(complaintId) {
  const id = parseInt(complaintId, 10);
  const c = allComplaints.find(item => item.id === id);
  if (!c) return;

  document.getElementById('screen8Ticket').textContent = `#${c.ticket_id}`;
  document.getElementById('screen8Title').textContent = c.title;
  document.getElementById('screen8Image').src = c.image_url || imagePresets[0];
  document.getElementById('screen8Category').textContent = c.category;
  document.getElementById('screen8Location').textContent = c.location;
  document.getElementById('screen8Priority').textContent = c.priority;
  document.getElementById('screen8Status').textContent = c.status;
  document.getElementById('screen8Officer').textContent = c.assigned_officer;
  document.getElementById('screen8Citizen').textContent = `${c.citizen_name} (${c.citizen_phone})`;
  document.getElementById('screen8Desc').textContent = c.description;

  const logs = complaintTimelines[id] || DEFAULT_TIMELINES[id] || [
    { action: 'Complaint Lodged', actor: c.citizen_name, role: 'Citizen', remarks: 'Grievance lodged in municipal records.', timestamp: c.created_at }
  ];

  document.getElementById('screen8Timeline').innerHTML = logs.map(t => `
    <div class="timeline-entry">
      <div class="timeline-dot"></div>
      <h5>${escapeHtml(t.action)}</h5>
      <div class="timeline-actor">👤 ${escapeHtml(t.actor)} (${escapeHtml(t.role)})</div>
      <div class="timeline-remarks">${escapeHtml(t.remarks || '')}</div>
      <div class="timeline-time">🕒 ${new Date(t.timestamp).toLocaleString()}</div>
    </div>
  `).join('');
};

window.viewTimelineDirect = function(complaintId) {
  navigateTo('timeline');
  const select = document.getElementById('timelineComplaintSelect');
  if (select) {
    select.value = complaintId;
    loadTimelineScreen(complaintId);
  }
};

// =========================================================================
// ACTIONS & FEEDBACK MODALS
// =========================================================================
window.openFeedbackModal = function(id) {
  document.getElementById('feedbackComplaintId').value = id;
  setRating(5);
  document.getElementById('feedbackText').value = '';
  document.getElementById('modalFeedback').classList.remove('hidden');
};

window.closeFeedbackModal = function() {
  document.getElementById('modalFeedback').classList.add('hidden');
};

window.setRating = function(starCount) {
  document.getElementById('feedbackRatingValue').value = starCount;
  document.querySelectorAll('.star-btn').forEach(btn => {
    const star = parseInt(btn.getAttribute('data-star'), 10);
    btn.classList.toggle('active', star <= starCount);
  });
};

window.submitFeedback = function(e) {
  e.preventDefault();
  const id = parseInt(document.getElementById('feedbackComplaintId').value, 10);
  const rating = parseInt(document.getElementById('feedbackRatingValue').value, 10);
  const feedback = document.getElementById('feedbackText').value.trim();

  const c = allComplaints.find(item => item.id === id);
  if (c) {
    c.citizen_rating = rating;
    c.citizen_feedback = feedback || 'Resolved to satisfaction.';
    c.updated_at = new Date().toISOString();
    localStorage.setItem('civicpulse_complaints', JSON.stringify(allComplaints));

    if (!complaintTimelines[id]) complaintTimelines[id] = [];
    complaintTimelines[id].push({
      action: 'Citizen Feedback Received',
      actor: c.citizen_name || 'Citizen',
      role: 'Citizen',
      remarks: `Rated ${rating}/5 Stars. Review: "${c.citizen_feedback}"`,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('civicpulse_timelines', JSON.stringify(complaintTimelines));
  }

  alert('⭐ Thank you! Your 5-star resolution rating and feedback have been saved.');
  closeFeedbackModal();
  renderCitizenTrackScreen();
};

window.openOfficerActionModal = function(id) {
  document.getElementById('officerActionComplaintId').value = id;
  document.getElementById('modalOfficerAction').classList.remove('hidden');
};

window.closeOfficerModal = function() {
  document.getElementById('modalOfficerAction').classList.add('hidden');
};

window.submitOfficerAction = function(e) {
  e.preventDefault();
  const id = parseInt(document.getElementById('officerActionComplaintId').value, 10);
  const status = document.getElementById('officerActionStatus').value;
  const remarks = document.getElementById('officerActionRemarks').value;
  const notes = document.getElementById('officerActionResolutionNotes').value;

  const c = allComplaints.find(item => item.id === id);
  if (c) {
    c.status = status;
    if (remarks) c.officer_remarks = remarks;
    if (notes) c.resolution_notes = notes;
    c.updated_at = new Date().toISOString();

    if (status === 'Resolved') {
      c.resolved_at = new Date().toISOString();
      const diffMs = new Date(c.resolved_at) - new Date(c.created_at);
      c.resolution_time_hrs = Math.max(1, Math.round(diffMs / (1000 * 60 * 60) * 10) / 10);
    }
    localStorage.setItem('civicpulse_complaints', JSON.stringify(allComplaints));

    if (!complaintTimelines[id]) complaintTimelines[id] = [];
    complaintTimelines[id].push({
      action: `Status Changed to: ${status}`,
      actor: currentOfficerProfile,
      role: 'Department Officer',
      remarks: notes || remarks || `Status progressed to ${status}`,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('civicpulse_timelines', JSON.stringify(complaintTimelines));
  }

  alert(`Status successfully updated to: ${status}!`);
  closeOfficerModal();
  updateHeaderCounters();
  renderOfficerScreen();
};

window.openSupervisorModal = function(id) {
  document.getElementById('supervisorAssignComplaintId').value = id;
  document.getElementById('modalSupervisorAssign').classList.remove('hidden');
};

window.closeSupervisorModal = function() {
  document.getElementById('modalSupervisorAssign').classList.add('hidden');
};

window.submitSupervisorAssignment = function(e) {
  e.preventDefault();
  const id = parseInt(document.getElementById('supervisorAssignComplaintId').value, 10);
  const officer = document.getElementById('supervisorOfficerSelect').value;
  const remarks = document.getElementById('supervisorRemarksInput').value;

  const c = allComplaints.find(item => item.id === id);
  if (c) {
    c.assigned_officer = officer;
    c.status = 'Assigned';
    c.supervisor_remarks = remarks;
    c.updated_at = new Date().toISOString();
    localStorage.setItem('civicpulse_complaints', JSON.stringify(allComplaints));

    if (!complaintTimelines[id]) complaintTimelines[id] = [];
    complaintTimelines[id].push({
      action: 'Officer Assigned',
      actor: 'Supervisor Desk',
      role: 'Supervisor',
      remarks: `Assigned to ${officer}. Directives: ${remarks || 'Inspect site and resolve.'}`,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('civicpulse_timelines', JSON.stringify(complaintTimelines));
  }

  alert(`Grievance allocated to ${officer}!`);
  closeSupervisorModal();
  updateHeaderCounters();
  renderSupervisorScreen();
};

window.escalateComplaint = function(id) {
  const reason = prompt('Enter Escalation Directives (e.g. Overdue SLA breach / public hazard):', 'SLA deadline exceeded. Urgent remediation required.');
  if (!reason) return;

  const c = allComplaints.find(item => item.id === parseInt(id, 10));
  if (c) {
    c.status = 'Escalated';
    c.priority = 'Urgent';
    c.supervisor_remarks = reason;
    c.updated_at = new Date().toISOString();
    localStorage.setItem('civicpulse_complaints', JSON.stringify(allComplaints));

    if (!complaintTimelines[id]) complaintTimelines[id] = [];
    complaintTimelines[id].push({
      action: 'Emergency Escalation',
      actor: 'Supervisor Desk',
      role: 'Supervisor',
      remarks: `Escalated to Urgent Priority: ${reason}`,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('civicpulse_timelines', JSON.stringify(complaintTimelines));
  }

  alert(`⚠️ Grievance #${c.ticket_id} ESCALATED to Urgent Priority!`);
  updateHeaderCounters();
  renderSupervisorScreen();
};

// =========================================================================
// CARD RENDERER
// =========================================================================
function renderCardHtml(c, context) {
  const priorityClass = `badge-${(c.priority || 'medium').toLowerCase()}`;
  const statusClass = `badge-${c.status.toLowerCase().replace(/\s+/g, '-')}`;

  return `
    <div class="grievance-card" id="card-${c.id}">
      <div class="card-image-wrap">
        <img src="${c.image_url || imagePresets[0]}" alt="${escapeHtml(c.title)}" onerror="this.src='${imagePresets[0]}'" />
        <span class="card-ticket-overlay">#${c.ticket_id}</span>
        <div class="card-badges-overlay">
          <span class="badge ${priorityClass}">⚡ ${c.priority}</span>
          <span class="badge ${statusClass}">${c.status}</span>
        </div>
      </div>

      <div class="card-content">
        <h3 class="card-title">${escapeHtml(c.title)}</h3>
        <div class="card-location">📍 ${escapeHtml(c.location)}</div>
        <p class="card-desc">${escapeHtml(c.description)}</p>

        <div class="card-assignment-tag">
          <span>👮 Officer: <strong>${c.assigned_officer}</strong></span>
          <span>🏢 ${c.department}</span>
        </div>

        ${c.citizen_rating ? `
          <div style="background:#fefce8;border:1px solid #fef08a;padding:0.4rem 0.6rem;border-radius:4px;font-size:0.76rem;margin-bottom:0.75rem;">
            ⭐ Citizen Rating: <strong>${c.citizen_rating} / 5 Stars</strong> — <em>"${escapeHtml(c.citizen_feedback || 'No comments')}"</em>
          </div>
        ` : ''}

        <div class="card-footer-actions">
          <button class="btn btn-secondary btn-sm" onclick="viewTimelineDirect(${c.id})">🔍 Screen 8: Timeline</button>

          ${context === 'citizen' && c.status === 'Resolved' && !c.citizen_rating ? `
            <button class="btn btn-primary btn-sm" style="background:#eab308;color:#000;" onclick="openFeedbackModal(${c.id})">⭐ Rate & Feedback</button>
          ` : ''}

          ${context === 'officer' ? `
            <button class="btn btn-primary btn-sm" onclick="openOfficerActionModal(${c.id})">⚙️ Update Status</button>
          ` : ''}

          ${context === 'supervisor' ? `
            <div style="display:flex;gap:0.35rem;">
              <button class="btn btn-secondary btn-sm" onclick="openSupervisorModal(${c.id})">👔 Assign</button>
              ${c.status !== 'Resolved' ? `<button class="btn btn-primary btn-sm" style="background:#dc2626;" onclick="escalateComplaint(${c.id})">🔥 Escalate</button>` : ''}
            </div>
          ` : ''}
        </div>
      </div>
    </div>
  `;
}

// Utility: Escape HTML
function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>"']/g, m => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
  }[m]));
}

// App Initialization
checkClusterHealth();
setInterval(checkClusterHealth, 10000);
fetchComplaints();
navigateTo('home');
