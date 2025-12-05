// client/app.js
const fileInput = document.getElementById('fileInput');
const dropzone = document.getElementById('dropzone');
const btnUpload = document.getElementById('btnUpload');
const btnStats = document.getElementById('btnStats');
const btnAnalyze = document.getElementById('btn-analyze');
const btnRepair = document.getElementById('btn-repair');

const uploadStatus = document.getElementById('uploadStatus');
const totalEl = document.getElementById('total');
const emptyEl = document.getElementById('empty');
const duplicatesEl = document.getElementById('duplicates');
const scoreEl = document.getElementById('score');
const previewContainer = document.getElementById('previewContainer');
const downloads = document.getElementById('downloads');
const imputeSelect = document.getElementById('impute');

let currentFile = null;
let chart = null;

// Drag & drop UI
dropzone.addEventListener('click', ()=>fileInput.click());
dropzone.addEventListener('dragover', (e)=>{ e.preventDefault(); dropzone.classList.add('drop-active'); });
dropzone.addEventListener('dragleave', ()=>dropzone.classList.remove('drop-active'));
dropzone.addEventListener('drop', (e)=>{ e.preventDefault(); dropzone.classList.remove('drop-active'); const f = e.dataTransfer.files[0]; handleFile(f); });

fileInput.addEventListener('change', ()=> handleFile(fileInput.files[0]) );

function handleFile(file){
  if(!file) return;
  currentFile = file;
  dropzone.querySelector('div').innerText = `📂 ${file.name} • ${Math.round(file.size/1024)} KB`;
  uploadsResetUI();
}

// reset small UI parts
function uploadsResetUI(){
  uploadStatus.innerText = '';
  previewContainer.innerHTML = '';
  downloads.innerHTML = '';
  totalEl.innerText = '—'; emptyEl.innerText='—'; duplicatesEl.innerText='—'; scoreEl.innerText='—%';
}

// helper to POST form and return JSON or blob
async function postForm(path, form, expectBlob=false){
  const res = await fetch(path, { method: 'POST', body: form });
  if(!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Server error');
  }
  return expectBlob ? res.blob() : res.json();
}

// Stats button
btnStats.addEventListener('click', async ()=>{
  if(!currentFile) return alert('Select CSV first');
  uploadStatus.innerText = 'Analyzing…';
  const form = new FormData(); form.append('file', currentFile);
  try{
    const json = await postForm('/api/stats', form, false);
    totalEl.innerText = json.rows_total;
    emptyEl.innerText = json.empty_rows;
    duplicatesEl.innerText = json.duplicates;
    scoreEl.innerText = (json.quality_score || 0) + ' %';
    renderChart(json);
    previewContainer.innerText = JSON.stringify(json.preview || [], null, 2);
    uploadsShowDownloads(json.download || null);
    uploadStatus.innerText = 'Analysis complete';
  }catch(err){
    uploadStatus.innerText = 'Analysis failed: ' + err.message;
  }
});

// Upload & Clean (download xlsx)
btnUpload.addEventListener('click', async ()=>{
  if(!currentFile) return alert('Select CSV first');
  uploadStatus.innerText = 'Cleaning and building Excel…';
  const form = new FormData();
  form.append('file', currentFile);
  form.append('impute', imputeSelect.value);
  try{
    // call repair endpoint that returns JSON with download links
    const json = await postForm('/api/repair', form, false);
    uploadsShowDownloads(json.download || null);
    previewContainer.innerText = JSON.stringify(json.preview || [], null, 2);
    totalEl.innerText = json.rows_before;
    duplicatesEl.innerText = json.rows_before - json.rows_after;
    scoreEl.innerText = Math.round(100 * (json.rows_after / Math.max(1,json.rows_before))) + ' %';
    uploadStatus.innerText = 'Done — files ready';
  }catch(err){
    uploadStatus.innerText = 'Cleaning failed: ' + err.message;
  }
});

// Repair button: same as upload but shows more meta
btnRepair.addEventListener('click', ()=> btnUpload.click());
btnAnalyze.addEventListener('click', ()=> btnStats.click());

// show download links in UI
function uploadsShowDownloads(down){
  downloads.innerHTML = '';
  if(!down) return;
  if(down.xlsx){
    const a = document.createElement('a');
    a.href = down.xlsx;
    a.className = 'inline-block bg-emerald-600 px-3 py-2 rounded text-sm';
    a.innerText = 'Download XLSX';
    downloads.appendChild(a);
  }
  if(down.csv){
    const b = document.createElement('a');
    b.href = down.csv;
    b.className = 'inline-block bg-slate-700 px-3 py-2 rounded text-sm';
    b.innerText = 'Download CSV';
    downloads.appendChild(b);
  }
}

// Chart rendering
function renderChart(stats){
  const ctx = document.getElementById('qualityChart').getContext('2d');
  const labels = ['Empty rows','Duplicates','Clean rows'];
  const values = [
    stats.empty_rows || 0,
    stats.duplicates || 0,
    (stats.rows_total - (stats.empty_rows || 0) - (stats.duplicates || 0)) || 0
  ];
  if(chart) chart.destroy();
  chart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels, datasets: [{ data: values, backgroundColor: ['#f97316','#f43f5e','#10b981'] }]
    },
    options:{ plugins:{ legend:{ labels:{ color:'#cbd5e1' }}}}
  });
}

// small initialization
uploadsResetUI();
