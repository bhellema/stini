// eslint-disable-next-line import/no-cycle
import { loadScript, sampleRUM } from './aem.js';

loadScript('/scripts/gtm-init.js', { defer: true });

// Core Web Vitals RUM collection
sampleRUM('cwv');
