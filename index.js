class Item {
    constructor(name) {
        this.name - name;
        this.type = [];
    }

    addType(name, creation) {
        this.type.push(new Type(name, creation));
    }
}

class Type {
    constructor(name, creation) {
        this.name = name;
        this.creation = creation;
    }
}

class ItemService {
    static url = 'https://ancient-taiga-31359.herokuapp.com/api/items';

    static getAllItems() {
        return $.get(this.url);
    }

    static getItem(id) {
        return $.get(this.url + `/${id}`);
    }

    static createItem(item) {
        return $.post(this.url, item);
    }

    static updateItem(item) {
        return $.ajax({
            url: this.url + `/${house._id}`,
            dataType: 'json',
            data: JSON.stringify(item),
            contentType: 'application/json',
            type: 'PUT'
        });
    }    

    static deleteItem(id) {
        return $.ajax({
            url: this.url + `/${id}`,
            type: 'DELETE'
        });
    }
}

class DOMManager {
    static items;

    static getAllItems() {
        ItemService.getAllItems().then(items => this.render(items));
    }


    static deleteItems(id) {
        ItemService.deleteItem(id)
            .then(() => {
                return ItemService.getAllItems();
            })
            .then((items) => this.render(items));
    }
 
    static render(items) {
        this.items = items;
        $('#app').empty();
        for (let item of items) {
            $('#app').prepend(
                `<div id="${item._id}" class="card">
                    <div class="card-header">
                        <h2>${item.name} </h2>
                        <button class="btn btn-danger" onclick="DOMManager.deleteItem('${item._id}')">Delete</button>
                    </div>
                    <div class="card-body">
                        <div class="card">
                            <div class="row">
                                <div class="col-sm">
                                    <input type="text" id="${item._id}-type-name" class ="form-control" placeholder="Type Name">
                    </div>
                    <div class="col-sm">
                        <input type="text" id="${item._id}-type-area" class ="form-control" placeholder="Type Area">
                    
                            </div>
                        </div>
                        <button id=${items._id}-new-type" onclick="DOMManager.addType('${items._id}')" class="btn btn-primary form-control">Add</button>
                    </div>
                 </div><br>`

            );
            for (let type of items.type) {
                $(`#${items._id}`).find('.card-body').append(
                    `<p>
                    <span id="name-${type._id}"><strong>Name: </strong> ${type.name}</span>
                    <span id="name-${type._id}"><strong>Area: </strong> ${type.area}</span>
                    <button class="btn btn-danger" onclick="DOMManager.deleteType('${item._id}', '${type._id}')">Delete Type</button>`
                )
            }
        }
    }
}

DOMManager.getAllItems();