document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("calcBtn").addEventListener("click", calculateQuotation);
  document.getElementById("printBtn").addEventListener("click", printQuotation);
  document.getElementById("pdfBtn").addEventListener("click", downloadPDF);
});

function calculateQuotation() {
  const name = document.getElementById("customerName").value.trim();
  const date = document.getElementById("quoteDate").value;
  const width = parseFloat(document.getElementById("width").value) || 0;
  const height = parseFloat(document.getElementById("height").value) || 0;
  const quantity = parseInt(document.getElementById("quantity").value) || 1;

  if (!name || !date || width <= 0 || height <= 0) {
    alert("Please fill all required fields with valid numbers!");
    return;
  }

  const materialDropdown = document.getElementById("material");
  const materialValue = parseFloat(materialDropdown.value);
  const materialName = materialDropdown.options[materialDropdown.selectedIndex].text;

  const frameDropdown = document.getElementById("frame");
  const frameValue = parseFloat(frameDropdown.value);
  const frameName = frameDropdown.options[frameDropdown.selectedIndex].text;

  const laminationDropdown = document.getElementById("lamination");
  const laminationValue = parseFloat(laminationDropdown.value);
  const laminationName = laminationDropdown.options[laminationDropdown.selectedIndex].text;

  const addonsDropdown = document.getElementById("addons");
  const addonsValue = parseFloat(addonsDropdown.value);
  const addonsName = addonsDropdown.options[addonsDropdown.selectedIndex].text;

  const designing = parseFloat(document.getElementById("designing").value) || 0;
  const remark = document.getElementById("remark").value;

  const area = width * height;
  const materialCost = area * materialValue;
  const frameCost = area * frameValue;
  const laminationCost = area * laminationValue;
  const addonsCost = area * addonsValue;

  const total = (materialCost + frameCost + laminationCost + addonsCost + designing) * quantity;

  const quoteHTML = `
    <div id="pdfContent" style="padding:10px; background:#fff; color:#000;">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <h2>Quotation</h2>
        <img src="logo.png" alt="Logo" style="width:100px; height:auto;">
      </div>

      <p><strong>Customer:</strong> ${name}</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Size:</strong> ${width}ft × ${height}ft (${area.toFixed(2)} sq.ft)</p>
      <p><strong>Quantity:</strong> ${quantity}</p>

      <table style="width:100%; border-collapse: collapse;" border="1">
        <tr><th>Description</th><th>Amount (₹)</th></tr>
        <tr><td>Material (${materialName})</td><td>${(materialCost*quantity).toFixed(2)}</td></tr>
        <tr><td>Frame (${frameName})</td><td>${(frameCost*quantity).toFixed(2)}</td></tr>
        <tr><td>Lamination (${laminationName})</td><td>${(laminationCost*quantity).toFixed(2)}</td></tr>
        <tr><td>Add-ons (${addonsName})</td><td>${(addonsCost*quantity).toFixed(2)}</td></tr>
        <tr><td>Designing Charges</td><td>${(designing*quantity).toFixed(2)}</td></tr>
        <tr><td><strong>Total</strong></td><td><strong>${total.toFixed(2)}</strong></td></tr>
      </table>

      ${remark ? `<p><strong>Remark:</strong> ${remark}</p>` : ''}

      <p style="font-style:italic; margin-top:10px;">Note: Rates valid for 15 days from quotation date.</p>

      <div class="footer" style="margin-top:20px; font-size:14px;">
        <strong>Contact:</strong><br>
        Sumit Mittal, Namit Mittal<br>
        9368885855, 9359995855<br>
        vimalpress@gmail.com<br>
        vimalpress.com
      </div>

      <div class="signature" style="margin-top:40px; text-align:right; font-weight:bold;">
        ___________________________<br>Authorized Signature
      </div>
    </div>
  `;

  document.getElementById("quotation").innerHTML = quoteHTML;
}

function printQuotation() {
  const quote = document.getElementById("quotation");
  if (!quote.innerHTML.trim()) return alert("Please generate the quotation first!");
  window.print();
}

async function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const content = document.getElementById("quotation");
  if (!content.innerHTML.trim()) return alert("Please generate the quotation first!");

  const canvas = await html2canvas(content, { scale: 2 });
  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const imgWidth = pageWidth - 20;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
  const name = document.getElementById("customerName").value || "Quotation";
  pdf.save(`${name}_Quotation.pdf`);
}
