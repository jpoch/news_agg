let hasAxiosLoaded = false;
let hasWapoLoaded = false;


document.addEventListener("DOMContentLoaded", function(){
  
  var elem = document.querySelector('.tabs');
  var instance = M.Tabs.init(elem, {});

  //add event for tab click
  $('.tab').on('click', tabClicked)


  let firstTabHash = $('.tab').first()[0].firstChild.hash;
  // console.log(firstTabHash);
  getPage(firstTabHash);
  getPage('#wapo');
});


function tabClicked(tabInfo){
  getPage(tabInfo.target.hash);
}

function getPage(hash){
  switch (hash) {
    case '#axios':
      if(!hasAxiosLoaded){
        getAxiosPage()
        hasAxiosLoaded = true;
      }
      break;
    case '#wapo':
      if(!hasWapoLoaded){
        getWapoXML()
        hasWapoLoaded = true;
      }
      break;
    default:
      console.log("default");
  }
}




