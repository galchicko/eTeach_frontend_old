/**
 * Created by HBRlabs6 on 8/11/2019.
 */

export const downloadCSVFile = (csvText, filename) => {
    if (csvText == null) return;

    csvText = 'data:text/csv;charset=utf-8,' + csvText;

    const data = encodeURI(csvText);

    let link = document.createElement('a');
    link.setAttribute('href', data);
    link.setAttribute('download', filename);
    link.click();
};