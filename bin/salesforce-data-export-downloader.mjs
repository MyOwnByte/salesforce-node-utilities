#!/usr/bin/env node

import exportdata from '../src/handlers/salesforce-data-export-downloader.mjs';
exportdata(process.argv);
// require('../src/salesforce-data-export-downloader.mjs').exportdata(process.argv);