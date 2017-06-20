<template>
  <div id="app">
    <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
      <div class="container">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse"
                  data-target="#bs-example-navbar-collapse-1">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">uBank</a>
        </div>
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav">
            <li>
              <router-link :to="'/home'">На главную</router-link>
            </li>
            <li>
              <router-link :to="'/card'">Карты</router-link>
            </li>
            <li>
              <router-link :to="'/template'">Шаблоны</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="container">

      <router-view></router-view>

      <hr>

      <footer>
        <div class="row">
          <div class="col-lg-12">
            <p style="color: lightsalmon">&copy; Octocode 2017</p>
          </div>
        </div>
      </footer>
    </div>

  </div>
</template>

<script>
  $(window).scroll(function () {
    if ($(".navbar").offset().top > 50) {
      $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
      $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
  });

  //jQuery for page scrolling feature - requires jQuery Easing plugin
  $(function () {
    $(document).on('click', 'a.page-scroll', function (event) {
      var $anchor = $(this);
      $('html, body').stop().animate({
        scrollTop: $($anchor.attr('href')).offset().top
      }, 1500, 'easeInOutExpo');
      event.preventDefault();
    });
  });

</script>

<style>
  body {
    padding-top: 115px;
  }

  .portfolio-item {
    margin-bottom: 25px;
  }

  footer {
    margin: 50px 0;
  }

  html {
    width: 100%;
    height: 100%;
  }

  @media (min-width: 767px) {
    .navbar {
      padding: 20px 0;
      -webkit-transition: background .5s ease-in-out, padding .5s ease-in-out;
      -moz-transition: background .5s ease-in-out, padding .5s ease-in-out;
      transition: background .5s ease-in-out, padding .5s ease-in-out;
    }

    .top-nav-collapse {
      padding: 0;
    }
  }

  .intro-section {
    height: 100%;
    padding-top: 150px;
    text-align: center;
    background: #fff;
  }

  .about-section {
    height: 100%;
    padding-top: 150px;
    text-align: center;
    background: #eee;
  }

  .services-section {
    height: 100%;
    padding-top: 150px;
    text-align: center;
    background: #fff;
  }

  .contact-section {
    height: 100%;
    padding-top: 150px;
    text-align: center;
    background: #eee;
  }

  a.navbar-brand {
    color: lightsalmon !important;
    font-size: x-large;
  }

  a.router-link-active {
    border-bottom: solid 2px lightsalmon;
    box-shadow: 0 0 10px rgba(0, 0, 0, 1), 0 4px 8px rgba(0, 0, 0, 0.3);
    /*border-radius: 5px;*/
    background-color: transparent;
  }
</style>
