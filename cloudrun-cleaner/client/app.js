// client/app.js (FULL PREMIUM)
// DataWash-CSV™ — frontend controller
// Requires: Chart.js + Tailwind + backend endpoints: /api/stats, /api/repair, /download/:file

/* -------------------------
   Elements
--------------------------*/
const fileInput = document.getElementById('fileInput');
const dropzone = document.getElementById('dropzone');
const btnUpload = document.getElementById('btnUpload');
const btnStats = document.getElementById('btnStats');
const btnAnalyze = document.getElementById('btn-analyze');
const btnRepair = document.getElementById('btn-repair');

const uploadStatus = document.getElementById('uploadStatus') || { innerText: '' };
const totalEl = document.getElementById('total');
const emptyEl = document.getElementById('empty');
const duplicatesEl = document.getElementById('duplicates');
const scoreEl = document.getElementById('score');
const previewContainer = document.getElementById('previewContainer');
const downloads = document.getElementById('downloads');

const columnSelect = document.getElementById('columnSelect');
const searchInput = document.getElementById('searchInput');
const replaceFrom = document.getElementById('replaceFrom');
const replaceTo = document.getElementById('replaceTo');

const kpi_rows = document.getElementById('kpi_rows');
const kpi_cols = document.getElementById('kpi_cols');
const kpi_missing = document.getElementById('kpi_missing');
const qualityChartEl = document.getElementById('qualityChart');

let currentFile = null;
let cleanedData = null; // array of rows (first row = headers)
let previewData = [];
let chartInstance = null;

/* -------------------------
   Helpers
--------------------------*/
function setStatus(msg){
  if(uploadStatus) uploadStatus.innerText = msg;
}
function clearStatus(){ setStatus(''); }

async function postFormJSON(path, form){
  const res = await fetch(path, { method: 'POST', body: form });
  if(!res.ok){
    const txt = await res.text().catch(()=>null);
    throw new Error(txt || `${res.status} ${res.statusText}`);
  }
  return res.json();
}

async function postJSON(path, body){
  const res = await fetch(path, {
    method:'POST',
    headers:{ 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if(!res.ok){
    const txt = await res.text().catch(()=>null);
    throw new Error(txt || `${res.status} ${res.statusText}`);
  }
  // detect blob vs json
  const ct = res.headers.get('content-type') || '';
  if(ct.includes('application/json')) return res.json();
  return res.blob();
}

/* -------------------------
   Drag & Drop / File select
--------------------------*/
dropzone.addEventListener('click', ()=> fileInput.click());
dropzone.addEventListener('dragover', (e)=>{ e.preventDefault(); dropzone.classList.add('drop-active'); });
dropzone.addEventListener('dragleave', ()=> dropzone.classList.remove('drop-active'));
dropzone.addEventListener('drop', (e)=>{ e.preventDefault(); dropzone.classList.remove('drop-active'); const f=e.dataTransfer.files[0]; handleFile(f); });

fileInput.addEventListener('change', ()=> handleFile(fileInput.files[0]) );

function handleFile(file){
  if(!file) return;
  currentFile = file;
  dropzone.querySelector('div')?.insertAdjacentText('afterbegin', `📂 ${file.name} • ${Math.round(file.size/1024)} KB\n`);
  // reset UI
  cleanedData = null;
  previewData = [];
  clearStatus();
  previewContainer && (previewContainer.innerText = '');
  downloads && (downloads.innerHTML = '');
  kpi_rows && (kpi_rows.innerText = '—');
  kpi_cols && (kpi_cols.innerText = '—');
  kpi_missing && (kpi_missing.innerText = '—');
  totalEl && (totalEl.innerText = '—');
  emptyEl && (emptyEl.innerText = '—');
  duplicatesEl && (duplicatesEl.innerText = '—');
  scoreEl && (scoreEl.innerText = '— %');
}

/* -------------------------
   UI - Chart
--------------------------*/
function renderChart(stats){
  if(!qualityChartEl) return;
  const labels = ['Empty','Duplicates','Clean'];
  const values = [
    stats.empty_rows || 0,
    stats.duplicates || 0,
    (stats.rows_total - (stats.empty_rows||0) - (stats.duplicates||0)) || 0
  ];
  if(chartInstance) chartInstance.destroy();
  chartInstance = new Chart(qualityChartEl, {
    type: 'doughnut',
    data: {
      labels,
      datasets: [{ data: values, backgroundColor: ['#f59e0b','#ef4444','#10b981'] }]
    },
    options: { responsive:true, plugins:{ legend:{ labels:{ color:'#cbd5e1' } } } }
  });
}

/* -------------------------
   Render Preview Table (first N rows)
--------------------------*/
function renderPreviewTable(rows){
  if(!previewContainer) return;
  if(!rows || !rows.length){ previewContainer.innerText = 'No preview available'; return; }
  // rows: array of arrays OR array of objects (if objects, convert to arrays)
  let tableHtml = '<table class="min-w-full w-full text-sm border-collapse">';
  const first = rows[0];
  let headers = Array.isArray(first) ? first : Object.keys(first);
  // header
  tableHtml += '<thead><tr class="text-left text-xs text-slate-400">';
  headers.forEach(h => tableHtml += `<th class="p-1 border-b border-slate-700">${h}</th>`);
  tableHtml += '</tr></thead><tbody>';
  // rows
  rows.forEach((r, i) => {
    const vals = Array.isArray(r) ? r : headers.map(h => r[h]);
    tableHtml += '<tr>';
    vals.forEach(v => tableHtml += `<td class="p-1 border-b border-slate-800">${(v===null||v===undefined)? '' : String(v)}</td>`);
    tableHtml += '</tr>';
  });
  tableHtml += '</tbody></table>';
  previewContainer.innerHTML = tableHtml;
}

/* -------------------------
   Load column selector (expects array rows where first row is header)
--------------------------*/
function loadColumns(rows){
  if(!columnSelect) return;
  columnSelect.innerHTML = '';
  if(!rows || !rows.length) return;
  // if rows are objects -> use keys; if arrays -> first row is header
  const first = rows[0];
  const headers = Array.isArray(first) ? first : Object.keys(first);
  headers.forEach((h,i) => {
    const opt = document.createElement('option');
    opt.value = i;
    opt.text = (typeof h === 'string' ? h : `Col ${i+1}`);
    columnSelect.appendChild(opt);
  });
}

/* -------------------------
   API: Stats (analyze)
--------------------------*/
btnStats && btnStats.addEventListener('click', async ()=>{
  if(!currentFile) return alert('Select a CSV first');
  setStatus('Analyzing file...');
  const form = new FormData();
  form.append('file', currentFile);
  try{
    const json = await postFormJSON('/api/stats', form);
    // expected fields: rows_total, empty_rows, duplicates, quality_score, preview, download (optional)
    totalEl && (totalEl.innerText = json.rows_total ?? '-');
    emptyEl && (emptyEl.innerText = json.empty_rows ?? '-');
    duplicatesEl && (duplicatesEl.innerText = json.duplicates ?? '-');
    scoreEl && (scoreEl.innerText = (json.quality_score ?? 0) + ' %');

    // prepare preview (if preview provided as array of objects -> convert to array-of-arrays with headers)
    previewData = json.preview || [];
    // if preview is array of objects, transform to header+rows
    if(previewData.length && typeof previewData[0] === 'object' && !Array.isArray(previewData[0])){
      const headers = Object.keys(previewData[0]);
      const rows = [headers].concat(previewData.map(r => headers.map(h=> r[h])));
      cleanedData = rows;
    } else {
      cleanedData = previewData;
    }

    loadColumns(cleanedData);
    renderPreviewTable((cleanedData && cleanedData.slice(0,50)) || []);
    renderChart(json);
    uploadsShowDownloads(json.download || null);
    setStatus('Analysis complete');
  }catch(err){
    setStatus('Analysis failed: ' + err.message);
    console.error(err);
  }
});

/* -------------------------
   API: Repair (clean + export) - returns JSON with download links + preview
--------------------------*/
btnUpload && btnUpload.addEventListener('click', async ()=>{
  if(!currentFile) return alert('Select a CSV first');
  setStatus('Cleaning & building export...');
  const form = new FormData();
  form.append('file', currentFile);
  // imputation strategy from select if exists
  const impute = document.getElementById('impute');
  if(impute) form.append('impute', impute.value);

  try{
    const json = await postFormJSON('/api/repair', form);
    // expected fields: rows_before, rows_after, column_types, download: {csv, xlsx}, preview
    totalEl && (totalEl.innerText = json.rows_before ?? '-');
    duplicatesEl && (duplicatesEl.innerText = (json.rows_before - json.rows_after) ?? '-');
    scoreEl && (scoreEl.innerText = Math.round(100*(json.rows_after/(json.rows_before||1))) + ' %');

    // prepare preview
    previewData = json.preview || [];
    if(previewData.length && typeof previewData[0] === 'object' && !Array.isArray(previewData[0])){
      const headers = Object.keys(previewData[0]);
      cleanedData = [headers].concat(previewData.map(r=> headers.map(h=> r[h])));
    } else {
      cleanedData = previewData;
    }

    loadColumns(cleanedData);
    renderPreviewTable(cleanedData.slice(0,50));

    uploadsShowDownloads(json.download || null);
    setStatus('Cleaning complete — files ready');
  }catch(err){
    setStatus('Cleaning failed: ' + err.message);
    console.error(err);
  }
});

/* -------------------------
   Downloads UI
--------------------------*/
function uploadsShowDownloads(down){
  if(!downloads) return;
  downloads.innerHTML = '';
  if(!down) return;
  if(down.xlsx){
    const a = document.createElement('a');
    a.href = down.xlsx;
    a.className = 'inline-block bg-emerald-600 px-3 py-2 rounded text-sm mr-2';
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

/* -------------------------
   Filter / Replace functions
--------------------------*/
function applyFilter(){
  if(!cleanedData || !cleanedData.length) return;
  const colIndex = parseInt(columnSelect.value || 0, 10);
  const q = (searchInput.value || '').toLowerCase().trim();
  if(q === '') return renderPreviewTable(cleanedData.slice(0,50));
  // assume cleanedData is array-of-arrays
  const header = cleanedData[0];
  const filtered = [header].concat(cleanedData.slice(1).filter(r => String(r[colIndex]||'').toLowerCase().includes(q)));
  renderPreviewTable(filtered.slice(0,50));
}

function resetFilter(){
  if(!cleanedData) return;
  renderPreviewTable(cleanedData.slice(0,50));
  searchInput.value = '';
}

function replaceValues(){
  if(!cleanedData || !cleanedData.length) return;
  const from = replaceFrom.value;
  const to = replaceTo.value;
  if(from === '') return alert('Enter value to replace');
  cleanedData = cleanedData.map(row => row.map(cell => (String(cell) === from ? to : cell)));
  renderPreviewTable(cleanedData.slice(0,50));
  setStatus(`Replaced "${from}" → "${to}"`);
}

/* -------------------------
   AI Repair placeholder
--------------------------*/
function AIrepair(){
  // This is a placeholder. Connect to a real AI model or job queue for advanced repairs.
  if(!currentFile) return alert('Select a CSV first');
  setStatus('AI repair requested — simulated run (placeholder).');
  // a visual mock: call /api/repair but show extra message
  btnUpload.click();
  // Future: call LLM or ML service, update preview and download
}

/* -------------------------
   Export current preview as client-side CSV (optional)
--------------------------*/
function downloadClientCSV(){
  if(!cleanedData || !cleanedData.length) return alert('No data to download');
  const rows = cleanedData.map(r => r.map(c => `"${String(c).replace(/"/g,'""')}"`).join(',')).join('\n');
  const blob = new Blob([rows], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = 'preview.csv'; a.click();
  URL.revokeObjectURL(url);
}

/* -------------------------
   Wire quick buttons
--------------------------*/
btnRepair && (btnRepair.onclick = AIrepair);
btnAnalyze && (btnAnalyze.onclick = ()=> btnStats && btnStats.click());

/* -------------------------
   Init state
--------------------------*/
(function init(){
  // hide preview container text unless data
  if(previewContainer) previewContainer.innerText = 'No data loaded';
  if(columnSelect) columnSelect.innerHTML = '<option value="0">No columns</option>';
})();
