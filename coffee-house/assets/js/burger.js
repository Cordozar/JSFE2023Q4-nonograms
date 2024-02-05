window.addEventListener('DOMContentLoaded', () => {
  // BurgerMenu

  const burgerBtn = document.querySelector('.burger');

  function changeMenuImg() {
    burgerBtn.classList.toggle('burger_active');
  }

  let windowWidth = window.innerWidth;
  const tabletWindowWidth = 768;

  const header = document.querySelector('.header');
  const menuBtnHeader = document.querySelector('.header__menu');
  const navHeader = document.querySelector('.header__nav');
  const logo = document.querySelector('.logo');

  function createDropDownMenu() {
    windowWidth = window.innerWidth;

    const dropDownMenu = document.createElement('div');
    dropDownMenu.classList.add('dropdown-menu');
    const checkDropDownMenu = document.querySelector('.dropdown-menu');

    const isChildInParent = header.querySelector('.dropdown-menu') !== null;

    if (windowWidth <= tabletWindowWidth && !isChildInParent) {
      dropDownMenu.append(navHeader);
      dropDownMenu.append(menuBtnHeader);

      header.append(dropDownMenu);
    }
    if (windowWidth > tabletWindowWidth) {
      logo.after(menuBtnHeader);
      logo.after(navHeader);

      menuBtnHeader.classList.add('hidden');
      navHeader.classList.add('hidden');

      if (checkDropDownMenu) {
        checkDropDownMenu.remove();
      }
    }
  }

  if (windowWidth <= tabletWindowWidth) {
    createDropDownMenu();
  }

  window.addEventListener('resize', () => {
    createDropDownMenu();
  });

  function toggleDropDownMenu() {
    document
      .querySelector('.dropdown-menu')
      .classList.toggle('dropdown-menu_open');
  }

  const body = document.querySelector('body');

  function toggleScroll() {
    body.classList.toggle('body-no-scroll');
  }

  burgerBtn.addEventListener('click', () => {
    changeMenuImg();
    toggleDropDownMenu();
    toggleScroll();
  });

  const navLinks = document.querySelectorAll('.header__nav-link');

  navLinks.forEach((el) => {
    el.addEventListener('click', () => {
      changeMenuImg();
      toggleDropDownMenu();
      toggleScroll();
    });
  });

  document.querySelector('.header__menu').addEventListener('click', () => {
    changeMenuImg();
    toggleDropDownMenu();
    toggleScroll();
  });
});
