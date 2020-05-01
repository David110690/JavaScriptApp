class Product {
    constructor(name, price, year, quantity){
        this.name = name;
        this.price = price;
        this.year = year; 
        this.quantity = quantity;
    }
}

class UI {
    addProduct(product){
        const productlist = document.getElementById("product-list");
        const element = document.createElement("div");
        element.innerHTML = `  
            <div class ="card text-center mb-1">
                <div class="card-body">
                    <strong>Product Name</strong>:${product.name}
                    <strong>Product Price</strong>:${product.price}
                    <strong>Product Year</strong>:${product.year}
                    <strong>Product Quantity</strong>:${product.quantity}
                    <a href="#" class="btn btn-danger" name="delete">Delete</a> 
                </div>
            </div>
        `;
        
        productlist.appendChild(element);
    }

    resetForm(){
        document.getElementById("product-form").reset();
    }


    deleteProduct(element){
        if(element.name === "delete"){
            element.parentElement.parentElement.parentElement.remove();
            this.showMessage("Producto Eliminado", "danger");
        }

    }
    showMessage(message, cssClass){
        const div = document.createElement("div");
        div.className = `alert alert-${cssClass} mt-2`;
        div.appendChild(document.createTextNode(message));
        const container =document.querySelector(".container");
        const app = document.querySelector("#App");
        container.insertBefore(div, app);
        setTimeout(function(){
            document.querySelector(`.alert`).remove()

        }, 3000);
    }
}

//DOM Events
document.getElementById("product-form")
    .addEventListener("submit",function(e){
        const name = document.getElementById("name").value;
        const price = document.getElementById("price").value;
        const year = document.getElementById("year").value;
        const quantity = document.getElementById("quantity").value; 
        const product = new Product(name, price, year, quantity)
        const ui = new UI();

        if (name === `` || price === `` || year === ``){
            return ui.showMessage("Complete los campos", "info")
        }

        ui.addProduct(product);
        ui.resetForm();
        ui.showMessage("Producto agregado", "success");
        e.preventDefault() 
    });

document.getElementById("product-list").addEventListener("click", function(e){
    const ui=new UI();
    ui.deleteProduct(e.target);
});
