// sheets.js — Google Sheets Connector
// Replace ENDPOINT with your Google Apps Script Web App URL.
//
// ── Google Apps Script to paste at script.google.com ─────────────────
// function doPost(e) {
//   const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
//   const d = JSON.parse(e.postData.contents);
//   if (sheet.getLastRow() === 0)
//     sheet.appendRow(["Name","Email","Phone","Timestamp"]);
//   sheet.appendRow([d.name, d.email, d.phone, d.timestamp]);
//   return ContentService
//     .createTextOutput(JSON.stringify({status:"ok"}))
//     .setMimeType(ContentService.MimeType.JSON);
// }
// ─────────────────────────────────────────────────────────────────────

const SheetsConnector = {
  ENDPOINT: "https://script.google.com/macros/s/AKfycbzToWoHIwo5fUgYs10rP-qmWQP4S_jsBt-koFHZaFwytnEUfGFRFoww54rlWvsJUFVTzg/exec", // Paste your deployed Apps Script URL here

  async send(data) {
    if (!this.ENDPOINT) return;
    try {
      await fetch(this.ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:      data.name,
          email:     data.email,
          phone:     data.phone,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (e) {
      // Non-blocking — silently ignore
    }
  },
};
