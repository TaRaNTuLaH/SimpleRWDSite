document.addEventListener("DOMContentLoaded",function(){
    const toggle = document.querySelector(".page-nav-toggle");
    const nav =  document.querySelector(".page-nav-list");
    const mobileNav = nav.cloneNode(true);

    mobileNav.classList.remove('page-nav-list');
    mobileNav.classList.add('mobile-page-nav-list');

    document.body.appendChild(mobileNav);

    toggle.addEventListener("click",function(){
        document.body.classList.toggle("nav-show");
    })
});