function getWired(){

  $('#wired .content-row').css('display', 'none');

fetch('https://xml-json-alpha.vercel.app/api?xml=https://www.wired.com/feed/google-latest-news/sitemap-google-news')
  // fetch('https://api.factmaven.com/xml-to-json/?xml=https://www.wired.com/feed/google-latest-news/sitemap-google-news')
  .then(response => response.json())
  .then(data => {

    let allLinks = data.urlset.url;

    let withoutShoppingLinks = allLinks.filter(function(content){
      if(!content.news.keywords.includes('Shopping')) return content
    })

    _.each(withoutShoppingLinks, function(story){
      let element = "<div class='story-container card-panel'>"
      element += `<span><a href="${story.loc}" target="_blank">${story.news.title}</a></span>`
      element +="</div>"
      $(`#stories-container-wired`).append(element)
    })

    $('#preloader-wrapper-wired').css('display', 'none')
    $('#wired .content-row').css('display', 'block');

  }).catch(function (error) {
    console.log(error);
  })
}