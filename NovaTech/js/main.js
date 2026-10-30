/* NovaTech shared UI behavior - jQuery is intentionally used for navigation, Ajax and UI events. */
(function($){
  "use strict";
  function toast(message,type="success"){
    if(typeof Toastify==="undefined") return;
    Toastify({text:message,duration:3200,gravity:"top",position:"right",close:true,style:{background:type==="error"?"#ef4444":"linear-gradient(135deg,#6366f1,#06b6d4)"}}).showToast();
  }
  window.novaToast=toast;

  $(window).on("scroll",function(){ $(".glass-nav").toggleClass("scrolled",$(this).scrollTop()>20); });
  $(".nav-link[href^='#'], .smooth-scroll").on("click",function(e){
    const target=$(this).attr("href"); if(target && target!=="#" && $(target).length){e.preventDefault();$("html,body").animate({scrollTop:$(target).offset().top-80},500);}
  });
  $(".newsletter-form").on("submit",function(e){e.preventDefault();toast("Thanks! You're subscribed.");this.reset();});

  if($(".hero-slider").length && typeof Swiper!=="undefined"){
    new Swiper(".hero-slider",{effect:"fade",fadeEffect:{crossFade:true},loop:true,autoplay:{delay:5000,disableOnInteraction:false},pagination:{el:".swiper-pagination",clickable:true},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}});
  }

  if($("#serviceModal").length){
    const fallback={
      "web-development":{title:"Web Development",description:"We create responsive, accessible front-end experiences with clean HTML, modern CSS, and JavaScript patterns.",features:["Responsive layouts","Accessibility-minded markup","Performance-focused front end"]},
      "ui-ux-design":{title:"UI/UX Design",description:"We shape interfaces that make complex products easy to understand and enjoyable to use.",features:["Wireframes and prototypes","Design systems","User-centered interaction"]},
      "mobile-apps":{title:"Mobile Apps",description:"We design mobile product experiences around clarity, speed, and real-world user behavior.",features:["Mobile-first thinking","Clear interaction flows","Polished visual direction"]},
      "cloud-solutions":{title:"Cloud Solutions",description:"We help teams plan scalable digital infrastructure concepts that support growing products.",features:["Scalable architecture concepts","Deployment planning","Reliability principles"]},
      "data-solutions":{title:"Data Solutions",description:"We organize data experiences so teams can find, understand, and use information effectively.",features:["Data organization","Dashboard concepts","Actionable reporting"]},
      "ai-integration":{title:"AI Integration",description:"We identify practical AI opportunities that can improve workflows without adding unnecessary complexity.",features:["AI workflow concepts","Automation opportunities","Human-centered AI features"]}
    };
    $(".details-btn").on("click",function(){
      const key=$(this).data("service"), modal=new bootstrap.Modal(document.getElementById("serviceModal"));
      $("#serviceModalBody").html('<div class="loader"></div>'); modal.show();
      $.ajax({url:"data/services.json",dataType:"json",cache:false})
       .done(function(data){renderService(data[key]||fallback[key]);})
       .fail(function(){renderService(fallback[key]);});
      function renderService(item){if(!item)return;$("#serviceModalLabel").text(item.title);$("#serviceModalBody").html("<p>"+item.description+"</p><h3 class='fs-6 mt-4'>Included</h3><ul>"+item.features.map(x=>"<li>"+x+"</li>").join("")+"</ul>");}
    });
    $(".request-service").on("click",function(){toast("Service request started. Please contact NovaTech to continue.");});
  }
})(jQuery);