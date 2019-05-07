/**
 *
 * Asynchronously loads the component for Block
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
