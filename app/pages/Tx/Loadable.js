/**
 *
 * Asynchronously loads the component for Tx
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
