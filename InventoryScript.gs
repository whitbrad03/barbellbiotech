// BARBELL BIOTECH — INVENTORY GOOGLE APPS SCRIPT
// Deploy as Web App: Execute as Me, Who has access: Anyone

const INVENTORY_SHEET_ID = '1qr_aLbAzbSe1yufH5m_TKRrX_XHx9heG049dQWOC5B0';

function doGet(e) {
  try {
    const sheet = SpreadsheetApp.openById(INVENTORY_SHEET_ID).getActiveSheet();
    const data = sheet.getDataRange().getValues();
    const headers = data[0]; // [productId, productName, stock]
    
    // Build inventory keyed by "productId_productName" for variant matching
    const inventory = {};
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const productId = row[0].toString();
      const productName = row[1].toString().trim();
      const stock = parseInt(row[2]) || 0;
      const key = productId + '_' + productName;
      inventory[key] = { productId, productName, stock };
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, inventory }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(e) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: e.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    if (data.action === 'updateStock') {
      return updateStock(data.productId, data.productName, data.quantity);
    }
    return ContentService
      .createTextOutput(JSON.stringify({ error: 'Invalid action' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function updateStock(productId, productName, quantityToDeduct) {
  const sheet = SpreadsheetApp.openById(INVENTORY_SHEET_ID).getActiveSheet();
  const data = sheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) {
    const rowId = data[i][0].toString();
    const rowName = data[i][1].toString().trim();
    // Match by productId and partial productName
    if (rowId === productId.toString() && 
        (rowName.toLowerCase().includes(productName.toLowerCase()) || 
         productName.toLowerCase().includes(rowName.toLowerCase()))) {
      const currentStock = parseInt(data[i][2]) || 0;
      const newStock = Math.max(0, currentStock - quantityToDeduct);
      sheet.getRange(i + 1, 3).setValue(newStock);
      return ContentService
        .createTextOutput(JSON.stringify({ success: true, newStock }))
        .setMimeType(ContentService.MimeType.JSON);
    }
  }
  return ContentService
    .createTextOutput(JSON.stringify({ error: 'Product not found', productId, productName }))
    .setMimeType(ContentService.MimeType.JSON);
}
