let hasAxiosLoaded = false;
let hasWapoLoaded = false;
let hasMwLoaded = false;
let hasNytLoaded = false;
let hasPhillyLoaded = false;
let hasConversationLoaded = false;
let hasWiredLoaded = false;
let hasPoliticoLoaded = false;
let hasNprLoaded = false;
let hasAthleticLoaded = false;

document.addEventListener("DOMContentLoaded", function(){
  var elem = document.querySelector('.tabs');
  var instance = M.Tabs.init(elem, {});

  //add event for tab click
  $('.tab').on('click', tabClicked)

  let firstTabHash = $('.tab').first()[0].firstChild.hash;

  getPage(firstTabHash);
  // getPage('#wapo');
});


function tabClicked(tabInfo){
  getPage(tabInfo.target.hash);
}

function getPage(hash){
  ///todo: fix flag so it does not set to true unless data loaded success instead of assuming it is OK.
  switch (hash) {
    case '#axios':
    if(!hasAxiosLoaded){
      getAxiosPage()
      // makeAxiosGet();
      hasAxiosLoaded = true;
    }
    break;
    case '#wapo':
    if(!hasWapoLoaded){
      getWapoXML()
      hasWapoLoaded = true;
    }
    break;
    case '#marketwatch':
    if(!hasMwLoaded){
      getMarketwatch()
      hasMwLoaded = true;
    }
    break;
    case '#nyt':
    if(!hasNytLoaded){
      getNyt()
      hasNytLoaded = true;
    }
    break;
    case '#philly':
    if(!hasPhillyLoaded){
      getPhilly()
      hasPhillyLoaded = true;
    }
    break;
    case '#conversation':
    if(!hasConversationLoaded){
      getConversation()
      hasConversationLoaded = true;
    }
    break;
    case '#wired':
    if(!hasWiredLoaded){
      getWired()
      hasWiredLoaded = true;
    }
    break;
    case '#politico':
    if(!hasPoliticoLoaded){
      getPolitico()
      hasPoliticoLoaded = true;
    }
    break;
    case '#npr':
    if(!hasNprLoaded){
      getNpr()
      hasNprLoaded = true;
    }
    break;
    case '#athletic':
    if(!hasAthleticLoaded){
      getAthletic()
      hasAthleticLoaded = true;
    }
    break;
    default:
    console.log("default");
  }
}


// function makeAxiosGet(){
//   console.log('hello')
//   axios({
//     method: 'get',
//     url: "https://www.axios.com/sitemaps/news.xml",
//   })
//   .then(function (response) {
//     console.log(response)
//   })
//   .catch((e) => {
//     console.log(e);
//   });
// }





