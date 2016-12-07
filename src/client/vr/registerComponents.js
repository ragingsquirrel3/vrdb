import renderViz from './renderViz';
import renderMenu from './renderMenu';

export default function registerComponents() {
  AFRAME.registerComponent('update-raycaster', {
    schema: { type: 'selector' },

    init: function () {
      let raycasterEl = this.data;
      raycasterEl.components.raycaster.refreshObjects();
    }
  });

  AFRAME.registerComponent('set-location', {
    schema: { default: '' },
    init() {
      this.el.addEventListener('click', this.renderViz);
    },

    remove() {
      this.el.removeEventListener('click', this.renderViz);
    },

    renderViz(e) {
      let location = e.target.dataset.location;
      renderViz(location)
    }
  });

  AFRAME.registerComponent('view-menu', {
    schema: { default: '' },
    init() {
      this.el.addEventListener('click', this.renderMenu);
    },

    remove() {
      this.el.removeEventListener('click', this.renderMenu);
    },

    renderMenu() {
      renderMenu()
    }
  });
}