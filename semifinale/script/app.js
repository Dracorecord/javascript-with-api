// getting all required elements
const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const icon = searchWrapper.querySelector(".icon");
let linkTag = searchWrapper.querySelector("a");

// if user press any key and release
inputBox.onkeyup = (e)=>{
    let userData = e.target.value; //user enetered data
    let emptyArray = [];
    if(userData){
        const baseUrl = 'https://ytstream-download-youtube-videos.p.rapidapi.com/dl'
        icon.onclick = async () =>{
            const url = `${baseUrl}?id=${userData}&geo=DE`
            const errPElement = document.querySelector('.error-p')

                

            const response = await fetch(url, {
                // As in the RapidAPI documentation indicates in their documentation
                // we will need to include this headers on our http request
                headers: {
                    'X-RapidAPI-Key': '3f5f87ca18mshcda8eb59a410ea5p1bf467jsn51597f321a87'
                }
            })
            const jsonResp = await response.json() // We need to parsed the response as json 
    
            // There is a lot of different standard status code
            // I recommend reading through that topic
            // in this case we only need to check the status of 200 
            // 200 = success then we proceed in populating the list
            // otherwise we show error on the html
            if (response.status === 200) {
                const {title,author}= jsonResp // This syntax is called object desctructuring basically we strip down the json object treat it as a variable
                // MAP is a javascript array prototype api 
                // there is a lot of array prototype methods in javascript and
                // one of them is map, it is very similar to for loop
                // it iterates through array and we can perform 
                // logic inside the callback func
                document.getElementById('titl').textContent = title;
                document.getElementById('auth').textContent = author;

                
            } else {
                errPElement.innerHTML = response.statusText
            }
        }
        emptyArray = suggestions.filter((data)=>{
            //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
            return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
        });
        emptyArray = emptyArray.map((data)=>{
            // passing return data inside li tag
            return data = `<li>${data}</li>`;
        });
        searchWrapper.classList.add("active"); //show autocomplete box
        showSuggestions(emptyArray);
        let allList = suggBox.querySelectorAll("li");
        for (let i = 0; i < allList.length; i++) {
            //adding onclick attribute in all li tag
            allList[i].setAttribute("onclick", "select(this)");
        }
    }else{
        searchWrapper.classList.remove("active"); //hide autocomplete box
    }
}



function select(element){
    let selectData = element.textContent;
    inputBox.value = selectData;
    const baseUrl = 'https://ytstream-download-youtube-videos.p.rapidapi.com/dl'
        icon.onclick = async () =>{
            const url = `${baseUrl}?id=${selectData}&geo=DE`
            const errPElement = document.querySelector('.error-p')

                

            const response = await fetch(url, {
                // As in the RapidAPI documentation indicates in their documentation
                // we will need to include this headers on our http request
                headers: {
                    'X-RapidAPI-Key': '3f5f87ca18mshcda8eb59a410ea5p1bf467jsn51597f321a87'
                }
            })
            const jsonResp = await response.json() // We need to parsed the response as json 
    
            // There is a lot of different standard status code
            // I recommend reading through that topic
            // in this case we only need to check the status of 200 
            // 200 = success then we proceed in populating the list
            // otherwise we show error on the html
            if (response.status === 200) {
                const {title,author}= jsonResp // This syntax is called object desctructuring basically we strip down the json object treat it as a variable
                // MAP is a javascript array prototype api 
                // there is a lot of array prototype methods in javascript and
                // one of them is map, it is very similar to for loop
                // it iterates through array and we can perform 
                // logic inside the callback func
                document.getElementById('titl').textContent = title;
                document.getElementById('auth').textContent = author;

                
            } else {
                errPElement.innerHTML = response.statusText
            }
        }
    searchWrapper.classList.remove("active");
}

function showSuggestions(list){
    let listData;
    if(!list.length){
        userValue = inputBox.value;
        listData = `<li>${userValue}</li>`;
    }else{
      listData = list.join('');
    }
    suggBox.innerHTML = listData;
}
