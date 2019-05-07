/**
 *
 * Asynchronously loads the component for Dashboards
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
