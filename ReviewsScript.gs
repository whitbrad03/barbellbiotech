// BARBELL BIOTECH — REVIEWS GOOGLE APPS SCRIPT
// 
// SETUP INSTRUCTIONS:
// 1. Go to script.google.com and create a new project
// 2. Paste this entire file into the editor
// 3. Click Deploy > New Deployment > Web App
// 4. Set "Execute as" to "Me" and "Who has access" to "Anyone"
// 5. Click Deploy and copy the Web App URL
// 6. Paste that URL into src/config.js in the React app
//
// Also create a Google Sheet and paste its ID into SHEET_ID below.
// The Sheet ID is the long string in the URL: 
// docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit

const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE'; // Replace with your Sheet ID

function doGet(e) {
  const action = e.parameter.action;
  
  if (action === 'getReviews') {
    return getReviews(e.parameter.productId);
  }
  
  return ContentService
    .createTextOutput(JSON.stringify({ error: 'Invalid action' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    if (data.action === 'submitReview') {
      return submitReview(data);
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

function getReviews(productId) {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  
  const reviews = [];
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const review = {};
    headers.forEach((h, j) => review[h] = row[j]);
    
    // Only return approved reviews for the requested product
    if (review.approved === true && (!productId || review.productId == productId)) {
      reviews.push({
        id: i,
        productId: review.productId,
        productName: review.productName,
        name: review.name,
        rating: review.rating,
        comment: review.comment,
        date: review.date,
      });
    }
  }
  
  // Sort newest first
  reviews.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  const response = ContentService
    .createTextOutput(JSON.stringify({ success: true, reviews }))
    .setMimeType(ContentService.MimeType.JSON);
  
  return response;
}

function submitReview(data) {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
  
  // Add headers if sheet is empty
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['productId', 'productName', 'name', 'rating', 'comment', 'date', 'approved']);
  }
  
  sheet.appendRow([
    data.productId,
    data.productName,
    data.name,
    data.rating,
    data.comment,
    new Date().toLocaleDateString('en-AU'),
    false, // Needs manual approval — set to TRUE in the sheet to publish
  ]);
  
  return ContentService
    .createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
