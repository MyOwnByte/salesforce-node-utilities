#!/usr/bin/env node

import downloadData from '../src/handlers/salesforce-data-export-downloader.mjs';
downloadData(process.argv);