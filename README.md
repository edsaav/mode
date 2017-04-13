# Mode Chart Customizations
Custom JS scripts for use with Mode Analytics

## Custom Tooltips

Import this script into a Mode report to customize the information displayed in hovering toolips. Follow the directions below to implement:

### 1. Preparing your Chart

After creating your chart, edit the "title" field and set it to the "id" option. If this field is not available you will need to edit your SQL query to include this field.

### 2. Importing

Open the Mode report containing the chart you would like to edit. Open the report builder and select "edit HTML". Add the snippet below to the top of the file, before any other HTML.

```
<script src="https://mode.github.io/alamode/alamode.min.js"></script>
<script src="https://rawgit.com/edsaav/mode/master/tooltip.js"></script>
```

### 3. Customizing your Tooltip

Add the following block of code to the bottom of the report HTML. Replace the quoted strings with your desired values. You may add or subtract rows as desired.

```
<script>

chart = "chart_7fe2c195e6d7"
query = "Official Groups Usage"
title_field = "title" // field that you would like to display at top of tooltip
tooltip_rows = [
  ["Message Count", "msg_count"], // [label, data column title]
  ["Users", "user_count"],
  ["Days Inactive", "days_inactive"]
]

customTooltip.update_tooltip(chart, query, title_field, tooltip_rows)

</script>
```

## Questions?
Contact edward@zinc.it with questions.
