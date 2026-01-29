const products = [
    { id: 1, name: "Kurti", price: 799, image: "projectphotos/box8_image.jpg" },
    { id: 2, name: "Shoes", price: 1299, image: "projectphotos/shoes1.jfif" },
    { id: 3, name: "Watch", price: 999, image: "projectphotos/watch.jfif" },
    { id: 4, name: "Skincare", price: 5000, image: "projectphotos/skincare1.jfif" },
    { id: 5, name: "Headphone", price: 10000, image: "projectphotos/headphone.jfif" },
    { id: 6, name: "Shoes", price: 1299, image: "projectphotos/shoes.jpg" },
    { id: 7, name: "Shoes", price: 1299, image: "projectphotos/shoes2.jpg" },
    { id: 8, name: "Skincare", price: 5000, image: "projectphotos/skincare2.jfif" },
    { id: 9, name: "Jewelry", price: 5000, image: "projectphotos/set.jfif" },
    { id: 10, name: "Jeans", price: 1000, image : "Women/jeans/j1.jpg"},
    { id: 11, name: "Jeans", price: 2000, image : "Women/jeans/j2.jpg"},
    { id: 12, name: "Jeans", price: 6000, image : "Women/jeans/j3.jpg"},
    { id: 13, name: "Jeans", price: 4000, image : "Women/jeans/j4.jpg"},
    { id: 14, name: "Jeans", price: 5000, image : "Women/jeans/j5.jpg"},
    { id: 15, name: "Jeans", price: 6000, image : "Women/jeans/j6.jpg"},
    { id: 16, name: "Jeans", price: 300, image : "Women/jeans/j7.jpg"},
    { id: 17, name: "Jeans", price: 200, image : "Women/jeans/j8.jpg"},
    { id: 18, name: "Jeans", price: 3000, image : "Women/jeans/j9.jpg"},
    { id: 19, name: "Jeans", price: 5000, image : "Women/jeans/j11.jpg"},
    { id: 20, name: "Jeans", price: 600, image : "Women/jeans/j12.jpg"},
    { id: 21, name: "Jeans", price: 6000, image : "Women/jeans/j13.jpg"},
    { id: 22, name: "Jeans", price: 9090, image : "Women/jeans/j14.jpg"},
    { id: 23, name: "Jeans", price: 6000, image : "Women/jeans/j15.jpg"},
    { id: 24, name: "Jeans", price: 600, image : "Women/jeans/j19.jpg"},
    { id: 25, name: "Jeans", price: 8000, image : "Women/jeans/j20.jpg"},


];


const list = document.getElementById("productList");
const searchBox = document.getElementById("searchBox");

products.forEach(p => {

    list.innerHTML += `
<div class="card" style="width:18rem">
      <img src="${p.image}" class="card-img-top" alt="${p.name}">

  <div class="card-body">
    <h5 class="card-title">${p.name}</h5>
    <p class="card-text">₹${p.price}</p>
    <button class="btn btn-primary" onclick="addToCart(${p.id})">Add to Cart</button>
  </div>
</div>
`;
});

function addToCart(productId){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let product = products.find(p => p.id === productId);
    let existing = cart.find(item => item.id === productId);
    if(existing){
        existing.quantity +=1;

    }
    else{
        cart.push({
            id:product.id,
            name:product.name,
            price : product.price,
            image:product.image,
            quantity:1
        });
    }
    localStorage.setItem("cart",JSON.stringify(cart));
    alert(product.name+ "added to cart ");
}

//This logic is implemented for showing filtered element on the frontend 

function displayProducts(items) {
    list.innerHTML = "";  // clear old items

    items.forEach((p, index) => {
        list.innerHTML += `
        <div class="card m-2" style="width:18rem">
            <img src="${p.image}" class="card-img-top">
            <div class="card-body">
                <h5>${p.name}</h5>
                <p>₹${p.price}</p>
                <button class="btn btn-primary" onclick="addToCart(${index})">Add to Cart</button>
            </div>
        </div>`;
    });
}

// Initial load
displayProducts(products);

//This Logic is used for search logic 
searchBox.addEventListener("keyup", function () {
    const value = searchBox.value.toLowerCase();

    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(value)
    );

    displayProducts(filtered);
});