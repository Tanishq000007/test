document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("calcBtn").addEventListener("click", calculateQuotation);
  document.getElementById("printBtn").addEventListener("click", printQuotation);
  document.getElementById("pdfBtn").addEventListener("click", downloadPDF);
});

function calculateQuotation() {
  const name = document.getElementById("customerName").value.trim();
  const contact = document.getElementById("customerContact").value.trim();
  const date = document.getElementById("quoteDate").value;
  const paperRate = parseFloat(document.getElementById("paperType").value);
  const printingRate = parseFloat(document.getElementById("printingType").value);
  const laminationRate = parseFloat(document.getElementById("lamination").value);
  const cuttingRate = parseFloat(document.getElementById("cutting").value);
  const eyeletsCount = parseInt(document.getElementById("eyelets").value) || 0;
  const uvRate = parseFloat(document.getElementById("uv").value);
  const foilRate = parseFloat(document.getElementById("foil").value);
  const designing = parseFloat(document.getElementById("designing").value) || 0;
  const discount = parseFloat(document.getElementById("discount").value) || 0;
  const gstPercent = parseFloat(document.getElementById("gst").value) || 0;

  if (!name || !date) {
    alert("Please fill all required fields!");
    return;
  }

  // For now, fixed area of 12x18 inches (~1 sq.ft for simplicity)
  const area = 1; 
  const quantity = 1; // fixed quantity for now

  const materialCost = paperRate * area;
  const printingCost = printingRate * area;
  const laminationCost = laminationRate * area;
  const cuttingCost = cuttingRate * area;
  const eyeletsCost = eyeletsCount * 5; // ₹5 per eyelet placeholder
  const uvCost = uvRate * area;
  const foilCost = foilRate * area;

  const subtotal = materialCost + printingCost + laminationCost + cuttingCost + eyeletsCost + uvCost + foilCost;
  const totalAfterDiscount = subtotal - discount + designing;
  const gstAmount = (gstPercent / 100) * totalAfterDiscount;
  const totalAmount = totalAfterDiscount + gstAmount;
  const rupee = "₹";

  const quoteHTML = `
    <div>
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <h2>Quotation</h2>
        <img src="logo.png" alt="Logo" style="width:100px;">
      </div>

      <p><strong>Customer:</strong> ${name}</p>
      <p><strong>Contact:</strong> ${contact || "N/A"}</p>
      <p><strong>Date:</strong> ${date}</p>

      <table>
        <tr><th>Description</th><th>Cost (${rupee})</th></tr>
        <tr><td>Paper (${document.getElementById("paperType").selectedOptions[0].text})</td><td>${rupee}${materialCost.toFixed(2)}</td></tr>
        <tr><td>Printing (${document.getElementById("printingType").selectedOptions[0].text})</td><td>${rupee}${printingCost.toFixed(2)}</td></tr>
        <tr><td>Lamination (${document.getElementById("lamination").selectedOptions[0].text})</td><td>${rupee}${laminationCost.toFixed(2)}</td></tr>
        <tr><td>Cutting (${document.getElementById("cutting").selectedOptions[0].text})</td><td>${rupee}${cuttingCost.toFixed(2)}</td></tr>
        <tr><td>Eyelets (${eyeletsCount})</td><td>${rupee}${eyeletsCost.toFixed(2)}</td></tr>
        <tr><td>UV (${document.getElementById("uv").selectedOptions[0].text})</td><td>${rupee}${uvCost.toFixed(2)}</td></tr>
        <tr><td>Foil (${document.getElementById("foil").selectedOptions[0].text})</td><td>${rupee}${foilCost.toFixed(2)}</td></tr>
        <tr><td>Subtotal</td><td>${rupee}${subtotal.toFixed(2)}</td></tr>
        <tr><td>Discount</td><td>-${rupee}${discount.toFixed(2)}</td></tr>
        <tr><td>Designing Charges</td><td>${rupee}${designing.toFixed(2)}</td></tr>
        <tr><td>GST (${gstPercent}%)</td><td>${rupee}${gstAmount.toFixed(2)}</td></tr>
        <tr><td><strong>Total</strong></td><td><strong>${rupee}${totalAmount.toFixed(2)}</strong></td></tr>
      </table>

      <p style="font-style:italic; margin-top:10px;">Note: Rates valid for 15 days from quotation date.</p>

      <div class="footer">
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
  const quote = document.getElementById("quotation");
  if (!quote.innerHTML.trim()) return alert("Please generate the quotation first!");
  const printWindow = window.open("", "_blank");
  printWindow.document.write(`
    <html>
      <head>
        <title>Quotation</title>
        <style>
          body { font-family: Arial; padding:20px; }
          table { width:100%; border-collapse: collapse; }
          th, td { border:1px solid #333; padding:6px; text-align:left; }
        </style>
      </head>
      <body>${quote.innerHTML}</body>
    </html>
  `);
  printWindow.document.close();
  printWindow.print();
}

async function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const content = document.getElementById("quotation");
  if (!content.innerHTML.trim()) return alert("Please generate the quotation first!");
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
