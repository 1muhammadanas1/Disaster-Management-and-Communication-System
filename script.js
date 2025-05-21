// DOM Elements
const alertBanner = document.getElementById('alert-banner');
const emergencyBtn = document.getElementById('emergency-btn');
const refreshBtn = document.getElementById('refresh-btn');
const incidentForm = document.getElementById('incident-form');
const contactForm = document.getElementById('contact-form');
const incidentFilter = document.getElementById('incident-filter');
const mapFilter = document.getElementById('map-filter');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const incidentList = document.getElementById('incident-list');

// Sample data for incidents
const incidents = [
    { type: '🔥 Fire', location: 'Northern Hills', status: 'critical', time: '2 hours ago' },
    { type: '🌊 Flood', location: 'Central District', status: 'warning', time: '5 hours ago' },
    { type: '⚡ Power Outage', location: 'Eastern Sector', status: 'warning', time: '1 day ago' },
    { type: '🏥 Medical Emergency', location: 'City Center', status: 'resolved', time: '2 days ago' },
    { type: '🌪️ Tornado', location: 'Western County', status: 'resolved', time: '3 days ago' },
    { type: '🏗️ Building Collapse', location: 'Industrial Zone', status: 'critical', time: '6 hours ago' },
    { type: '🚗 Traffic Accident', location: 'Highway 101', status: 'warning', time: '12 hours ago' },
    { type: '☢️ Hazardous Material', location: 'Research Facility', status: 'critical', time: '1 hour ago' }
];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Populate initial incident list
    populateIncidents('all');
    
    // Setup event listeners
    setupEventListeners();
    
    // Start alert banner animation
    startAlertAnimation();
});

// Populate incidents based on filter
function populateIncidents(filter) {
    // Clear current list
    incidentList.innerHTML = '';
    
    // Filter and add incidents
    const filteredIncidents = filter === 'all' ? 
        incidents : 
        incidents.filter(incident => incident.status === filter);
    
    filteredIncidents.forEach(incident => {
        const incidentEl = document.createElement('div');
        incidentEl.className = 'incident';
        
        let statusColor;
        switch(incident.status) {
            case 'critical':
                statusColor = '#e74c3c';
                break;
            case 'warning':
                statusColor = '#f39c12';
                break;
            case 'resolved':
                statusColor = '#27ae60';
                break;
            default:
                statusColor = '#3498db';
        }
        
        incidentEl.innerHTML = `
            <div class="incident-type">
                <span class="incident-icon" style="color: ${statusColor};">${incident.type.split(' ')[0]}</span>
                <span>${incident.type.split(' ')[1]} in ${incident.location}</span>
            </div>
            <div class="incident-status" style="color: ${statusColor};">${incident.status.charAt(0).toUpperCase() + incident.status.slice(1)}</div>
            <div class="incident-time">${incident.time}</div>
        `;
        
        incidentList.appendChild(incidentEl);
    });
}

// Start alert banner animation
function startAlertAnimation() {
    let alertVisible = true;
    setInterval(() => {
        if (alertVisible) {
            alertBanner.style.backgroundColor = '#c0392b';
        } else {
            alertBanner.style.backgroundColor = '#e74c3c';
        }
        alertVisible = !alertVisible;
    }, 1000);
}

// Setup all event listeners
function setupEventListeners() {
    // Emergency button click handler
    emergencyBtn.addEventListener('click', function(e) {
        e.preventDefault();
        alert('EMERGENCY MODE ACTIVATED: Connecting to nearest emergency services...');
    });
    
    // Refresh button animation
    refreshBtn.addEventListener('click', function() {
        this.innerHTML = '<span style="display: inline-block; animation: spin 1s linear infinite;">⟳</span> Refreshing...';
        setTimeout(() => {
            this.innerHTML = 'Refresh Data';
            alert('Dashboard data has been updated with the latest information.');
        }, 1500);
    });
    
    // Incident form submission
    incidentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const incidentType = document.getElementById('incident-type').value;
        const location = document.getElementById('location').value;
        
        if (incidentType && location) {
            alert(`Thank you for your report. Emergency services have been notified about the ${incidentType} incident at ${location}.`);
            this.reset();
        }
    });
    
    // Contact form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message. Our team will respond shortly.');
        this.reset();
    });
    
    // Filter incidents
    incidentFilter.addEventListener('change', function() {
        const filter = this.value;
        populateIncidents(filter);
    });
    
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('mobile-nav-links');
        navLinks.classList.toggle('active');
    });
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Filter map markers
    mapFilter.addEventListener('change', function() {
        const filter = this.value;
        alert(`Map updated to show ${filter === 'all' ? 'all incidents' : filter + ' incidents'}`);
    });
}

// Add a new incident to the system
function addNewIncident(type, location, status, time) {
    const newIncident = { type, location, status, time };
    incidents.unshift(newIncident); // Add to beginning of array
    
    // Refresh the display
    populateIncidents(incidentFilter.value);
    
    return newIncident;
}

// Get status statistics
function getStatusStats() {
    const stats = {
        critical: incidents.filter(i => i.status === 'critical').length,
        warning: incidents.filter(i => i.status === 'warning').length,
        resolved: incidents.filter(i => i.status === 'resolved').length
    };
    
    return stats;
}

// Simulate emergency alert broadcast
function broadcastEmergencyAlert(message, severity) {
    // Update the alert banner
    alertBanner.textContent = message;
    
    // Change color based on severity
    if (severity === 'critical') {
        alertBanner.style.backgroundColor = '#e74c3c';
    } else if (severity === 'warning') {
        alertBanner.style.backgroundColor = '#f39c12';
    } else {
        alertBanner.style.backgroundColor = '#3498db';
    }
    
    // Flash effect
    let isVisible = true;
    const flashInterval = setInterval(() => {
        if (isVisible) {
            alertBanner.style.opacity = '0.7';
        } else {
            alertBanner.style.opacity = '1';
        }
        isVisible = !isVisible;
    }, 500);
    
    // Stop flashing after 5 seconds
    setTimeout(() => {
        clearInterval(flashInterval);
        alertBanner.style.opacity = '1';
    }, 5000);
    
    return true;
}