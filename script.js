document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("calcBtn").addEventListener("click", calculateQuotation);
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

    const area = width * height; // area in sq ft

    const materialCost = area * materialValue;
    const frameCost = area * frameValue;
    const laminationCost = area * laminationValue;

    const total = (materialCost + frameCost + laminationCost + addonsValue) * quantity + designing;

    const quoteHTML = `
      <div id="pdfContent" style="padding:20px; background:#fff; color:#000; font-family:Arial, sans-serif;">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #000; padding-bottom:10px;">
          <h2 style="margin:0;">Quotation</h2>
          <img src="logo.png" alt="Logo" style="width:100px; height:auto;">
        </div>

        <p><strong>Customer:</strong> ${name}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Size:</strong> ${width.toFixed(2)}' × ${height.toFixed(2)}' (${area.toFixed(2)} sq.ft)</p>
        <p><strong>Quantity:</strong> ${quantity}</p>

        <table style="width:100%; border-collapse: collapse; margin-top:10px;" border="1">
          <tr><th>Description</th><th>Amount (₹)</th></tr>
          <tr><td>Material (${materialName})</td><td>${(materialCost*quantity).toFixed(2)}</td></tr>
          <tr><td>Frame (${frameName})</td><td>${(frameCost*quantity).toFixed(2)}</td></tr>
          <tr><td>Lamination (${laminationName})</td><td>${(laminationCost*quantity).toFixed(2)}</td></tr>
          <tr><td>Add-ons (${addonsName})</td><td>${(addonsValue*quantity).toFixed(2)}</td></tr>
          <tr><td>Designing Charges</td><td>${designing.toFixed(2)}</td></tr>
          <tr><td><strong>Total</strong></td><td><strong>${total.toFixed(2)}</strong></td></tr>
        </table>

        ${remark ? `<p><strong>Remark:</strong> ${remark}</p>` : ''}

        <p style="font-style:italic; margin-top:10px;">Note: Rates valid for 15 days from quotation date.</p>

        <div style="margin-top:20px; font-size:14px; border-top:1px solid #ccc; padding-top:10px;">
          <strong>Contact:</strong><br>
          Sumit Mittal, Namit Mittal<br>
          9368885855, 9359995855<br>
          vimalpress@gmail.com | vimalpress.com
        </div>

        <div style="margin-top:40px; text-align:right; font-weight:bold;">
          ___________________________<br>Authorized Signature
        </div>
      </div>
    `;

    document.getElementById("quotation").innerHTML = quoteHTML;
}
