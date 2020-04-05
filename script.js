var app = new function () {
    const rowHtml = `
        <tr>
        <td><input type="text"/></td>
        <td><input type="text"/></td>
        <td>
        <button type="button" onclick="app.Save(this)">Save</button>
        <button type="button" onclick="app.Remove(this)">Remove</button>
        </td>
        </tr>`;

    this.el = document.getElementById('models');

    this.Add = function () {
        let newRow = this.el.insertRow(-1);
        let author_cell = newRow.insertCell(-1);
        let title_cell = newRow.insertCell(-1);
        let control_cell = newRow.insertCell(-1);
        let input1 = document.createElement('input');
        let input2 = document.createElement('input');
        let save_btn = document.createElement('button');
        let remove_btn = document.createElement('button');
        save_btn.textContent = "Save";
        save_btn.textContent = "Edit";
        save_btn.setAttribute('onclick', 'app.Save(this)');
        remove_btn.setAttribute('onclick', 'app.Remove(this)');
        author_cell.appendChild(input1);
        title_cell.appendChild(input2);
        control_cell.appendChild(save_btn);
        control_cell.appendChild(remove_btn);
    };

    this.Remove = function (r) {
        let i = r.parentNode.parentNode.sectionRowIndex;
        this.el.deleteRow(i);
    };

    this.Save = function (r) {
        let cells = r.parentNode.parentNode.cells;
        for(let i = 0; i < cells.length - 1; i++) {
            cells[i].textContent = cells[i].firstChild.value;
        }
        cells[cells.length-1].children[0].textContent = 'Edit';
        cells[cells.length-1].children[0].setAttribute('onclick', 'app.Edit(this)')
    };

    this.Edit = function (r) {
        let cells = r.parentNode.parentNode.cells;
        for(let i = 0; i < cells.length - 1; i++) {
            const value = cells[i].textContent;
            const input = document.createElement('input');
            if(cells[i].firstChild) {
                cells[i].replaceChild(input, cells[i].firstChild);
            } else {
                cells[i].appendChild(input);
            }
            cells[i].firstChild.value = value;
        }
        cells[cells.length-1].children[0].textContent = 'Save';
        cells[cells.length-1].children[0].setAttribute('onclick', 'app.Save(this)')
    }
};
