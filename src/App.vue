<template>
  <div id="app">
    <li class="active">
      <router-link :to="'/home'">На главную</router-link>
    </li>
    <li>
      <router-link :to="'/card'">Карты</router-link>
    </li>
    <li>
      <router-link :to="'/template'">Шаблоны</router-link>
    </li>

    <router-view></router-view>
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
    width: 100%;
    height: 100%;
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
</style>
