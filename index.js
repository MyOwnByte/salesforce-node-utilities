require('dotenv').config();

const SalesforceConnection = require('./SalesforceConnection.js');
const SalesforceDataExportFileDownloader = require('./SalesforceDataExportFileDownloader.js');

async function init() {
    let sfConnection = new SalesforceConnection(process.env.SalesforceUrl,
        process.env.SalesforceUsername, 
        process.env.SalesforcePassword, 
        process.env.SalesforceSecurityToken);
    await sfConnection.connect();

    let downloader = new SalesforceDataExportFileDownloader(sfConnection.connection.instanceUrl, 
        sfConnection.connection.accessToken, 
        process.env.SalesforceDataExportFileDownloader_BackupFolder);
    downloader.download();
}

init();