const products = [
    { name: "Kurti", price: 799, image: "projectphotos/box8_image.jpg" },
    { name: "Shoes", price: 1299, image: "projectphotos/shoes1.jfif" },
    { name: "Watch", price: 999, image: "projectphotos/watch.jfif" },
    { name: "skincare", price: 5000, image: "projectphotos/skincare1.jfif" },
    { name: "headphone", price: 10000, image: "projectphotos/headphone.jfif" },
    { name: "Shoes", price: 1299, image: "projectphotos/shoes.jpg" },
    { name: "Shoes", price: 1299, image: "projectphotos/shoes2.jpg" },
    { name: "skincare", price: 5000, image: "projectphotos/skincare2.jfif" },
    { name: "Jewelary", price: 5000, image: "projectphotos/set.jfif" }

];

const list = document.getElementById("productList");

products.forEach(p => {

    list.innerHTML += `
<div class="card" style="width:18rem">
      <img src="${p.image}" class="card-img-top" alt="${p.name}">

  <div class="card-body">
    <h5 class="card-title">${p.name}</h5>
    <p class="card-text">₹${p.price}</p>
    <button class="btn btn-primary">Add to Cart</button>
  </div>
</div>
`;
});

