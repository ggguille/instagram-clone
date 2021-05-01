import ReactGA from 'react-ga';
import config from '../config/analytics';

ReactGA.initialize(config.measurementId, {
  debug: true
});
export default ReactGA;
