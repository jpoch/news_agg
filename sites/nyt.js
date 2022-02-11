function getNyt(){

  $('#nyt .content-row').css('display', 'none');


  fetch('https://api.factmaven.com/xml-to-json/?xml=https://www.nytimes.com/sitemaps/new/news-1.xml.gz')
  .then(response => response.json())
  .then(data => {

    let allLinks = data.urlset.url;
    let stories = _.first(allLinks, [400]);

    let grouped = _.groupBy(stories, function(story){
      let section = story.loc.split("https://www.nytimes.com/")[1].split("/");
      if(parseInt(section[0]) > 2020){
        return section[3]
      }
    })

    let allCategories = [];
    let sortedCategories = _.sortBy(grouped, function(data, name){
      if(name === 'briefing' || name === 'learning' || name === 'obituaries' || name === 'crosswords' || name === 'todayspaper' || name === undefined) {
          console.log(name);
      } else {   
        allCategories.push(name);
        return name;
      }
    })


    let combine = _.zip(sortedCategories, allCategories.sort());

    _.each(combine, function(sectionInfo){
      if(sectionInfo[1] === 'undefined' || !sectionInfo[1]) return;
      let sectionElement = `<div id="${sectionInfo[1]}-stories-container-nyt" class="scrollspy-nyt section-container"></div>`
      $('#stories-container-nyt').append(sectionElement);

      $(`#${sectionInfo[1]}-stories-container-nyt`).append(`<div id="section-container-${sectionInfo[1]}-nyt" class="section-container"><h4>${sectionInfo[1]}</h4><div id="nyt-section-${sectionInfo[1]}-stories-container" class="section-stories-container">`)

      _.each(sectionInfo[0], function(story){
        let element = "<div class='story-container card-panel'>"
        element += `<span><a href="${story.loc}" target="_blank">${story.news.title}</a></span>`
        element +="</div>"
        $(`#nyt-section-${sectionInfo[1]}-stories-container`).append(element)
      })

      $('#scrollspy-list-nyt').append(`<li><a href="#${sectionInfo[1]}-stories-container-nyt">${sectionInfo[1]}</a></li>`)
    })


    var elems = document.querySelectorAll('.scrollspy-nyt');
      let scrollSpyOptions = {
        throttle: 100,
        scrollOffset: 200,
        activeClass: 'active'
      }

      var scrollSpyInstances = M.ScrollSpy.init(elems, scrollSpyOptions);

      $('.preloader-wrapper-nyt').css('display', 'none')
      $('#nyt .content-row').css('display', 'block');

  }).catch(function (error) {
    console.log(error);
  })
}


function parseURL(link){

}