function getAthletic(){

  $('#athletic .content-row').css('display', 'none');

fetch('https://xml-json-alpha.vercel.app/api?xml=https://www.nytimes.com/sitemaps/new/news.xml.gz')
  // fetch('http://localhost:8000/api?xml=https://www.nytimes.com/sitemaps/new/news.xml.gz')
  .then(response => response.json())
  .then(data => {

    let allLinks = data.urlset.url;
    let stories = _.first(allLinks, [400]);

    let articles = _.filter(stories, function(story){
      let section = story.loc.split("https://www.nytimes.com/")[1].split("/");
      if(section[0] === 'athletic'){
        return story
      }
    })

    let sectionElement = `<div id="athletic-stories-container-athletic" class="scrollspy-athletic section-container"></div>`
      $('#stories-container-athletic').append(sectionElement);

    $(`#athletic-stories-container-athletic`).append(`<div id="athletic-section-athletic-stories-container" class="section-stories-container"></div>`)

    _.each(articles, function(article){      
        let element = "<div class='story-container card-panel'>"
        element += `<span><a href="${article.loc}" target="_blank">${article.news.title}</a></span>`
        element +="</div>"
        $(`#athletic-section-athletic-stories-container`).append(element)
    })

      $('#preloader-wrapper-athletic').css('display', 'none')
      $('#athletic .content-row').css('display', 'block');

  }).catch(function (error) {
    console.log(error);
  })
}

function parseURL(link){

}