function getNpr(){

  $('#npr .content-row').css('display', 'none');


fetch('https://xml-json-alpha.vercel.app/api?xml=https://npr.org/sitemap_news.xml')
  // fetch('https://api.factmaven.com/xml-to-json/?xml=https://npr.org/sitemap_news.xml')
  .then(response => response.json())
  .then(data => {


    let allLinks = data.urlset.url;
    console.log(allLinks)
    // let stories = _.first(allLinks, [150]);

    // _.each(stories, function(story){
    //   let element = "<div class='story-container card-panel'>"
    //   element += `<span><a href="${story.loc}" target="_blank">${story.news.title}</a></span>`
    //   element +="</div>"
    //   $(`#stories-container-npr`).append(element)
    // })

    // $('#preloader-wrapper-npr').css('display', 'none')
    // $('#npr .content-row').css('display', 'block');

  }).catch(function (error) {
    console.log(error);
  })
}