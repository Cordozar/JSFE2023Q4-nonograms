// Tabs

window.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tabs .tabs__tab');
  const tabNames = document.querySelectorAll('.tabs .tabs__tab-name');
  const refresh = document.querySelector('.tabs__refresh');

  function removeSelectedTabs() {
    tabs.forEach((tab) => {
      tab.classList.remove('tabs__tab_select');
    });
  }

  function selectClickedTab(clickedTag) {
    clickedTag.classList.add('tabs__tab_select');
  }

  function filterBySelectedTab(selectTab) {
    const products = document.querySelectorAll('.tabs .tabs__product');
    products.forEach((product) => {
      if (product.closest(`[data-category="${selectTab}"]`)) {
        product.classList.remove('hidden');
      } else {
        product.classList.add('hidden');
      }
    });
  }

  function showAllProducts() {
    const curTab = document.querySelector('.tabs__tab_select .tabs__tab-name');
    const allTabProducts = document.querySelectorAll(
      `[data-category="${curTab.textContent.toLowerCase()}"]`
    );

    allTabProducts.forEach((el) => {
      el.classList.remove('hidden');
    });

    refresh.classList.remove('show');
  }

  function handleWindowSizeChange() {
    const maxProducts = 4;
    const selectTabName = document.querySelector(
      '.tabs__tab_select .tabs__tab-name'
    );
    const curProducts = document.querySelectorAll(
      `[data-category="${selectTabName.textContent.toLowerCase()}"]`
    );

    if (window.matchMedia('(max-width: 768px)').matches) {
      if (curProducts.length > maxProducts) {
        for (let i = maxProducts; i < curProducts.length; i += 1) {
          curProducts[i].classList.add('hidden');
        }
        refresh.classList.add('show');
        refresh.classList.remove('hidden');
      } else {
        refresh.classList.remove('show');
        refresh.classList.add('hidden');
      }
    } else {
      showAllProducts();
      for (let i = 0; i < curProducts.length; i += 1) {
        curProducts[i].classList.remove('hidden');
      }
      refresh.classList.remove('show');
      refresh.classList.add('hidden');
    }
  }
  handleWindowSizeChange();
  window.addEventListener('resize', handleWindowSizeChange);

  const tabsContainer = document.querySelector('.tabs__products');
  function addCards(cardsInfo) {
    tabsContainer.innerHTML = '';
    cardsInfo.forEach((el) => {
      tabsContainer.innerHTML += `<div class="tabs__product" data-category="${el.category}">
                                    <div class="tabs__img-container">
                                      <div class="tabs__img"></div>
                                    </div>
                                    <div class="tabs__text-block">
                                      <div>
                                        <div class="tabs__product-name">
                                          ${el.name}
                                        </div>
                                        <p class="tabs__product-discription">
                                          ${el.description}
                                        </p>
                                      </div>
                                      <div class="tabs__product-price">
                                        $${el.price}
                                      </div>
                                    </div>
                                  </div>`;
    });
  }

  fetch('../../assets/products.json')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      addCards(data);
      filterBySelectedTab(tabNames[0].textContent.toLowerCase());
      handleWindowSizeChange();
    })
    .catch((error) => {
      console.error('There was a problem with the fetch operation:', error);
    });

  document
    .querySelector('.tabs .tabs__flex-container')
    .addEventListener('click', (e) => {
      const target = e.target;
      const selectTab = target
        .closest('.tabs__tab')
        .querySelector('.tabs__tab-name')
        .textContent.toLowerCase();

      if (target.closest('.tabs__tab')) {
        tabs.forEach((tab, i) => {
          if (tab === target.closest('.tabs__tab')) {
            removeSelectedTabs();
            selectClickedTab(tabs[i]);
            filterBySelectedTab(selectTab);
            handleWindowSizeChange();
          }
        });
      }
    });

  refresh.addEventListener('click', () => {
    showAllProducts();
  });
});
