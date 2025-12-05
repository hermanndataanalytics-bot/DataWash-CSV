// =====================
//  DataWash-CSV™ - Frontend
//  app.js (Clean version)
// =====================

// 📌 Handle CSV Upload & Cleaning Process
async function uploadCSV() {

    const file = document.getElementById("csv").files[0];
    if(!file){
        alert("⚠ Select CSV first!");
        return;
    }

    let form = new FormData();
    form.append("file", file);

    // 🔥 Send to backend → receive cleaned Excel
    const res = await fetch("/clean", {
        method: "POST",
        body: form
    });

    const blob = await res.blob();
    const downloadUrl = window.URL.createObjectURL(blob);

    // 📄 Auto download XLSX
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = "Cleaned_Data.xlsx";
    a.click();

    // Clean URL temp
    window.URL.revokeObjectURL(downloadUrl);
}



// =============================
//   📊 Get Cleaning Statistics
// =============================
async function getStats() {

    const file = document.getElementById("csv").files[0];
    if(!file){
        alert("⚠ Please upload a file first!");
        return;
    }

    let form = new FormData();
    form.append("file", file);

    const res = await fetch("/api/stats", {
        method: "POST",
        body: form
    });

    const stats = await res.json();

    // Display results in the UI
    document.getElementById("total").innerText      = stats.rows_total;
    document.getElementById("empty").innerText      = stats.empty_rows;
    document.getElementById("duplicates").innerText = stats.duplicates;
    document.getElementById("score").innerText      = stats.quality_score+" %";
}

