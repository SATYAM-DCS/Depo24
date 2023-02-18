const fs = require("fs");
const PDFDocument = require("pdfkit");

function createInvoice(invoice, path) {
  let doc = new PDFDocument({ size: "A4", margin: 50 });
  generateHeader(doc);
 // generateCustomerInformation(doc, invoice);
  generateHeaderLeft(doc);
  generateHeaderRight(doc);
 
  generateInvoiceTable(doc, invoice);
  //   generateFooter(doc);

  doc.end();
  doc.pipe(fs.createWriteStream(path));
}
function generateHeader(doc) {
  doc
    // .image("logo.png", 50, 45, { width: 50 })
    .fillColor("#444444")
    .fontSize(20)
    .text("DEPO24", 40, 40)
    .fontSize(10)
    .text("Depo Solutions Private Limited", 40, 50, { align: "center" })
    .text("77/1/A, Christopher Road, Topsia,", 40, 60, {
      align: "center",
    })
    .text("Kolkata - 700046", 40, 70, {
      align: "center",
    })
    .text("West Bengal", 40, 85, { align: "center" })
    .text("GSTIN: 19AAJCD1058P1Z4", 40, 100, { align: "center" })
    .moveDown();
}
function generateHeaderLeft(doc) {
  doc
    .fillColor("#444444")
    .fontSize(20)
    .text("BillTo", 20, 120,{align:"left"})
    .fontSize(10)
    .text("Depo Solutions Private Limited", 20, 130, { align: "left" })
    .text("77/1/A, Christopher Road, Topsia,", 20,140, {
      align: "left",
    })
    .text("Kolkata - 700046", 20, 150, {
      align: "left",
    })
    .text("West Bengal", 20, 160, { align: "left" })
    .text("GSTIN: 19AAJCD1058P1Z4", 20, 170, { align: "left" })
    .moveDown();
}
function generateHeaderRight(doc) {
  doc
    // .image("logo.png", 50, 45, { width: 50 })
    .fillColor("#444444")
    .fontSize(20)
    .text("ShipTo", 100, 120,{align:"right"})
    .fontSize(10)
    .text("Depo Solutions Private Limited", 100, 130, { align: "right" })
    .text("77/1/A, Christopher Road, Topsia,", 100, 140, {
      align: "left",
    })
    .text("Kolkata - 700046", 100, 150, {
      align: "right",
    })
    .text("West Bengal", 100, 160, { align: "right" })
    .text("GSTIN: 19AAJCD1058P1Z4", 100, 170, { align: "right" })
    .moveDown();
}

function generateCustomerInformation(doc, invoice) {
  doc.fillColor("#444444").fontSize(20).text("Performa-Invoice", 50, 160,{align:"right"});

  generateHr(doc, 185);


  doc
    .fontSize(10)
    .text("#:DEPO/KOL/PI/000007", 50,{align:"left"})
   
    .text("EstimateDate:30/01/2023", 50,{align:"left"})

    .text("Place of Supply:westBengal", 50,{align:"right"})
   

    .font("Helvetica-Bold")
    .font("Helvetica")
   
    .moveDown();

  generateHr(doc, 252);
}

function generateInvoiceTable(doc, invoice) {
  let i;
  const invoiceTableTop = 330;

  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    invoiceTableTop,
    "#",
    "Item & Descriptions",
    "HSN/SAC",
    "Qty",
    "Rate",
    "Discount",
    "CGST%",
    "CGST Amt",
    "SGST %",
    "SGST Amt",
    "Amount"
  );
  generateHr(doc, invoiceTableTop + 20);
  doc.font("Helvetica");

  for (i = 0; i < invoice.length; i++) {
    const item = invoice[i];
    const position = invoiceTableTop + (i + 1) * 50;
    generateTableRow(
      doc,
      position,
      item.Sn,
      item.ItemsAndDescription,
      item.rate,
      item.Discount,
      item.hsn_sac,
      item.Qty,
      item.CGSTper,
      item.CGSTamt,
      item.SGSTper,
      item.SGSTamt,
      item.Amount
    );

    generateHr(doc, position + 20);
  }

  const subtotalPosition = invoiceTableTop + (i + 1) * 50;
  generateTableRow(
    doc,
    subtotalPosition,
    "",
    "",
    "Subtotal",
    "",
    formatCurrency(invoice.subtotal)
  );

  const duePosition = subtotalPosition + 25;
  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    duePosition,
    "",
    "",
    "Total",
    "",
    formatCurrency(invoice.subtotal - invoice.paid)
  );
  doc.font("Helvetica");
}

function generateFooter(doc) {
  doc
    .fontSize(10)
    .text(
      "Total In Words:",
      50,
      780,
      { align: "left", width: 500 })
     
    .text("Looking forward for your business:",{align: "left"})
}

function generateTableRow(
  doc,
  y,
  SerialN,
  ItemsAndDescription,
    hsn_sac,
    Qty,
    rate,
    Discount,
    CGSTper,
    CGSTamt,
    SGSTper,
    SGSTamt,
    Amount
) {
  doc
    .fontSize(10)
    .text(SerialN, 50, 400)
    .text(ItemsAndDescription, 70, 400, { width: 250 })
    .text(rate, 150, 400, { width: 40, align: "right" })
    .text(hsn_sac, 200, 400, { width: 60, align: "right" })
    .text(Discount, 250, 400, { width: 60 })
    .text(CGSTper, 300, 400, { width: 60 })
    .text(CGSTamt, 350, 400, { width: 60 })
    .text(SGSTper, 400, 400, { width: 60 })
    .text(CGSTamt, 550, 400, { width: 60 })
    .text(Qty, 600, 400, { align: "right" })
    .text(Amount, 650, 400, { width: 60 })
}

function generateHr(doc, y) {
  doc.strokeColor("#aaaaaa").lineWidth(1).moveTo(50, y).lineTo(550, y).stroke();
}

function formatCurrency(cents) {
  return "$" + (cents / 100).toFixed(2);
}

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return year + "/" + month + "/" + day;
}

module.exports = {
  createInvoice,
};
