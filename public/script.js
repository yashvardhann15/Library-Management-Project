const option = document.getElementById('option');
const main  = document.getElementById('main');

option.addEventListener('change', async () => {
    if(option.value == 1) {
        const {data} = await axios.get("http://localhost:5000/allMembers");
        populateTable(data);
        return;
    }
    if(option.value == 2) {
        const {data} = await axios.get("http://localhost:5000/allBooks");
        populateTable(data);
        return;
    }
    if(option.value == 3) {
        const {data} = await axios.get("http://localhost:5000/allTransaction");
        populateTable(data);
        return;
    }
    if(option.value == 4) {
        const {data} = await axios.get("http://localhost:5000/fineRecord");
        populateTable(data);
        return;
    }
    if(option.value == 5) {
        const {data} = await axios.get("http://localhost:5000/allAuthor");
        populateTable(data);
        return;
    }
    if(option.value == 6) {
        main.innerHTML = `<input type="text" id="query"> <input type="button" id="btn" value="submit">`;
        const query = document.getElementById('query');
        const btn = document.getElementById('btn');
        btn.addEventListener('click', async () => {
            const {data} = await axios.post("http://localhost:5000/run",{query:query.value});
            populateTable(data)
        })
    }
})

function populateTable(data) {
    main.innerHTML = `<table id="data-table"> </table>`
    const table = document.getElementById("data-table");
    table.innerHTML = "";
    const headers = table.createTHead();
    const headerRow = headers.insertRow(0);
    for (const key in data[0]) {
        const headerCell = document.createElement("th");
        headerCell.innerHTML = key;
        headerRow.appendChild(headerCell);
    }
    data.forEach((item) => {
        const row = table.insertRow();
        for (const key in item) {
            if (item.hasOwnProperty(key)) {
                const cell = row.insertCell();
                cell.innerHTML = item[key];
            }
        }
    });
}


