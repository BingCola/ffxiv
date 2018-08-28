/**
 * Base webpack config used across other specific configs
 */

import path from 'path';
import webpack from 'webpack';
export const chunks = {
    'app': [path.join(__dirname, './index.js')]
}