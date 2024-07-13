function getWapoXML(){

  $('#wapo .content-row').css('display', 'none');
  $('#preloader-wrapper-wapo .preloader-wrapper').css('display', 'block')
  $('#preloader-wrapper-wapo #wapo-retry-button').css('display', 'none')

fetch('https://xml-json-alpha.vercel.app/api?xml=https://www.washingtonpost.com/sitemaps/news-sitemap.xml.gz')
  // fetch('http://localhost:8000/api?xml=https://www.washingtonpost.com/sitemaps/news-sitemap.xml.gz')
  .then(response => response.json())
  .then(data => {
    let allLinks = data.urlset.url;

    let grouped = _.groupBy(allLinks, function(story){
      let section = story.loc.split("https://www.washingtonpost.com/")[1].split("/")[0]
      return section;
    })

    let allCategories = [];
    let sortedCategories = _.sortBy(grouped, function(data, name){
      if(name === 'kidspost' || name === 'washington-post-live' || name === 'obituaries' || name === 'es' || name === 'comics' || name === 'podcasts' || name === 'goingoutguide') {
          console.log(name);
      } else {   
        allCategories.push(name);
        return name;
      }
    })


    let combine = _.zip(sortedCategories, allCategories.sort());

    _.each(combine, function(sectionInfo){
      if(!sectionInfo[1]) return;
      let sectionElement = `<div id="${sectionInfo[1]}-stories-container-wapo" class="scrollspy-wapo section-container"></div>`
      $('#stories-container-wapo').append(sectionElement);

      $(`#${sectionInfo[1]}-stories-container-wapo`).append(`<div id="section-container-${sectionInfo[1]}-wapo" class="section-container"><h4 class="section-header">${sectionInfo[1]}</h4><div id="wapo-section-${sectionInfo[1]}-stories-container" class="section-stories-container">`)

      _.each(sectionInfo[0], function(story){
        let element = "<div class='story-container card-panel'>"
        element += `<span><a href="${story.loc}" target="_blank">${story.news.title}</a></span>`
        element +="</div>"
        $(`#wapo-section-${sectionInfo[1]}-stories-container`).append(element)
      })

      $('#scrollspy-list-wapo').append(`<li><a href="#${sectionInfo[1]}-stories-container-wapo">${sectionInfo[1]}</a></li>`)
    })

    var elems = document.querySelectorAll('.scrollspy-wapo');
      let scrollSpyOptions = {
        throttle: 100,
        scrollOffset: 200,
        activeClass: 'active'
      }

      var scrollSpyInstances = M.ScrollSpy.init(elems, scrollSpyOptions);

      $('#preloader-wrapper-wapo').css('display', 'none')
      $('#wapo .content-row').css('display', 'block');

      $('.section-header').on('click', function(some, thing){
        let sectionName = some.target.innerHTML;
        let isSectionHidden = $(`#wapo-section-${sectionName}-stories-container`).hasClass('hide-section')
        if(isSectionHidden){
          $(`#wapo-section-${sectionName}-stories-container`).removeClass('hide-section');
          $(some.srcElement).removeClass('hide-section');
        } else {
          $(`#wapo-section-${sectionName}-stories-container`).addClass('hide-section');
          $(some.srcElement).addClass('hide-section');
        }
      })

  }).catch(function (error) {
    // if there's an error, log it
    console.log(error);
    $('#preloader-wrapper-wapo .preloader-wrapper').css('display', 'none')
    $('#preloader-wrapper-wapo #wapo-retry-button').css('display', 'block')
    // getWapoXML();
  })
}




// for using rss feed, not used now
function getWapoPage(){

  let wapoNews = {};

  Promise.all([
    fetch('https://api.rss2json.com/v1/api.json?rss_url=http://feeds.washingtonpost.com/rss/politics'),
    fetch('https://api.rss2json.com/v1/api.json?rss_url=http://feeds.washingtonpost.com/rss/national'),
    fetch('https://api.rss2json.com/v1/api.json?rss_url=http://feeds.washingtonpost.com/rss/world'),
    fetch('https://api.rss2json.com/v1/api.json?rss_url=http://feeds.washingtonpost.com/rss/business'),
    fetch('https://api.rss2json.com/v1/api.json?rss_url=http://feeds.washingtonpost.com/rss/lifestyle'),
  ])
  .then(function (responses) {
    return Promise.all(responses.map(function (response) {
      return response.json();
    }));
  }).then(function (data) {
    _.each(data, function(section){
      let sectionName = section.feed.title;
      wapoNews[sectionName] = section.items;
    })

    _.each(wapoNews, function(sectionStories, sectionName){
      let sectionElement = `<div id="${sectionName}-stories-container-wapo" class="scrollspy-wapo section-container"></div>`
      $('#stories-container-wapo').append(sectionElement);

      $(`#${sectionName}-stories-container-wapo`).append(`<div id="section-container-${sectionName}-wapo" class="section-container"><h4>${sectionName}</h4><div id="wapo-section-${sectionName}-stories-container" class="section-stories-container">`)

      _.each(sectionStories, function(story){
        let cleanLink = story.link.split("?")[0];
        let element = "<div class='story-container card-panel'>"
        element += `<span><a href="${cleanLink}" target="_blank">${story.title}</a></span>`
        element +="</div>"
        $(`#wapo-section-${sectionName}-stories-container`).append(element)
      })

      $('#scrollspy-list-wapo').append(`<li><a href="#${sectionName}-stories-container-wapo">${sectionName}</a></li>`)
    })
  }).catch(function (error) {
    // if there's an error, log it
    console.log(error);
  })
  .then(() => {
    var elems = document.querySelectorAll('.scrollspy-wapo');
      let scrollSpyOptions = {
        throttle: 100,
        scrollOffset: 200,
        activeClass: 'active'
      }

      var scrollSpyInstances = M.ScrollSpy.init(elems, scrollSpyOptions);

      // var elems = document.querySelectorAll('.tap-target');
      // var settings = M.TapTarget.init(elems, {});
  });  
}