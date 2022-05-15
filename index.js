let categories = JSON.parse(localStorage.getItem("categories"));

let getData = async () =>{
    try{ 
    let myResponse = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
    let data = await myResponse.json();

    localStorage.setItem("categories" , JSON.stringify(data.categories));

    window.location.reload();
    

    }catch(error){
        console.log(error);
    }
}

if(categories === null){
    getData();

}

JSON.parse(localStorage.getItem("categories")).forEach((category) => {
    let optionEle = document.createElement("option");
     optionEle.value = category.strCategory;
     optionEle.textContent = category.strCategory;

     document.getElementById("selectCategory").append(optionEle);
})

document.getElementById("selectCategory").addEventListener("change" , fetchAndDisplayData);

 async function fetchAndDisplayData(){
       let selectValue = document.getElementById("selectCategory").value;
     
       let myResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectValue}`);

       let data = await myResponse.json();
       displayFoodData(data.meals);
}

function displayFoodData(data){
    document.getElementById("foodContainer").innerText = "";
    data.forEach((meal) =>{
    
        let foodCard = document.createElement("div");
        let img = document.createElement("img");
         img.src = meal.strMealThumb;
         let text = document.createElement("p");
         text.innerText = meal.strMeal;

         foodCard.append(img , text);

         document.getElementById("foodContainer").append(foodCard);
    })
}





