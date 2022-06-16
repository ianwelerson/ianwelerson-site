const entrySection = document.querySelector('#section-entry');
const aboutSection = document.querySelector('#section-about');
const contactSection = document.querySelector('#section-contacts');

window.addEventListener('load', () => {
  createObserver();
}, false);

function createObserver() {
  let observer = new IntersectionObserver(
    handleAnimation,
    {
      root: null,
      rootMargin: '0px',
      threshold: 0.6
    }
  );

  observer.observe(entrySection);
  observer.observe(aboutSection);
  observer.observe(contactSection);
}

function handleAnimation(entries) {
  entries.map((entrie) => {
    const goDownArrow = entrie.target.querySelector('.go-down')
    const goDownReverseClass = 'go-down--reverse'

    if (entrie.isIntersecting) {
      entrie.target.firstElementChild.classList.add('viewed')

      if (goDownArrow) {
        goDownArrow.classList.remove(goDownReverseClass)
      }
    } else {
      if (goDownArrow) {
        goDownArrow.classList.add(goDownReverseClass)
      }
    }
  })
}