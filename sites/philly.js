function getPhilly(){

  $('#philly .content-row').css('display', 'none');

  fetch('https://api.factmaven.com/xml-to-json/?xml=https://www.inquirer.com/sitemaps/48hour-news-sitemap-i.xml')
  .then(response => response.json())
  .then(data => {

    let allLinks = data.urlset.url;

    let grouped = _.groupBy(allLinks, function(story){
      let section = story.loc.split("https://www.inquirer.com/")[1].split("/")[0]
      return section;
    })

    let allCategories = [];
    let sortedCategories = _.sortBy(grouped, function(data, name){
      if(name === 'newsletters' || name === 'obituaries' || name === 'flyers' || name === 'soccer') {
          console.log(name);
      } else {   
        allCategories.push(name);
        return name;
      }
    })

    let combine = _.zip(sortedCategories, allCategories.sort());


    // group all sports together & remove each category from combine
    let sports = []
    _.each(combine, function(sectionInfo){
      if(sectionInfo[1] === 'college-sports' || sectionInfo[1] === 'eagles' || sectionInfo[1] === 'phillies' || sectionInfo[1] === 'sixers' || sectionInfo[1] === 'sports'){
        sports.push(sectionInfo[0]);
        combine = _.reject(combine, function(entry){ 
          return entry[1] == sectionInfo[1]
        });
      }
    })

    //flatten and add it back to combine array
    let flat = _.flatten(sports, true);
    combine.push([flat, "sports"])

    _.each(combine, function(sectionInfo){
      if(!sectionInfo[1]) return;
      let sectionElement = `<div id="${sectionInfo[1]}-stories-container-philly" class="scrollspy-philly section-container"></div>`
      $('#stories-container-philly').append(sectionElement);

      $(`#${sectionInfo[1]}-stories-container-philly`).append(`<div id="section-container-${sectionInfo[1]}-philly" class="section-container"><h4 class="section-header">${sectionInfo[1]}</h4><div id="philly-section-${sectionInfo[1]}-stories-container" class="section-stories-container">`)

      _.each(sectionInfo[0], function(story){
        let element = "<div class='story-container card-panel'>"
        element += `<span><a href="${story.loc}" target="_blank">${story.news.title}</a></span>`
        element +="</div>"
        $(`#philly-section-${sectionInfo[1]}-stories-container`).append(element)
      })

      $('#scrollspy-list-philly').append(`<li><a href="#${sectionInfo[1]}-stories-container-philly">${sectionInfo[1]}</a></li>`)
    })

    var elems = document.querySelectorAll('.scrollspy-philly');
      let scrollSpyOptions = {
        throttle: 100,
        scrollOffset: 200,
        activeClass: 'active'
      }

      var scrollSpyInstances = M.ScrollSpy.init(elems, scrollSpyOptions);

    $('#preloader-wrapper-philly').css('display', 'none')
    $('#philly .content-row').css('display', 'block');

    $('.section-header').on('click', function(some, thing){
        let sectionName = some.target.innerHTML;
        let isSectionHidden = $(`#philly-section-${sectionName}-stories-container`).hasClass('hide-section')
        if(isSectionHidden){
          $(`#philly-section-${sectionName}-stories-container`).removeClass('hide-section');
          $(some.srcElement).removeClass('hide-section');
        } else {
          $(`#philly-section-${sectionName}-stories-container`).addClass('hide-section');
          $(some.srcElement).addClass('hide-section');
        }
      })

  }).catch(function (error) {
    console.log(error);
  })
}


