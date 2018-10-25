function setupReport(tableArgs, replaceTextArgs) {
//   generateTable(tableArgs);

  $(document).ready(function() {
    replaceText(replaceTextArgs);
  });
}

function generateTable(args) {
  let tableData = args.tableData;
  let cols = [];
  for (i = 0; i < args.cols.length; i++) {
    cols.push({
      'data': args.cols[i]
    });
  };
  let title = args.title;
  let tableId = '#' + args.tableId || '#customTable';

  $(document).ready(function() {
    $(tableId).DataTable({
      'data': tableData,
      'columns': cols,
      'pageLength': 25,
      dom: `<"${tableId}-header"f>tpi`,
      'pagingType': 'simple',
      'info': true,
      'order': []
    });
  });

  addHeaders(args.cols, tableId);

  $(`${tableId}-header`).ready(function() {
    $(`${tableId}-header`).prepend(`<div class='chart-header' style='float:left;margin: 12px 0 10px 0;'>${title}</div>`);
  });
}

function addHeaders(columns, tableId) {
  for (let i = 0; i < columns.length; i++) {
    $(`${tableId} thead tr`).append("<th>" + columns[i].split('_').join(' ') + "</th>");
  };
}

function replaceText(args) {
  let emptyBigNumber = args.emptyBigNumber || '--';
  let chartRenderError = args.chartRenderError || 'Sorry, no data for the selected time period';
  let tableRenderError = args.tableRenderError || 'Sorry, no data for the selected time period';
  let textSpansToReplace = args.textSpansToReplace || [];
  let headersToAppend = args.headersToAppend || [];
  let customAppends = args.customAppends || [];

  for (let i = 0; i < textSpansToReplace.length; i++) {
    $(`text tspan:contains(${textSpansToReplace[i][0]})`).replaceWith(textSpansToReplace[i][1]);
  }

  for (let i = 0; i < headersToAppend.length; i++) {
    $(`div.in-place-edit-text:contains(${headersToAppend[i][0]})`).append(headersToAppend[i][1]);
  }

  for (let i = 0; i < customAppends.length; i++) {
    $(customAppends[i][0]).append(customAppends[i][1]);
  }

  $("span.fb-content:contains('{{ctrl.content}}')").text(emptyBigNumber);
  $("h3:contains('Sorry, unable to render a chart with the given data')").text(chartRenderError);
  $(".message:contains('No rows returned')").replaceWith(tableRenderError).css('margin', '15px !important');
  $("td:contains('alert')").each(function() {
    $(this).text('broadcaster');
  });
}
