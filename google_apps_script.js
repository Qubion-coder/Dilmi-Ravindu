const SPREADSHEET_ID = "1HoSLLw2sez1dfG7fDKDXh_DJA__qhuU0pUjERiKFo0k";

function doGet(e) {
  return handleRequest(e);
}

function doPost(e) {
  return handleRequest(e);
}

function handleRequest(e) {
  try {
    // Open the specific Google Sheet using the ID provided
    const doc = SpreadsheetApp.openById(SPREADSHEET_ID);
    
    // The formName parameter tells us if this is an RSVP or a Wish
    const formName = e.parameter.formName;
    let sheetName = "";
    let headers = [];
    let rowData = [];
    
    if (formName === "rsvp") {
      sheetName = "RSVP";
      headers = ["Timestamp", "Name", "Guests"];
      rowData = [
        new Date(),
        e.parameter["Name"] || "",
        e.parameter["Guests"] || ""
      ];
    } else if (formName === "wish") {
      sheetName = "Wishes";
      headers = ["Timestamp", "Name", "Message"];
      rowData = [
        new Date(),
        e.parameter["Name"] || "",
        e.parameter["Message"] || ""
      ];
    } else {
      return ContentService.createTextOutput(JSON.stringify({ "result": "error", "message": "Unknown formName" }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Check if the sheet exists, if not create it and add headers
    let sheet = doc.getSheetByName(sheetName);
    if (!sheet) {
      sheet = doc.insertSheet(sheetName);
      sheet.appendRow(headers);
      // Make the header row bold
      sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
    }
    
    // Append the submitted data
    sheet.appendRow(rowData);
    
    return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ "result": "error", "error": error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
