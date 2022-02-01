//This is the URL of the Google sheet with a 'callback function' with a response we'll pare down to JSON. What's JSON? See: https://en.wikipedia.org/wiki/JSON
//If you want to see the URL of the sheet itself, copy this into your browser: https://docs.google.com/spreadsheets/d/1DA6htKy-Z-8QRkifkLbzlzG2r5YWOKE77JXEJNmq45g/.

sheetIndex = 0;
sheetsFileID = "1Rblx_OsCI0TqN2tWCC98AGT_fjKDUuz_Z74IO_JbvhE";

console.log(sheetIndex);
console.log(sheetsFileID);

var SHEETSRESPONSE = `https://docs.google.com/spreadsheets/d/${sheetsFileID}/gviz/tq?tqx=out:json&tq&gid=${sheetIndex}`;

console.log(SHEETSRESPONSE);

//This waits until the baseline page is loaded and then gets the JSON feed, and as long as it doesn't error, calls the readdata function to start taking that feed and drawing the HVAC parts. The way it does this is through 'AJAX', which stands for 'Asynchronous JavaScript And XML'. This allows you to go and get data from a server/service (like Google Sheets) after the page has loaded.

/*This is probably your first time seeing options/settings supplied to a JS function with key:value pairs. The syntax for the function is: 
$.ajax({name:value, name:value, ... })
In the example below, 'url' and 'success' are both options. The value for the option is the item that comes after the colon (:), the URL or call back function we want to execute in the case of success.
*/

//For more on AJAX, see: https://www.w3schools.com/xml/ajax_intro.asp
//For more on the JQuery function that does this for us, see: https://www.w3schools.com/jquery/ajax_ajax.asp

$(document).ready(function () {
  $.ajax({
    url: SHEETSRESPONSE,
    success: function (data) {
      partfeed = prepData(data);
      //console.log(partfeed.table.rows[0].c[1].v);
      loadParts(partfeed);
    }
  });
});

function prepData(data) {
  //response has a junk line at top (/*O_o*/), so we split it on the newline character and get the second row, [1]
  data = data.split("\n");
  //this is a kind of hacky solution to extracting the JSON body from the sheets response, using a regular expression to remove the stuff we don't want- OK for a proof of concept; and the HinH team is going to use Firebase for the 'production' version anyway
  data = data[1].replace(
    /google.visualization.Query.setResponse\((.*)\);/,
    "$1"
  );
  if (isJson(data)) {
    partfeed = JSON.parse(data);
    return partfeed;
  } else {
    console.log("it is not JSON- yarf");
  }
}

function isJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

function loadParts(partfeed) {
  //these statements initialize the variables below, meaning that it puts them in the baseline state we want before we start doing stuff with them
  const firstCol = 1;

  /* This is a for loop that iterates through the rows from the Google Sheet, now JSON objects. What is a for loop? See: https://www.w3schools.com/js/js_loop_for.asp. See also the Codecademy module on Javascript: https://www.codecademy.com/learn/introduction-to-javascript. 
    //The JSON represents a single sheet in Google Sheets. The model is that the sheet has a table, the table has a series of rows, and those rows have values and then sometimes supplemental items. JS also has built-in facilities to index a JSON scheme where, for example, this statement:
  …partfeed.table.rows[i].c[j].v;
  based on the schema from Google Sheets and the JSON response it got, which is 'partfeed', is able to reference the value of cell in the jth column of the ith row of the table element. There's a pretty good written tutorial on JSON here, if you're interested: 
  https://www.w3schools.com/js/js_json_syntax.asp
  */
  //partfeed.table.rows.length
  for (var i = 0; i < partfeed.table.rows.length; i++) {
    //partfeed[i] indexes a given row in the array of data that has the JSON content. What is an array? See: https://www.w3schools.com/js/js_arrays.asp or check out the Codecademy tutorial above (module on arrays).
    var row = [];
    //console.log('we are on the ' + i + 'th row');

    //this loop puts a row's worth of data, which is one part, into an array and passes it to another function that draws the div

    for (var j = firstCol; j < partfeed.table.rows[i].c.length; j++) {
      console.log("we are on the " + j + "th item");
      if (partfeed.table.rows[i].c[j] === null) {
        val = "";
      } else {
        val = partfeed.table.rows[i].c[j].v;
      }
      console.log(val);

      //since we're iterating from the first column but we still want our arrays to start at 0, we do an offset of 1
      row[j - 1] = val;
    }
    drawDiv(row, "#parts-content");
  }
}

//Basically, this function takes a rows-worth/parts-worth of data and maps the right parameters onto JQuery functions that draw the div.
function drawDiv(divData, parent) {
  //Write parts-content div
  var $partsrow = $("<tr/>");
  for (var k = 0; k < divData.length; k++) {
    console.log("k is " + k);
    var cell = $("<td></td>");
    cell.html(divData[k]);
    $partsrow.append(cell);
  }

  $(parent).append($partsrow);
}
