$(function() {
  const $form = $(".form");

  function hostnameURL($URL) {
    let URL = "";
    for (let i = $URL.indexOf(".") + 1; i < $URL.length; i++) {
      URL = URL.concat($URL[i]);
      if ($URL[i] === "/") {
        break;
      }
    }
    let domain = $("<a>")
      .attr("href", "#")
      .text("(" + URL + ")");
    return domain;
  }

  function toggleFavsAll() {
    let ele = $(".favall");
    if (ele.text() === "favorites") {
      ele.text("all");
      $("ol > li > i.fa-star-o")
        .parent()
        .hide();
    } else if (ele.text() === "all") {
      ele.text("favorites");

      $("ol > li > i.fa-star-o")
        .parent()
        .show();
      $("ol > li").show();
    }
  }

  // toggle favorites and all links
  //$(".favall").on("click", toggleFavsAll(e))
  $(".favall").on("click", function() {
    let ele = $(this);
    if (ele.text() === "favorites") {
      ele.text("all");
      $("ol > li > i.fa-star-o")
        .parent()
        .hide();
    } else if (ele.text() === "all") {
      ele.text("favorites");

      $("ol > li > i.fa-star-o")
        .parent()
        .show();
      $("ol > li").show();
    }
  });
  // form submission of a new article

  $form.on("submit", function(e) {
    e.preventDefault();

    // Set the title to a variable
    let $title = $("#abc").val();
    // Set the URL to a variable
    let $URL = $("#xyz").val();
    // Default code for a favorite start
    let $starDefault = $("<i>")
      .attr("class", "fa fa-star-o")
      .attr("aria-hidden", "true");
    // Extract hostname from URL and set to a variable using a function declared near line 4
    let $domain = hostnameURL($URL);
    // Default code for hostname '(news.google.com)''
    let $hostname = $("<small>")
      .attr("class", "text-muted hostname")
      .append($domain);
    // Default code for article title
    let $newLink = $("<a>")
      .attr("href", $URL)
      .attr("target", "_blank")
      .text(" " + $title + " ");
    // putting all the pieces together
    let $newLi = $("<li>")
      .attr("class", "row list-group-item")
      .append($starDefault)
      .append($newLink)
      .append($hostname);

    $(".articles").append($newLi);

    // clear the form
    $("#abc").val("");
    $("#xyz").val("");
    // hide the form
    $("#exampleAccordion > .item > #exampleAccordion1").toggleClass("show");
    $("#exampleAccordion > .nav-link .item > a").toggleClass("collapsed");
  });

  // Toggle link as a favorite

  $("ol").on("click", "li > i", function(e) {
    $(this).toggleClass("fa fa-star-o fa fa-star");
  });

  // Toggle links by hostname and show all (instead of favorites in navbar)

  $("ol").on("click", "li > .hostname > a", function(e) {
    e.preventDefault();

    let $a = $("small > a");
    let $link = $(this).text();

    $a.each(function(i, ele) {
      if ($(ele).text() !== $link) {
        $(ele)
          .parent()
          .parent()
          .hide();
      }
    });
    $(".favall").text("all");
  });
});
