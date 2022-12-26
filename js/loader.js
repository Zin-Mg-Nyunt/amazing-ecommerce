export let showLoaderUi = function(){
    const loader = document.createElement("div");
    loader.classList.add("loader","animate__animated","animate__fadeInDown","fixed-top");
    loader.innerHTML = `
      <div class="min-vh-100 d-flex justify-content-center align-items-center bg-white">
          <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
          </div>
          <span class="text-primary fs-2 ms-2">Loading...</span>
      </div>
    `;
    document.body.append(loader);
  }

export let removeLoaderUi = function() {
    const loaderDiv = document.querySelector('.loader');
    loaderDiv.classList.replace("animate__fadeInDown", "animate__fadeOutDown");
    loaderDiv.addEventListener("animationend", _=>loaderDiv.remove())
  }
  