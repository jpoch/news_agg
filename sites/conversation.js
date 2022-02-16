function getConversation(){

  $('#conversation .content-row').css('display', 'none');

  Promise.all([
    fetch('https://api.factmaven.com/xml-to-json/?xml=https://theconversation.com/us/sitemap_news.xml'),
    fetch('https://api.factmaven.com/xml-to-json/?xml=https://theconversation.com/ca/sitemap_news.xml'),
    fetch('https://api.factmaven.com/xml-to-json/?xml=https://theconversation.com/uk/sitemap_news.xml'),
    fetch('https://api.factmaven.com/xml-to-json/?xml=https://theconversation.com/africa/sitemap_news.xml'),
    fetch('https://api.factmaven.com/xml-to-json/?xml=https://theconversation.com/au/sitemap_news.xml'),
  ])
  .then(function (responses) {
    return Promise.all(responses.map(function (response) {
      return response.json();
    }));
  }).then(function (data) {
    
    let allData = [
      {name: "united-states", stories: data[0].urlset.url}, 
      {name: "canada", stories: data[1].urlset.url},
      {name: "uk", stories: data[2].urlset.url},
      {name: "africa", stories: data[3].urlset.url},
      {name: "australia", stories: data[4].urlset.url},
    ]

    _.each(allData, function(sectionInfo){
      let sectionElement = `<div id="${sectionInfo.name}-stories-container-conversation" class="scrollspy-conversation section-container"></div>`
      $('#stories-container-conversation').append(sectionElement);

      $(`#${sectionInfo.name}-stories-container-conversation`).append(`<div id="section-container-${sectionInfo.name}-conversation" class="section-container"><h4 class="section-header">${sectionInfo.name}</h4><div id="conversation-section-${sectionInfo.name}-stories-container" class="section-stories-container">`)

      _.each(sectionInfo.stories, function(story){
        let element = "<div class='story-container card-panel'>"
        element += `<span><a href="${story.loc}" target="_blank">${story.news.title}</a></span>`
        element +="</div>"
        $(`#conversation-section-${sectionInfo.name}-stories-container`).append(element)
      })

      $('#scrollspy-list-conversation').append(`<li><a href="#${sectionInfo.name}-stories-container-conversation">${sectionInfo.name}</a></li>`)
    })

    var elems = document.querySelectorAll('.scrollspy-conversation');
      let scrollSpyOptions = {
        throttle: 100,
        scrollOffset: 200,
        activeClass: 'active'
      }

      var scrollSpyInstances = M.ScrollSpy.init(elems, scrollSpyOptions);

      $('#preloader-wrapper-conversation').css('display', 'none')
      $('#conversation .content-row').css('display', 'block');

      $('.section-header').on('click', function(some, thing){
        let sectionName = some.target.innerHTML;
        let isSectionHidden = $(`#conversation-section-${sectionName}-stories-container`).hasClass('hide-section')
        if(isSectionHidden){
          $(`#conversation-section-${sectionName}-stories-container`).removeClass('hide-section');
          $(some.srcElement).removeClass('hide-section');
        } else {
          $(`#conversation-section-${sectionName}-stories-container`).addClass('hide-section');
          $(some.srcElement).addClass('hide-section');
        }
      })

  }).catch(function (error) {
    console.log(error);
  })
}