'use strict';

//////////////////////////////////////////////////////////////
//-- Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');

const tabsContainer = document.querySelector('.operations__tab-container');

const tabsContent = document.querySelectorAll('.operations__content');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);

overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////////////////////////////
//-- button scrolling
btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());

  console.log('Current Scroll (x/y)', window.scrollX, window.scrollY);

  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  //***scrolling
  ///old ways

  // window.scrollTo(
  //   s1coords.left + window.scrollY,
  //   s1coords.top + window.scrollY
  // );

  // window.scrollTo({
  //   left: s1coords.left + window.scrollX,
  //   top: s1coords.top + window.scrollY,
  //   behavior: 'smooth',
  // });

  ///modern way
  section1.scrollIntoView({
    behavior: 'smooth',
  });
});

//////////////////////////////////////////////////////////////
//-- Page Navigation

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });               ////we implemented this using event delegation

////////event dele gation
//steps:
//1. add event listner to common parent element
//2. Determine what element oriignated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  //matching strategy:- to only run below code when nav item is clicked
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
    });
  }
});

///////////////////////////////////////////////////////////
//-- tabbed component   (operations)

tabsContainer.addEventListener('click', function (e) {
  e.preventDefault();
  const clicked = e.target.closest('.operations__tab');

  //Guard clause
  if (!clicked) return;

  //remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(tc => tc.classList.remove('operations__content--active'));

  //Activate tab
  clicked.classList.add('operations__tab--active');

  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//////////////////////////////////////////////////////////////

//-- Menu Fade animation

const handleHover = function (e) {
  // console.log(this, e.currentTarget);

  if (e.target.classList.contains('nav__link')) {
    //here we are not using any closet because we cannot click to its children because it doesn't have any. we have used in tabbed component

    const link = e.target; //element we want

    //select all siblings by first selecting parent having  class nav and then select all childrens of nav having class nav__link
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');

    //select logo
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });

    logo.style.opacity = this;
  }
};

/*   // REFACTOR KIYA HAI UPAR

nav.addEventListener('mouseover', function (e) {
  if (e.target.classList.contains('nav__link')) {
    //here we are not using any closet because we cannot click to its chilren because it doesn't have any
    const link = e.target; //element we want

    //select all siblings by first selecting parent having  class nav and then select all childrens of nav having class nav__link
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');

    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = 0.5;
    });

    logo.style.opacity = 0.5;
  }
});

nav.addEventListener('mouseout', function (e) {
  //basically unto what you do using mouseover when mouse is back
  if (e.target.classList.contains('nav__link')) {
    
    const link = e.target; 

    const siblings = link.closest('.nav').querySelectorAll('.nav__link');

    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = 0.5;
    });

    logo.style.opacity = 0.5;
  }
});

*/
//passing "argument" into handler. or usig the handlehover y setting ''this''

nav.addEventListener('mouseover', handleHover.bind(0.5));

//basically undo what you do using mouseover when mouse is back
nav.addEventListener('mouseout', handleHover.bind(1));

///////////////////////////////////////////////////////////////////////
// -- sticky navigation :- using 'scroll event'

const initialCords = section1.getBoundingClientRect(); //section ki top ke coords

console.log(initialCords);
//scrolll event is available on window not document
//this event will be fired off each time we scroll on our page
window.addEventListener('scroll', function (e) {
  // console.log(window.scrollY);

  //if scroll passes section1 then only add class
  if (this.window.scrollY > initialCords.top) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
});

// -- sticky navigation :- using 'Intersection Observer API'

//EXAMPLE INTERSECTION OBSERVER
// const obsCallback = function (entries, observer) {
//   //callled each time the target ele intersect with root ele at threshold that we define. (no matter we scroll up or down).i.e here whenever the secton1 intersect with viewport at 10% func runs

//   //2 arguments :enteries: array of threshold enteries . observer is intersection obeserver

//   entries.forEach(entry => {
//     console.log(entry);
//     console.log("Hello")
//   })

// };
// const obsOptions = {
//   //this object needs a root element: root is ele that the target is intersecting
//   root: null, //ele or null(so target will be intersect with entire viewport)
//   // threshold: 0.1, //10% //% of intersection at which obs callback will be called.we can have multiple thresholds as a array
//   threshold: [0, 0.2],

// }
// const observer = new IntersectionObserver(obsCallback, obsOptions);

//use observer to observe certain target :Pass target ele to .observer method
// observer.observe(section1);

///END EXAMPLE

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
// console.log(navHeight);

const stickyNav = function (entries) {
  const [entry] = entries; //enteries is array
  // console.log(entry);

  if (!entry.isintersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`, //add box of x pixels that will be applied outside of our target ee . here header so add -90 px means it will stop bfore 90px of its end.means it will pretend like it has shortage of 90px than its original sze
});
headerObserver.observe(header);

///////////////////////////////////////////////////////////////////////
// -- Revealing elements on scroll
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

///////////////////////////////////////////////////////////////////////
// -- Lazy loading images

const imgTarget = document.querySelectorAll('img[data-src]'); //select all images which have the property of data-src
const loadImg = (entries, observer) => {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;

  //Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  //once it replcaes(it replacess behind the scene) and loads new image it emits load event and it is good to remove the class in that image that means the image is completly loaded. else it can happen that in a slow network we remove the class and the image is not successfully lodead 100%. so only remove class once image is clearly loaded
  entry.target.classList.remove('lazy-img');
  entry.target.addEventListener('load', function () {});

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTarget.forEach(img => imgObserver.observe(img));

///////////////////////////////////////////////////////////////////////
// -- Slider

const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let currentSlide = 0;
  const maxSlide = slides.length;

  // const slider = document.querySelector('.slider');
  // slider.style.transform = 'scale(0.3) translateX(-1200px)'; //make slider small so that we can see as a developer in development process
  // slider.style.overflow = 'visible';

  //FUNCTIONS
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = slide => {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
    activateDot(slide);
  };

  // go to next slide (change %  for all slides)
  const nextSlide = function () {
    if (currentSlide === maxSlide - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }

    goToSlide(currentSlide);
  };

  //previous slide
  const prevSlide = function () {
    if (currentSlide === 0) {
      currentSlide = maxSlide - 1;
    } else {
      currentSlide--;
    }

    goToSlide(currentSlide);
  };

  const init = function () {
    //initilize
    createDots();

    goToSlide(0); //at start we want to move all slides to adjacent with 1st slide(0th) being the current slide
  };

  init();

  //EVENT Handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    // console.log(e);
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const slide = e.target.dataset.slide;
      //const {slide} = e.target.dataset;

      goToSlide(slide);
    }
  });
};

slider();

document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built!', e);
});

window.addEventListener('load', function (e) {
  console.log('Page fully loaded', e);
});

// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = '';
// });
