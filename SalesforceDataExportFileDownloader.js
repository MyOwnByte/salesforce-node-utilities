const fs = require('fs');
const { JSDOM } = require('jsdom');
const https = require('https');

module.exports = class SalesforceDataExportFileDownloader {
    #EXPORT_DATA_URL = '/ui/setup/export/DataExportPage/d';
    #DOWNLOAD_URL = '/servlet/servlet.OrgExport';

    constructor(salesforceInstanceUrl, salesforceAccessToken, folderToStoreFiles) {
        this.salesforceInstanceUrl = salesforceInstanceUrl;
        this.salesforceAccessToken = salesforceAccessToken;
        this.folderToStoreFiles = folderToStoreFiles;
    }

    async download() {
        const downloadUrl = this.salesforceInstanceUrl + this.#EXPORT_DATA_URL;
        https.get(downloadUrl, 
                { 
                    headers: {Cookie: `sid=${this.salesforceAccessToken};`}
                },
                function(response) {
                    var body = '';
                    response.on('data', function(chunk) {
                        body += chunk;
                    });
                    response.on('end', function() {
                        this.#downloadBodyFinished(body);
                    }.bind(this));
                    
                }.bind(this))
            .on('error', function(err) {
                console.error('Error downloading file:', err);
                return 1;
            });
    }

    #downloadBodyFinished = function(body) {
        const dom = new JSDOM(body);
        let allDownloadLinks = dom.window.document.querySelectorAll('a.actionLink');
        
        let urlList = [];
        for(let i = 0; i < allDownloadLinks.length; i++) {
            if(allDownloadLinks[i].href.indexOf(this.#DOWNLOAD_URL) < 0) continue;
            let params = allDownloadLinks[i].href.split('?')[1];
            let fileUrl = this.salesforceInstanceUrl + this.#DOWNLOAD_URL+ '?' + params;
            urlList.push(fileUrl);
        }
        if(urlList.length == 0) {
            console.log('No files to download');
        }
        this.#downloadFiles(urlList);
    }

    #performDownload = function(url, dest, callback){
        const file = fs.createWriteStream(dest);
        https.get(
            url, 
            { 
                gzip: true,
                headers: {Cookie: `sid=${this.salesforceAccessToken};`}
            },
            function(response) {
                response.pipe(file);
                file.on('finish', function() {
                });
                file.on('error', function (err) {
                    console.error(err);
                    return 1;
                });
            })
            .on('error', function(err) {
                console.error('Error downloading file:', err);
                return 1;
            });
    }

    #downloadFiles = function(urlList) {
        urlList.forEach(function(downloadUrl) {
            let filename = this.#getFilename(downloadUrl);
            console.log('Downloading ' + filename);
            this.#performDownload(downloadUrl, this.folderToStoreFiles + filename, function() {
                console.log('Finished Downloading:' + filename)
            });
        }.bind(this));
    }

    #getFilename = function(downloadUrl) {
        const startWildcard = '?fileName=';
        const endWildcard = '&';
        let startIndex = downloadUrl.indexOf(startWildcard) + startWildcard.length;
        let endIndex = downloadUrl.indexOf(endWildcard, startIndex);
        return downloadUrl.slice(startIndex, endIndex);
    }
}