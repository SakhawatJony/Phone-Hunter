console.log('hello')
// Spinner use
       const toggleSpinner = displayStyle => {
           document.getElementById('spinner').style.display = displayStyle;
       }
// searchbox value and button work
const searchPhone = () => {
    const searchFiled = document.getElementById('searchFiled')
    const searchText = searchFiled.value
    if(searchText === ''){
        const noValuePrint = document.getElementById('no-value')
            noValuePrint.innerText = 'your search value " " please search book name'
    }
    
    // console.log(searchText)
    searchFiled.value = ''
    toggleSpinner('block')
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
   

    fetch(url)
    .then (res => res.json())
    .then (data => displaySearchResult(data))

    const productDetails = document.getElementById('phoneDitails')

    productDetails.innerHTML = ''
}
// searchbox value and button work end

const displaySearchResult  = searchItemInfo => {
    const searchResult = document.getElementById("searchResult")
    console.log(searchItemInfo.data)
    
    // another search Result hide
    searchResult.textContent = ''

    //serch result
    const phone = searchItemInfo.data

    //search value count
    const searchValueCount = document.getElementById('search-value-count');
    searchValueCount.innerText = `Find result ${phone.length}` 


    //Search result not matched
                    if(phone.length === 0){
                        const noValuePrint = document.getElementById('no-value')
                        noValuePrint.innerText = 'Your search not matched'
                        toggleSpinner('none')
                    }
                    else{
                        const noValuePrint = document.getElementById('no-value')
                        noValuePrint.innerText = ''
                    }
    // Search result not matched end
             
    // Loop vavohar kora sobgulu data pawa
                   phone.slice(0,20).forEach(phone => {
            //Display Result print
                    
                    const div = document.createElement('div')
                    div.classList.add('col-sm-6','col-xl-4','col-lg-4','g-4','mb-4')
                    div.innerHTML = `
                        <div class="card  p-3">
                                <div class="bg-light">
                                        <img src="${phone.image}" height="400px" width="100%" alt="">
                                </div>
                                <div class="mt-3">
                                        <h4 class="card-title">${phone.phone_name}</h4>

                                        <p>Brand: ${phone.brand}</p>
                                       
                                <button class="btn btn-outline-primary" onclick="buttonDetails('${phone.slug}')">Details</button>
                                </div> 
                            </div>
                        </div>
                    `
                    searchResult.appendChild(div)
                    toggleSpinner('none')
                    });

                    
            //Display Result print
}

const buttonDetails = phones => {
    console.log(phones)

    const url = `https://openapi.programming-hero.com/api/phone/${phones}`

    fetch(url)
    .then (res => res.json())
    .then (data => phoneDetails(data))
}

const phoneDetails = (data) => {
//    console.log(data)

   const productDetails = document.getElementById('phoneDitails')
   
   const details = data.data

   console.log(details)


   productDetails.innerHTML = `
   <div class="card mb-3 mx-auto mt-5 p-5 w-50%" style="max-width: 540px;">
            <div class="row g-0">
              <div class="col-md-4">
                <img src="${details.image}" class="img-fluid rounded-start" alt="...">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title fw-bold">${details.name}</h5>
                  <p class="card-text "><small class="fw-bold">Storage:</small> ${details.mainFeatures.storage}</p>
                  <p class="card-text "><small class="fw-bold">Display Size:</small> ${details.mainFeatures.displaySize}</p>
                  <p class="card-text "><small class="fw-bold">Memory:</small> ${details.mainFeatures.memory}</p>
                  <p class="card-text "><small class="fw-bold">ReleaseDate:</small> ${details.releaseDate}</p>
                </div>
              </div>
            </div>
          </div>
   `
}

