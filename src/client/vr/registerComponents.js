import renderViz from './renderViz';
import renderMenu from './renderMenu';

const HIGH_COLOR = '#EF6F3D';

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
      renderViz(location);
    }
  });

  AFRAME.registerComponent('highlight', {
    schema: { default: '' },
    init() {
      this.el.addEventListener('click', this.highlightSegmentFromClick.bind(this));
    },

    remove() {
      this.el.removeEventListener('click', this.highlightSegmentFromClick.bind(this));
    },

    highlightSegmentFromClick(e) {
      let el = e.target;
      this.highlightEl(el);
      let id = el.dataset.id;
      let socket = window.socket;
      socket.emit('highlight', id);
    },

    highlightEl(el) {
      el.setAttribute('color', HIGH_COLOR);
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