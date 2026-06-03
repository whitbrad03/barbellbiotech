// BARBELL BIOTECH — INVENTORY GOOGLE APPS SCRIPT
//
// SETUP INSTRUCTIONS:
// 1. Go to script.google.com and create a new project
// 2. Paste this entire file into the editor
// 3. Click Deploy > New Deployment > Web App
// 4. Set "Execute as" to "Me" and "Who has access" to "Anyone"
// 5. Click Deploy and copy the Web App URL
// 6. Paste that URL into src/config.js as INVENTORY_SCRIPT_URL

const INVENTORY_SHEET_ID = '1qr_aLbAzbSe1yufH5m_TKRrX_XHx9heG049dQWOC5B0';

function doGet(e) {
  try {
    const sheet = SpreadsheetApp.openById(INVENTORY_SHEET_ID).getActiveSheet();
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    
    const inventory = {};
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const item = {};
      headers.forEach((h, j) => item[h] = row[j]);
      inventory[item.productId] = {
        productName: item.productName,
        stock: parseInt(item.stock) || 0,
      };
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
      return updateStock(data.productId, data.quantity);
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

function updateStock(productId, quantityToDeduct) {
  const sheet = SpreadsheetApp.openById(INVENTORY_SHEET_ID).getActiveSheet();
  const data = sheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] == productId) {
      const currentStock = parseInt(data[i][2]) || 0;
      const newStock = Math.max(0, currentStock - quantityToDeduct);
      sheet.getRange(i + 1, 3).setValue(newStock);
      return ContentService
        .createTextOutput(JSON.stringify({ success: true, newStock }))
        .setMimeType(ContentService.MimeType.JSON);
    }
  }
  
  return ContentService
    .createTextOutput(JSON.stringify({ error: 'Product not found' }))
    .setMimeType(ContentService.MimeType.JSON);
}
