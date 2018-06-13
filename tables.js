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
    $.fn.dataTable.moment( 'MMM D, YYYY' )
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
    console.log(`${tableId}-header is ready`)
    $(`${tableId}-header`).prepend(`<div class='chart-header' style='float:left;margin: 12px 0 10px 0;'>${title}</div>`);
    if (enableExport) {
      $(`${tableId}-header`).prepend(`<button id='${tableId.replace('#','')}-export' class='exportButton'>Export</button>`);
      $(`${tableId}-export`).click(function(){
        // downloadCSV({ filename: `${filename}.csv`, data: exportData });
        var data, filename, link;
        var csv = arrayToCSV({
          data: exportData
        });
        if (csv == null) return;
        filename = `${filename}.csv` || 'export.csv';
        if (!csv.match(/^data:text\/csv/i)) {
          csv = 'data:text/csv;charset=utf-8,' + csv;
        }
        data = encodeURI(csv);
        link = document.createElement('a');
        link.setAttribute('href', data);
        link.setAttribute('download', filename);
        link.click();
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

function generateExportButton(args){
  var exportData, filename, whereId;
  exportData = args.exportData;
  filename = args.filename || 'data';
  whereId = '#' + args.whereId;

  $(whereId).ready(function() {
    btn = `<button class='exportButton'><a href=${encodeURI('data:text/csv;charset=utf-8,' + arrayToCSV({ data: exportData }))} download=${filename + '.csv'}>Export</a></button>`;
    $(whereId).append(btn);
  });
}

$.fn.dataTable.moment = function ( format, locale ) {
    var types = $.fn.dataTable.ext.type;
 
    // Add type detection
    types.detect.unshift( function ( d ) {
        return moment( d, format, locale, true ).isValid() ?
            'moment-'+format :
            null;
    } );
 
    // Add sorting method - use an integer for the sorting
    types.order[ 'moment-'+format+'-pre' ] = function ( d ) {
        return moment( d, format, locale, true ).unix();
    };
};
