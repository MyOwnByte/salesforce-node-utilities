require('dotenv').config();
jsforce = require('jsforce');
const SalesforceConnection = require('./SalesforceConnection.js');
const SalesforceDataExportFileDownloader = require('./SalesforceDataExportFileDownloader.js');

init();

async function init() {
    // console.log('process.env.Username:::', process.env.SalesforceUsername);
    // console.log('process.env.Password:::', process.env.SalesforcePassword);
    // console.log('process.env.SecurityToken:::', process.env.SalesforceSecurityToken);
    // console.log('process.env.SalesforceDataExportFileDownloader_BackupFolder:::', process.env.SalesforceDataExportFileDownloader_BackupFolder);

    let sfConnection = new SalesforceConnection(process.env.SalesforceUrl,
        process.env.SalesforceUsername, 
        process.env.SalesforcePassword, 
        process.env.SalesforceSecurityToken);
    await sfConnection.connect();
    // console.log('conn.connection:::', sfConnection.connection);
    // console.log('conn.userInfo:::', sfConnection.userInfo);

    let downloader = new SalesforceDataExportFileDownloader(sfConnection.connection.instanceUrl, 
        sfConnection.connection.accessToken, 
        process.env.SalesforceDataExportFileDownloader_BackupFolder);
    downloader.download();
}