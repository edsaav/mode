function generateTable(args){
  tableData = args.tableData;
  exportData = args.exportData || args.tableData;
  enableExport = args.enableExport || false;
  filename = args.filename || args.title.replace(/\s/g, '');
  cols = [];
  for (i = 0; i < args.cols.length; i++) {
    cols.push({ 'data': args.cols[i] })
  };
  title = args.title;
  tableId = '#' + args.tableId || '#customTable';
  
  $(document).ready(function() {
    $(tableId).DataTable({
      'data': tableData,
      'columns': cols,
      'pageLength': 25,
      dom: `<"${tableId}-header"f>tpi`,
      'pagingType': 'simple',
      'info': true
    });
  });

  $(`${tableId}-header`).ready(function() {
    $(`${tableId}-header`).prepend(`<div class='chart-header' style='float:left;margin: 12px 0 10px 0;'>${title}</div>`);
    if (enableExport) {
      $(`${tableId}-header`).prepend(`<button id='${tableId.replace('#','')}-export' class='exportButton'>Export</button>`);
      $(`${tableId}-export`).click(function(){
        downloadCSV({ filename: `${filename}.csv`, data: exportData });
      });
    }   
  });
}

function arrayToCSV(args) {
  var result, ctr, keys, columnDelimiter, lineDelimiter, data;
  data = args.data || null;
  if (data == null || !data.length) {
    return null;
  }
  columnDelimiter = args.columnDelimiter || ',';
  lineDelimiter = args.lineDelimiter || '\n';
  keys = Object.keys(data[0]);
  result = '';
  result += keys.join(columnDelimiter);
  result += lineDelimiter;
  data.forEach(function(item) {
    ctr = 0;
    keys.forEach(function(key) {
      if (ctr > 0) result += columnDelimiter;
      result += item[key];
      ctr++;
    });
    result += lineDelimiter;
  });
  return result;
}

function downloadCSV(args) {
  var data, filename, link;
  var csv = arrayToCSV({
    data: args.data
  });
  if (csv == null) return;
  filename = args.filename || 'export.csv';
  if (!csv.match(/^data:text\/csv/i)) {
    csv = 'data:text/csv;charset=utf-8,' + csv;
  }
  data = encodeURI(csv);
  link = document.createElement('a');
  link.setAttribute('href', data);
  link.setAttribute('download', filename);
  link.click();
}

function generateExportButton(args){
  exportData = args.exportData;
  filename = args.filename || 'data';
  whereId = '#' + args.whereId;

  $(whereId).ready(function() {
    $(whereId).append(`<button id='${whereId.replace('#','')}-export' class='exportButton'>Export</button>`);
    $(`${whereId}-export`).click(function(){
      downloadCSV({ filename: `${filename}.csv`, data: exportData });
    });
  });
}
