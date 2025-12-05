async function uploadCSV(){
    let file = document.getElementById("csv").files[0];
    let form = new FormData();
    form.append("file", file);

    let res = await fetch("/clean", { method:"POST", body: form });
    let data = await res.json();

    document.getElementById("output").innerText = JSON.stringify(data, null, 2);
}
