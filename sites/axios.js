function getAxiosPage(){
  //settings
let maxNationalStories = 60;

$('#axios .content-row').css('display', 'none');

//get data
fetch('https://api.factmaven.com/xml-to-json/?xml=https://www.axios.com/sitemaps/news.xml')
.then(response => response.json())
.then(data => {
  let allLinks = data.urlset.url;


  //separate local & national
  let grouped = _.groupBy(allLinks, function(story){
    if(story.loc.split("/local/").length > 1){
      return `local`;
    } else {
      return 'national'
    }
  })

  $('#stories-container-axios').append(`<div id="national-container" class="scrollspy-axios location-container"><h4 class="section-header">national</h4><div class="location-stories-container stories-container location-stories-container-national" id="national-stories-container">`)


  let counter = 0
  _.each(grouped.national, function(story){
    if(counter >= maxNationalStories) return; //counter to limit # of national stories to show


    let element = "<div class='story-container card-panel'>"
      element += `<span><a href="${story.loc}" target="_blank">${story.news.title}</a></span>`;
      element +="</div>";

      $('#national-stories-container').append(element);

      counter++;
  })


  let groupedLocal = _.groupBy(grouped.local, function(location){
    return location.loc.split("/local/")[1].split("/")[0];
  })


  let allCities = [];
  let sortedLocal = _.sortBy(groupedLocal, function(data, name){
    allCities.push(name);
    return name;
  })


  let combine = _.zip(sortedLocal, allCities.sort());
  _.each(combine, function(locationInfo){
  //add location section to stories container
  $('#stories-container-axios').append(`<div id="location-container-${locationInfo[1]}" class="scrollspy-axios location-container"><h4 class="section-header section-header-${locationInfo[1]}">${locationInfo[1]}</h4><div class="location-stories-container location-stories-container-${locationInfo[1]}">`)


  //loop through to add stories to location container
  _.each(locationInfo[0], function(story){
    let element = "<div class='story-container card-panel'>"
    element += `<span><a href="${story.loc}" target="_blank">${story.news.title}</a></span>`
    element +="</div>"
    $(`.location-stories-container-${locationInfo[1]}`).append(element)
  })


  //close stories container
  $('#stories-container-axios').append(`</div></div>`);


})


  $('#scrollspy-list-axios').append(`<li><a href="#national-container">national</a></li>`)

  _.each(allCities, function(city) {
  //add link for the location to the scrollspy
    $('#scrollspy-list-axios').append(`<li><a href="#location-container-${city}">${city}</a></li>`)
  })


})
.then(() => {
  var elems = document.querySelectorAll('.scrollspy-axios');
  let scrollSpyOptions = {
    throttle: 100,
    scrollOffset: 200,
    activeClass: 'active'
  }


  var scrollSpyInstances = M.ScrollSpy.init(elems, scrollSpyOptions);
  var elems = document.querySelectorAll('.tap-target');
  var settings = M.TapTarget.init(elems, {});


  function toggleSettings(){
    settings[0].isOpen ? settings[0].close() : settings[0].open();
  }


  // $('#settings-button').on('click', toggleSettings)
  $('#preloader-wrapper-axios').css('display', 'none')
  $('#axios .content-row').css('display', 'block');

  $('.section-header').on('click', function(some, thing){
        let sectionName = some.target.innerHTML;
        let isSectionHidden = $(`.location-stories-container-${sectionName}`).hasClass('hide-section')
        if(isSectionHidden){
          $(`.location-stories-container-${sectionName}`).removeClass('hide-section');
          console.log(some)
          $(some.srcElement).removeClass('hide-section');
        } else {
          $(`.location-stories-container-${sectionName}`).addClass('hide-section');
          $(some.srcElement).addClass('hide-section');
        }
      })

  }); //then end

}