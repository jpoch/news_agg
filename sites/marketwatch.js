function getMarketwatch(){

  $('#mw .content-row').css('display', 'none');

fetch('https://xml-json-alpha.vercel.app/api?xml=https://www.marketwatch.com/mw_news_sitemap.xml')
  // fetch('https://api.factmaven.com/xml-to-json/?xml=https://www.marketwatch.com/mw_news_sitemap.xml')
  .then(response => response.json())
  .then(data => {

    let allLinks = data.urlset.url;
    let stories = _.first(allLinks, [150]);

    _.each(stories, function(story){
      let element = "<div class='story-container card-panel'>"
      element += `<span><a href="${story.loc}" target="_blank">${story.news.title}</a></span>`
      element +="</div>"
      $(`#stories-container-mw`).append(element)
    })

    $('#preloader-wrapper-mw').css('display', 'none')
    $('#mw .content-row').css('display', 'block');

  }).catch(function (error) {
    console.log(error);
  })
}