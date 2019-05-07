/**
 *
 * Asynchronously loads the component for Bps
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
