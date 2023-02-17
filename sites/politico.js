function getPolitico(){

  $('#politico .content-row').css('display', 'none');


fetch('https://xml-json-alpha.vercel.app/api?xml=https://www.politico.com/news-sitemap.xml')
  // fetch('https://api.factmaven.com/xml-to-json/?xml=https://www.politico.com/news-sitemap.xml')
  .then(response => response.json())
  .then(data => {

    let stories = data.urlset.url;

    _.each(stories, function(story){
      let element = "<div class='story-container card-panel'>"
      element += `<span><a href="${story.loc}" target="_blank">${removeCDATA(story.news.title)}</a></span>`
      element +="</div>"
      $(`#stories-container-politico`).append(element)
    })

    $('#preloader-wrapper-politico').css('display', 'none')
    $('#politico .content-row').css('display', 'block');

  }).catch(function (error) {
    console.log(error);
  })
}

function removeCDATA(titleString) {
  return titleString.split('<![CDATA[')[1].split(']]>')[0];
}