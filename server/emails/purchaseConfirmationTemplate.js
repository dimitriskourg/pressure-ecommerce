export function getPurchageConfirmationTemplate(customerName, purchaseDetails, total) {
  return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pressure Purchase Verification</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">

    <table cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="#ffffff" style="max-width: 600px; margin: 0 auto; padding: 20px; border-radius: 10px; box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);">
        <tr>
            <td align="center">
                <img src="https://sdhgasltkzqesbxxpvzu.supabase.co/storage/v1/object/public/general-images/PRESSURE-logo.png" alt="Pressure Logo" width="150">
            </td>
        </tr>
        <tr>
            <td style="padding: 20px 0;">
                <h2 style="color: #333333;">Purchase Verification</h2>
                <p style="color: #666666;">Dear ${customerName},</p>
                <p style="color: #666666;">Thank you for your recent purchase at Pressure. We have received it and will process it soon. We will update you with a new email about its status and whether it is ready to ship.</p>
                <h3>Order Details</h3>
                <table cellpadding="5" cellspacing="0" border="1" width="100%" style="border-collapse: collapse; border-color: #666666;">
                    <tr bgcolor="#f8f8f8">
                        <th style="padding: 10px;">Item</th>
                        <th style="padding: 10px;">Quantity</th>
                        <th style="padding: 10px;">Size</th>
                        <th style="padding: 10px;">Price</th>
                    </tr>
                    ${purchaseDetails.map(detail => `
                      <tr>
                        <td style="padding: 10px;">${detail.productName}</td>
                        <td style="padding: 10px;">${detail.quantity}</td>
                        <td style="padding: 10px;">${detail.size}</td>
                        <td style="padding: 10px;">${detail.price}€</td>
                      </tr>
                    `).join('')}
                    <tr bgcolor="#f8f8f8">
                        <td colspan="3" align="right" style="padding: 10px;"><strong>Total</strong></td>
                        <td style="padding: 10px;"><strong>${total}€</strong></td>
                    </tr>
                </table>
                <p style="color: #666666;">If you have any questions or concerns regarding your order, please feel free to contact us at <a href="mailto:support@pressure.com" style="color: #007bff;">support@pressure.com</a>.</p>
                <p style="color: #666666;">Thank you for shopping with us!</p>
            </td>
        </tr>
    </table>

</body>
</html>`
}
