function calculateQuotation() {
    const customerName = document.getElementById('customerName').value;
    const quotationDate = document.getElementById('quotationDate').value;
    const width = parseFloat(document.getElementById('width').value);
    const height = parseFloat(document.getElementById('height').value);
    const quantity = parseInt(document.getElementById('quantity').value);
    const material = document.getElementById('material').value;
    const frame = document.getElementById('frame').value;
    const lamination = document.getElementById('lamination').value;
    const eyelets = document.getElementById('eyelets').value;
    const designingCharges = parseFloat(document.getElementById('designingCharges').value);
    const discount = parseFloat(document.getElementById('discount').value);
    const gst = parseFloat(document.getElementById('gst').value);

    const materialCost = {
        'White Back': 10,
        'Black Back': 12,
        'Matte Fabric': 20,
        'Star': 25,
        'Back Light': 35,
        'Vinyl': 35,
        'Oneway': 35,
        'Radium': 50,
        'Sunboard': 65,
        'Radium Sunboard': 100
    };

    const frameCost = frame === 'Yes' ? 25 * width * height : 0;
    const laminationCost = lamination === 'Gloss' || lamination === 'Matte' ? 10 * width * height : 0;
    const eyeletsCost = eyelets === 'Free' ? 0 : 0;

    const area = width * height;
    const materialRate = materialCost[material];
    const materialTotal = materialRate * area * quantity;

    const subtotal = materialTotal + frameCost + laminationCost + eyeletsCost + designingCharges;
    const discountAmount = discount;
    const totalAfterDiscount = subtotal - discountAmount;
    const gstAmount = (gst / 100) * totalAfterDiscount;
    const totalAmount = totalAfterDiscount + gstAmount;

    // Update Quotation Section
    document.getElementById('qCustomerName').textContent = customerName;
    document
::contentReference[oaicite:0]{index=0}
 
