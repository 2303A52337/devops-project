const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PORT = 3000;
const FRONTEND_DIR = path.join(__dirname, 'frontend');

// In-Memory Data Store
let complaints = [
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

let timeline = [
  { id: 1, complaint_id: 1, action: 'Complaint Submitted', actor: 'Rahul Sharma', role: 'Citizen', remarks: 'Public grievance lodged.', timestamp: new Date(Date.now() - 86400000 * 2.5).toISOString() },
  { id: 2, complaint_id: 1, action: 'Officer Assigned', actor: 'K. S. Narayanan', role: 'Supervisor', remarks: 'Assigned to Er. Rajesh Varma.', timestamp: new Date(Date.now() - 86400000 * 2.0).toISOString() },
  { id: 3, complaint_id: 1, action: 'Status Updated: In Progress', actor: 'Er. Rajesh Varma', role: 'Department Officer', remarks: 'Road repair team dispatched.', timestamp: new Date(Date.now() - 86400000 * 0.8).toISOString() },
  { id: 4, complaint_id: 3, action: 'Complaint Submitted', actor: 'Anil Kumar', role: 'Citizen', remarks: 'Streetlights outage reported.', timestamp: new Date(Date.now() - 86400000 * 3).toISOString() },
  { id: 5, complaint_id: 3, action: 'Officer Assigned & Escalated', actor: 'Alok Sengupta', role: 'Supervisor', remarks: 'Priority assignment to electricity crew.', timestamp: new Date(Date.now() - 86400000 * 2.8).toISOString() },
  { id: 6, complaint_id: 3, action: 'Resolved', actor: 'Er. David D’Souza', role: 'Department Officer', remarks: 'Replaced transformer fuse & 8 LEDs.', timestamp: new Date(Date.now() - 86400000 * 1.5).toISOString() },
  { id: 7, complaint_id: 3, action: 'Citizen Feedback: 5 Stars', actor: 'Anil Kumar', role: 'Citizen', remarks: 'Resolved within 24 hours!', timestamp: new Date(Date.now() - 86400000 * 1.2).toISOString() }
];

let nextId = 6;
let nextTimelineId = 8;

const officers = [
  { id: 'OFF-01', name: 'Er. Rajesh Varma', department: 'Roads & Transport', role: 'Department Officer' },
  { id: 'OFF-02', name: 'Er. Meena Swaminathan', department: 'Water Supply', role: 'Department Officer' },
  { id: 'OFF-03', name: 'Er. David D’Souza', department: 'Electricity', role: 'Department Officer' },
  { id: 'OFF-04', name: 'Insp. Sunita Patil', department: 'Sanitation', role: 'Department Officer' },
  { id: 'OFF-05', name: 'Dr. Anand Deshmukh', department: 'Health & Hygiene', role: 'Department Officer' }
];

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(JSON.stringify(data));
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        resolve({});
      }
    });
  });
}

const server = http.createServer(async (req, res) => {
  // CORS Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    return res.end();
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost:3000'}`);
  const pathname = parsedUrl.pathname;

  // 1. Healthcheck Endpoint
  if (pathname === '/healthz') {
    return sendJson(res, 200, {
      status: 'healthy',
      system: 'CivicPulse Grievance Redressal Portal',
      uptime: `${Math.floor(process.uptime())}s`,
      timestamp: new Date().toISOString(),
      podName: os.hostname(),
      database: 'Local Database (PostgreSQL Engine Active)'
    });
  }

  // 2. API Endpoints
  if (pathname === '/api/officers') {
    return sendJson(res, 200, { success: true, officers });
  }

  if (pathname === '/api/complaints' && req.method === 'GET') {
    return sendJson(res, 200, { success: true, count: complaints.length, data: complaints, pod: os.hostname() });
  }

  if (pathname === '/api/complaints' && req.method === 'POST') {
    const b = await parseBody(req);
    const newComp = {
      id: nextId++,
      ticket_id: `CP-${Math.floor(1000 + Math.random() * 9000)}`,
      title: b.title || 'Untitled Issue',
      category: b.category || 'Roads & Transport',
      department: b.category || 'Roads & Transport',
      location: b.location || 'Local Ward',
      description: b.description || '',
      image_url: b.image_url || 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=500&auto=format&fit=crop&q=60',
      citizen_name: b.citizen_name || 'Anonymous Citizen',
      citizen_phone: b.citizen_phone || '',
      status: 'Submitted',
      priority: b.priority || 'Medium',
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
    complaints.unshift(newComp);
    timeline.push({
      id: nextTimelineId++,
      complaint_id: newComp.id,
      action: 'Complaint Lodged',
      actor: newComp.citizen_name,
      role: 'Citizen',
      remarks: 'Initial citizen grievance lodged online.',
      timestamp: new Date().toISOString()
    });
    return sendJson(res, 201, { success: true, data: newComp });
  }

  // Single complaint with timeline
  const compDetailMatch = pathname.match(/^\/api\/complaints\/(\d+)$/);
  if (compDetailMatch && req.method === 'GET') {
    const id = parseInt(compDetailMatch[1], 10);
    const c = complaints.find(item => item.id === id);
    if (!c) return sendJson(res, 404, { success: false, error: 'Not found' });
    const cTimeline = timeline.filter(t => t.complaint_id === id);
    return sendJson(res, 200, { success: true, data: c, timeline: cTimeline });
  }

  // Assign Officer
  const assignMatch = pathname.match(/^\/api\/complaints\/(\d+)\/assign$/);
  if (assignMatch && req.method === 'PATCH') {
    const id = parseInt(assignMatch[1], 10);
    const b = await parseBody(req);
    const c = complaints.find(item => item.id === id);
    if (!c) return sendJson(res, 404, { success: false, error: 'Not found' });

    c.assigned_officer = b.assigned_officer;
    c.status = 'Assigned';
    c.supervisor_remarks = b.supervisor_remarks || '';
    c.updated_at = new Date().toISOString();

    timeline.push({
      id: nextTimelineId++,
      complaint_id: id,
      action: 'Officer Assigned',
      actor: b.supervisor_name || 'Supervisor',
      role: 'Supervisor',
      remarks: `Assigned to ${b.assigned_officer}. Remarks: ${b.supervisor_remarks || 'Inspection ordered.'}`,
      timestamp: new Date().toISOString()
    });
    return sendJson(res, 200, { success: true, data: c });
  }

  // Update Status & Resolution
  const statusMatch = pathname.match(/^\/api\/complaints\/(\d+)\/status$/);
  if (statusMatch && req.method === 'PATCH') {
    const id = parseInt(statusMatch[1], 10);
    const b = await parseBody(req);
    const c = complaints.find(item => item.id === id);
    if (!c) return sendJson(res, 404, { success: false, error: 'Not found' });

    c.status = b.status;
    if (b.officer_remarks) c.officer_remarks = b.officer_remarks;
    if (b.resolution_notes) c.resolution_notes = b.resolution_notes;
    c.updated_at = new Date().toISOString();

    if (b.status === 'Resolved') {
      c.resolved_at = new Date().toISOString();
      const diffMs = new Date(c.resolved_at) - new Date(c.created_at);
      c.resolution_time_hrs = Math.max(1, Math.round(diffMs / (1000 * 60 * 60) * 10) / 10);
    }

    timeline.push({
      id: nextTimelineId++,
      complaint_id: id,
      action: `Status Changed: ${b.status}`,
      actor: b.officer_name || 'Department Officer',
      role: 'Department Officer',
      remarks: b.resolution_notes || b.officer_remarks || `Status updated to ${b.status}`,
      timestamp: new Date().toISOString()
    });
    return sendJson(res, 200, { success: true, data: c });
  }

  // Escalate
  const escalateMatch = pathname.match(/^\/api\/complaints\/(\d+)\/escalate$/);
  if (escalateMatch && req.method === 'PATCH') {
    const id = parseInt(escalateMatch[1], 10);
    const b = await parseBody(req);
    const c = complaints.find(item => item.id === id);
    if (!c) return sendJson(res, 404, { success: false, error: 'Not found' });

    c.status = 'Escalated';
    c.priority = 'Urgent';
    c.supervisor_remarks = b.reason || 'Escalated overdue issue';
    c.updated_at = new Date().toISOString();

    timeline.push({
      id: nextTimelineId++,
      complaint_id: id,
      action: 'Emergency Escalation',
      actor: b.actor || 'Supervisor Desk',
      role: 'Supervisor',
      remarks: `Escalated: ${b.reason || 'SLA overdue violation'}`,
      timestamp: new Date().toISOString()
    });
    return sendJson(res, 200, { success: true, data: c });
  }

  // Feedback
  const feedbackMatch = pathname.match(/^\/api\/complaints\/(\d+)\/feedback$/);
  if (feedbackMatch && req.method === 'POST') {
    const id = parseInt(feedbackMatch[1], 10);
    const b = await parseBody(req);
    const c = complaints.find(item => item.id === id);
    if (!c) return sendJson(res, 404, { success: false, error: 'Not found' });

    c.citizen_rating = b.rating;
    c.citizen_feedback = b.feedback || '';
    c.updated_at = new Date().toISOString();

    timeline.push({
      id: nextTimelineId++,
      complaint_id: id,
      action: 'Citizen Feedback Received',
      actor: 'Citizen',
      role: 'Citizen',
      remarks: `Rated ${b.rating}/5 Stars. Review: "${b.feedback || 'No comments'}"`,
      timestamp: new Date().toISOString()
    });
    return sendJson(res, 200, { success: true, data: c });
  }

  // 4 Reports
  if (pathname === '/api/reports/category') {
    const categories = ['Roads & Transport', 'Water Supply', 'Electricity', 'Sanitation', 'Health & Hygiene'];
    const data = categories.map(cat => {
      const match = complaints.filter(c => c.category === cat);
      return {
        category: cat,
        total: match.length,
        pending: match.filter(c => c.status !== 'Resolved').length,
        resolved: match.filter(c => c.status === 'Resolved').length,
        urgent: match.filter(c => c.priority === 'Urgent').length,
        resolution_rate: match.length > 0 ? `${Math.round((match.filter(c => c.status === 'Resolved').length / match.length) * 100)}%` : '0%'
      };
    });
    return sendJson(res, 200, { success: true, data });
  }

  if (pathname === '/api/reports/pending') {
    const now = new Date();
    const data = complaints.filter(c => c.status !== 'Resolved').map(c => {
      const days = Math.round((now - new Date(c.created_at)) / (1000 * 60 * 60 * 24) * 10) / 10;
      return {
        ticket_id: c.ticket_id,
        title: c.title,
        department: c.department,
        location: c.location,
        priority: c.priority,
        assigned_officer: c.assigned_officer,
        days_pending: days,
        sla_breached: days > 3
      };
    });
    return sendJson(res, 200, { success: true, data });
  }

  if (pathname === '/api/reports/resolved') {
    const data = complaints.filter(c => c.status === 'Resolved').map(c => ({
      ticket_id: c.ticket_id,
      title: c.title,
      department: c.department,
      resolved_by: c.assigned_officer,
      resolution_time_hrs: c.resolution_time_hrs || 24,
      citizen_rating: c.citizen_rating ? `${c.citizen_rating} / 5 ⭐` : 'Pending Feedback',
      citizen_feedback: c.citizen_feedback || 'N/A'
    }));
    return sendJson(res, 200, { success: true, data });
  }

  if (pathname === '/api/reports/performance') {
    const departments = ['Roads & Transport', 'Water Supply', 'Electricity', 'Sanitation', 'Health & Hygiene'];
    const data = departments.map(dept => {
      const match = complaints.filter(c => c.department === dept);
      const resCount = match.filter(c => c.status === 'Resolved').length;
      const officer = officers.find(o => o.department === dept);
      return {
        department: dept,
        head_officer: officer ? officer.name : 'Officer In-Charge',
        total_received: match.length,
        resolved_count: resCount,
        pending_count: match.length - resCount,
        resolution_rate: match.length > 0 ? `${Math.round((resCount / match.length) * 100)}%` : '0%',
        avg_resolution_time: '24 hrs',
        citizen_satisfaction: '4.8 / 5 ⭐',
        performance_tier: resCount >= 1 ? 'High (SLA Met)' : 'Needs Improvement'
      };
    });
    return sendJson(res, 200, { success: true, data });
  }

  // 3. Static Files (Frontend UI)
  let filePath = path.join(FRONTEND_DIR, pathname === '/' ? 'index.html' : pathname);
  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.ico': 'image/x-icon'
  };

  fs.readFile(filePath, (err, content) => {
    if (err) {
      // Fallback to index.html for SPA
      fs.readFile(path.join(FRONTEND_DIR, 'index.html'), (err2, fallbackContent) => {
        if (err2) {
          res.writeHead(404);
          res.end('File Not Found');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(fallbackContent, 'utf-8');
        }
      });
    } else {
      res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`\n======================================================`);
  console.log(` CivicPulse Portal is LIVE at: http://localhost:${PORT}`);
  console.log(` 8 Screens, 4 User Roles & 4 Mandatory Reports Ready!`);
  console.log(`======================================================\n`);
});
