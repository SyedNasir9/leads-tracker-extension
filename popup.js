const leadForm = document.getElementById('leadForm');
const leadUrl = document.getElementById('leadUrl');
const leadName = document.getElementById('leadName');
const leadList = document.getElementById('leadList');

// Load leads from localStorage
function loadLeads() {
  const leads = JSON.parse(localStorage.getItem('leads')) || [];
  leadList.innerHTML = '';
  leads.forEach((lead, index) => {
    const leadItem = document.createElement('div');
    leadItem.classList.add('lead-item');
    leadItem.innerHTML = `
    <div>
      <strong>${lead.name || 'No Name'}</strong><br>
      <a href="${lead.url}" target="_blank">${lead.url}</a>
    </div>
    <button data-index="${index}">Remove</button>
  `;  
    leadList.appendChild(leadItem);
  });
}

// Add new lead
leadForm.addEventListener('submit', function (event) {
  event.preventDefault();

  // Check if URL is valid
  if (!leadUrl.value) {
    alert('Lead URL is required.');
    return;
  }

  const newLead = {
    url: leadUrl.value,
    name: leadName.value || 'No Name',
  };
  

  const leads = JSON.parse(localStorage.getItem('leads')) || [];
  leads.push(newLead);
  localStorage.setItem('leads', JSON.stringify(leads));

  // Clear the input fields
  leadUrl.value = '';
  leadName.value = '';
  loadLeads();
});

// Remove lead
leadList.addEventListener('click', function (event) {
  if (event.target.tagName === 'BUTTON') {
    const index = event.target.getAttribute('data-index');
    const leads = JSON.parse(localStorage.getItem('leads')) || [];
    leads.splice(index, 1);
    localStorage.setItem('leads', JSON.stringify(leads));

    loadLeads();
  }
});

loadLeads();
