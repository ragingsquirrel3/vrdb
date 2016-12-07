import registerComponents from './registerComponents';
import renderMenu from './renderMenu';
import renderViz from './renderViz';


export default function render () {
  // listen for syncing
  const socket = io();
  socket.on('sync', (config) => {
    renderViz(config.chromosome, config);
  });

	registerComponents();
  // renderViz on selecting item
  renderMenu();
}
