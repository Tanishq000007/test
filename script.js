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
    let materialValue = parseFloat(materialDropdown.value);
    const materialName = materialDropdown.options[materialDropdown.selectedIndex].text;

    // Update Black Back rate to 0.83
    if (materialName.includes("Black Back")) materialValue = 0.83;

    const frameDropdown = document.getElementById("frame");
    const frameValue = parseFloat(frameDropdown.value);
    const frameName = frameDropdown.options[frameDropdown.selectedIndex].text;

    const laminationDropdown = document.getElementById("lamination");
    const laminationValue = parseFloat(laminationDropdown.value);
    const laminationName = laminationDropdown.options[laminationDropdown.selectedIndex].text;

    const eyeletsChecked = document.getElementById("eyelets").checked;
    const addonsValue = 0; // Eyelets are free
    const addonsName = eyeletsChecked ? "Eyelets" : "None";

    const designing = parseFloat(document.getElementById("designing").value) || 0;
    const remark = document.getElementById("remark").value;

    const area = width * height;
    const materialCost = area * materialValue;
    const frameCost = area * frameValue;
    const laminationCost = area * laminationValue;

    // Total = sum of all costs multiplied by quantity
    const total = (materialCost + frameCost + laminationCost + addonsValue + designing) * quantity;

    const quoteHTML = `
      <div id="pdfContent" style="padding:10px; background:#fff; color:#000;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <h2>Quotation</h2>
          <img src="logo.png" alt="Logo" style="width:100px; height:auto;">
        </div>

        <p><strong>Customer:</strong> ${name}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Size:</strong> ${width}" × ${height}" (${area.toFixed(0)} sq.in)</p>
        <p><strong>Quantity:</strong> ${quantity}</p>

        <table style="width:100%; border-collapse: collapse;" border="1">
          <tr><th>Description</th><th>Amount (₹)</th></tr>
          <tr><td>Material (${materialName})</td><td>${(materialCost*quantity).toFixed(2)}</td></tr>
          <tr><td>Frame (${frameName})</td><td>${(frameCost*quantity).toFixed(2)}</td></tr>
          <tr><td>Lamination (${laminationName})</td><td>${(laminationCost*quantity).toFixed(2)}</td></tr>
          <tr><td>Add-ons (${addonsName})</td><td>${(addonsValue*quantity).toFixed(2)}</td></tr>
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
