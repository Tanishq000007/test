function calculateQuotation() {
    const customerName = document.getElementById('customerName').value;
    const contactNumber = document.getElementById('contactNumber').value;
    const paperType = document.getElementById('paperType').value;
    const quantity = parseInt(document.getElementById('quantity').value) || 0;
    const printingType = document.getElementById('printingType').value;
    const lamination = document.getElementById('lamination').value;
    const cutting = document.getElementById('cutting').value;
    const eyelets = parseInt(document.getElementById('eyelets').value) || 0;
    const uv = document.getElementById('uv').value;
    const foil = document.getElementById('foil').value;
    const designing = parseFloat(document.getElementById('designing').value) || 0;
    const discount = parseFloat(document.getElementById('discount').value) || 0;
    const gstPercent = parseFloat(document.getElementById('gst').value) || 0;

    const areaPerPiece = 1.5;

    let baseRate = 50;
    if(paperType === 'Art Paper') baseRate = 50;
    else if(paperType === 'Craft Paper') baseRate = 40;
    else if(paperType === 'Metallic Paper') baseRate = 60;
    else if(paperType === 'Tracing Paper') baseRate = 45;
    else if(paperType === 'Vinyl') baseRate = 70;
    else if(paperType === 'Flex') baseRate = 55;

    let printMultiplier = 1;
    if(printingType === 'Digital') printMultiplier = 1;
    else if(printingType === 'Offset') printMultiplier = 1.2;
    else if(printingType === 'Screen') printMultiplier = 1.5;
    else if(printingType === 'Eco-Solvent') printMultiplier = 1.8;
    else if(printingType === 'UV Printing') printMultiplier = 2;

    let printingCost = baseRate * printMultiplier * areaPerPiece * quantity;

    let laminationCost = (lamination==='Gloss'||lamination==='Matte')? 10*areaPerPiece*quantity : 0;
    let cuttingCost = (cutting==='Straight'||cutting==='Die Cutting')? 5*quantity : 0;
    let eyeletCost = 2 * eyelets * quantity;
    let uvCost = (uv==='Yes')? 15*areaPerPiece*quantity : 0;
    let foilCost = (foil==='Yes')? 25*areaPerPiece*quantity : 0;

    let subtotal = printingCost + laminationCost + cuttingCost + eyeletCost + uvCost + foilCost + designing;
    let totalAfterDiscount = subtotal - discount;
    let gstAmount = totalAfterDiscount * (gstPercent/100);
    let totalAmount = totalAfterDiscount + gstAmount;

    document.getElementById('qCustomerName').innerText = customerName;
    document.getElementById('qContactNumber').innerText = contactNumber;

    let tbody = document.getElementById('quotationBody');
    tbody.innerHTML = `
        <tr><td>Printing</td><td>${paperType}, ${printingType}, 12"x18"</td><td>${printingCost.toFixed(2)}</td></tr>
        <tr><td>Lamination</td><td>${lamination}</td><td>${laminationCost.toFixed(2)}</td></tr>
        <tr><td>Cutting</td><td>${cutting}</td><td>${cuttingCost.toFixed(2)}</td></tr>
        <tr><td>Eyelets</td><td>${eyelets} per piece</td><td>${eyeletCost.toFixed(2)}</td></tr>
        <tr><td>UV</td><td>${uv}</td><td>${uvCost.toFixed(2)}</td></tr>
        <tr><td>Foil</td><td>${foil}</td><td>${foilCost.toFixed(2)}</td></tr>
        <tr><td>Designing</td><td>-</td><td>${designing.toFixed(2)}</td></tr>
    `;

    document.getElementById('subtotal').innerText = subtotal.toFixed(2);
    document.getElementById('discountAmount').innerText = discount.toFixed(2);
    document.getElementById('gstAmount').innerText = gstAmount.toFixed(2);
    document.getElementById('totalAmount').innerText = totalAmount.toFixed(2);

    document.getElementById('quotation').style.display = 'block';
}

function downloadPDF() {
    const { jsPDF } = window.jspdf;
    let doc = new jsPDF();
    doc.html(document.getElementById('quotation'), {
        callback: function(pdf) {
            let customerName = document.getElementById('customerName').value || 'Quotation';
            pdf.save(customerName + "_Quotation.pdf");
        },
        x: 10,
        y: 10,
        html2canvas: { scale: 0.5 }
    });
}

function printQuotation() {
    let printContents = document.getElementById('quotation').innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
}
