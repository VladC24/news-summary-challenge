(function(exports) {

  function ArticleList() {
    this.articles = [];
  }

  ArticleList.prototype.addArticle = function(article) {
    this.articles.push(article);
  }

  ArticleList.prototype.getArticles = function(callback) {
    var newsRequest = new XMLHttpRequest();
    var self = this;

    newsRequest.open("GET", "https://content.guardianapis.com/search?api-key=80f2e23b-35ed-4933-8ce6-3330e67b642f");
    newsRequest.onload = function() {
      if (newsRequest.status >= 200 && newsRequest.status < 400) {
        var data = JSON.parse(newsRequest.responseText)
        data.response.results.forEach(function(result) {
          self.addArticle(new Article(result.title, result.url));
        });
        if (callback) {
          callback();
        }
      } else {
        alert("Not going very well! Please try again after you add some modifications to the code!")
      }
    };
    newsRequest.send();
  };

  exports.ArticleList = ArticleList;

})(this);