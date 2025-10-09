document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("calcBtn").addEventListener("click", calculateQuotation);
  document.getElementById("printBtn").addEventListener("click", printQuotation);
  document.getElementById("pdfBtn").addEventListener("click", downloadPDF);
});

function calculateQuotation() {
  const name = document.getElementById("customerName").value.trim() || "N/A";
  const contact = document.getElementById("customerContact").value.trim() || "N/A";
  const date = document.getElementById("quoteDate").value || "N/A";
  const quantity = parseInt(document.getElementById("quantity").value) || 1;

  const paperRate = parseFloat(document.getElementById("paperType").value) || 0;
  const printingRate = parseFloat(document.getElementById("printingType").value) || 0;
  const laminationRate = parseFloat(document.getElementById("lamination").value) || 0;
  const cuttingRate = parseFloat(document.getElementById("cutting").value) || 0;
  const dyeCharges = parseFloat(document.getElementById("dyeCharges").value) || 0;
  const eyeletsCount = parseInt(document.getElementById("eyelets").value) || 0;
  const eyeletRate = 1;
  const uvRate = parseFloat(document.getElementById("uv").value) || 0;
  const foilRate = parseFloat(document.getElementById("foil").value) || 0;
  const designing = parseFloat(document.getElementById("designing").value) || 0;
  const discount = parseFloat(document.getElementById("discount").value) || 0;
  const gstPercent = parseFloat(document.getElementById("gst").value) || 0;
  const remark = document.getElementById("remark").value;

  // Calculate costs
  const materialCost = paperRate * quantity;
  const printingCost = printingRate * quantity;
  const laminationCost = laminationRate * quantity;
  const cuttingCost = cuttingRate * quantity;
  const eyeletsCost = eyeletsCount * eyeletRate * quantity;
  const uvCost = uvRate * quantity;
  const foilCost = foilRate * quantity;

  const subtotal = materialCost + printingCost + laminationCost + cuttingCost + eyeletsCost + uvCost + foilCost;
  const totalAfterDiscount = subtotal - discount + designing;
  const gstAmount = (gstPercent / 100) * totalAfterDiscount;
  const totalAmount = totalAfterDiscount + gstAmount;

  const rupee = "₹";

  const quoteHTML = `
    <div id="pdfContent" style="padding:10px; background:#fff; color:#000;">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <h2>Quotation</h2>
        <img src="logo.png" alt="Logo" style="width:100px;">
      </div>

      <p><strong>Customer:</strong> ${name}</p>
      <p><strong>Contact:</strong> ${contact}</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Quantity:</strong> ${quantity}</p>

      <table style="width:100%; border-collapse: collapse;" border="1">
        <tr><th>Description</th><th>Amount (${rupee})</th></tr>
        <tr><td>Paper (${document.getElementById("paperType").selectedOptions[0].text})</td><td>${rupee}${materialCost.toFixed(2)}</td></tr>
        <tr><td>Printing (${document.getElementById("printingType").selectedOptions[0].text})</td><td>${rupee}${printingCost.toFixed(2)}</td></tr>
        <tr><td>Lamination (${document.getElementById("lamination").selectedOptions[0].text})</td><td>${rupee}${laminationCost.toFixed(2)}</td></tr>
        <tr><td>Cutting (${document.getElementById("cutting").selectedOptions[0].text})</td><td>${rupee}${cuttingCost.toFixed(2)}</td></tr>
        <tr><td>Dye Charges</td><td>${rupee}${dyeCharges.toFixed(2)}</td></tr>
        <tr><td>Eyelets (${eyeletsCount})</td><td>${rupee}${eyeletsCost.toFixed(2)}</td></tr>
        <tr><td>UV (${document.getElementById("uv").selectedOptions[0].text})</td><td>${rupee}${uvCost.toFixed(2)}</td></tr>
        <tr><td>Foil (${document.getElementById("foil").selectedOptions[0].text})</td><td>${rupee}${foilCost.toFixed(2)}</td></tr>
        <tr><td>Subtotal</td><td>${rupee}${subtotal.toFixed(2)}</td></tr>
        <tr><td>Discount</td><td>-${rupee}${discount.toFixed(2)}</td></tr>
        <tr><td>Designing Charges</td><td>${rupee}${designing.toFixed(2)}</td></tr>
        <tr><td>GST (${gstPercent}%)</td><td>${rupee}${gstAmount.toFixed(2)}</td></tr>
        <tr><td><strong>Total</strong></td><td><strong>${rupee}${totalAmount.toFixed(2)}</strong></td></tr>
      </table>

      ${remark ? `<p><strong>Remark:</strong> ${remark}</p>` : ''}

      <div class="footer" style="margin-top:20px; display:flex; justify-content:space-between;">
        <div>
          <strong>Contact:</strong><br>
          9368885855, 9359995855<br>
          vimalpress@gmail.com<br>
          vimalpress.com
        </div>
        <div style="text-align:right;">
          <p>Signature</p>
        </div>
      </div>
    </div>
  `;

  document.getElementById("quotation").innerHTML = quoteHTML;
}

function printQuotation() {
  const content = document.getElementById("quotation").innerHTML;
  if (!content.trim()) return alert("Generate quotation first!");
  const printWindow = window.open("", "_blank");
  printWindow.document.write(`<html><head><title>Quotation</title><style>
    body { font-family: Arial; padding:20px; }
    table { width:100%; border-collapse: collapse; }
    th, td { border:1px solid #333; padding:6px; }
    th { background:#007bff; color:#fff; }
    td:first-child { text-align:left; }
    td:last-child { text-align:right; }
  </style></head><body>${content}</body></html>`);
  printWindow.document.close();
  printWindow.print();
}

async function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const content = document.getElementById("quotation");
  if (!content.innerHTML.trim()) return alert("Generate quotation first!");
  const canvas = await html2canvas(content, { scale:2, useCORS:true });
  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");
  const pageWidth = pdf.internal.pageSize.getWidth();
  const imgWidth = pageWidth - 20;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
  const name = document.getElementById("customerName").value || "Quotation";
  pdf.save(`${name}_Quotation.pdf`);
}
