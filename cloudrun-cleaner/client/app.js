async function uploadCSV(){
    let file = document.getElementById("csv").files[0];
    let form = new FormData();
    form.append("file", file);

    let res = await fetch("/clean", { method:"POST", body: form });
    let data = await res.json();

    showStats(data.stats);
    renderTable(data.preview);
    window.fileToken = data.file;  // ho an'ny download

    document.getElementById("dl").style.display="block";
}

function showStats(s){
    document.getElementById("stats").classList.remove("hidden");
    document.getElementById("stats").innerHTML = `
        ${card("📌 Total Rows", s.total)}
        ${card("🧹 Cleaned", s.cleaned)}
        ${card("⭕ Empty Rows", s.empty)}
        ${card("🔁 Duplicates", s.duplicates)}
        ${card("📊 Quality Score", s.quality+"%")}
    `;
}

function card(label,val){
    return `<div class='bg-gray-700 p-4 rounded text-center'>
            <h2 class='text-lg font-bold'>${label}</h2>
            <p class='text-3xl text-yellow-400 mt-2'>${val}</p>
        </div>`;
}

function renderTable(rows){
    document.getElementById("table").classList.remove("hidden");
    let html = "<table class='w-full text-sm'><tr>"+
       Object.keys(rows[0]).map(h=>`<th class='border p-1'>${h}</th>`).join("")+"</tr>"+
       rows.map(r=>"<tr>"+Object.values(r).map(v=>`<td class='border p-1'>${v}</td>`).join("")+"</tr>").join("")
       +"</table>";
    document.getElementById("table").innerHTML = html;
}

function downloadFile(){
    location.href = "/download/" + window.fileToken;
}
