// tooltip.js
//
// Customization for Mode chart tooltips
//
// 1. Set variables below in the format below
// 2. Set the title option on the chart to the id of the object (i.e. Id field of the conversation)
// 3. Add the function snippet below
//
// chart = "chart_7fe2c195e6d7"
// query = "Official Groups Usage"
// title_field = "title" // field that you would like to display at top of tooltip
// tooltip_rows = [
//   ["Message Count", "msg_count"], // [label, data column title]
//   ["Users", "user_count"],
//   ["Days Inactive", "days_inactive"]
// ]
//
// customTooltip.update_tooltip(chart, query, title_field, tooltip_rows)
//
// ---------------- Do not edit below this point ---------------- //

var tooltip = {

  title_match: function(o) {
    return o["id"] == tooltip_title;
  },

  add_row: function(o, l, c) {
    new_row = "<tr class = 'new_row'><td></td><td>" + l + ": </td><td style='text-align:right'><strong>" + o[c] + "</strong></td></tr>";
    tooltip_body.append(new_row);
  },

  update_rows: function() {
    old_rows = $("html").find(".nvtooltip").find("tr");
    $(old_rows).css("display","none");
    tooltip_rows.forEach(function(r) {
      customTooltip.add_row(data_row, r[0], r[1]);
    })
  },

  update_title: function(o, tf) {
    title = $("html").find(".nvtooltip").find("tbody").prevObject.find("h3")[0];
    $(title).css("display","none");
    $("<h3>" + o[tf] + "</h3>").insertAfter(title);
  },

  update_tooltip: function(chart, query, title_field, tooltip_rows){
    data = alamode.getDataFromQuery(query);

    setInterval(function() {
      $("#" + chart).find("path").mousemove(function() {
        tooltip_body = $("html").find(".nvtooltip").find("tbody");
        tooltip_title = tooltip_body.prevObject.find("h3")[0].innerText;
        data_row = data.filter(customTooltip.title_match)[0];
        if (tooltip_body.find(".new_row").length > 0) {
          return false;
        } else {
          customTooltip.update_rows();
          customTooltip.update_title(data_row, title_field);
        }
      })
    }, 100)
  }
}
