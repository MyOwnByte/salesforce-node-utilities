import SalesforceConnection from '../SalesforceConnection.mjs';
import SalesforceDataExportFileDownloader from '../SalesforceDataExportFileDownloader.mjs';

async function exportdata(args) {
    console.log('args:::', args);

    let sfConnection = new SalesforceConnection(args[2],args[3],args[4],args[5]);
    await sfConnection.connect();

    let downloader = new SalesforceDataExportFileDownloader(sfConnection.connection.instanceUrl, 
        sfConnection.connection.accessToken, 
        args[6]);
    downloader.download();
}

export default exportdata;