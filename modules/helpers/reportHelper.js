const Excel = require("exceljs");

let makeExcelSheetForOrderReport = (reportData, filename) => {
    return new Promise((resolve, reject) => {
        var file_buffers = [];
        var options = {
            useStyles: true,
            useSharedStrings: true,
            filename: filename,
        };
        var workbook = new Excel.stream.xlsx.WorkbookWriter(options);
        workbook.zip.on('data', function (buffer) {
            file_buffers.push(buffer);
        });
        var tempColumns = [
            { header: '', key: '', width: 10 },
            { header: '', key: '', width: 15 }, { header: '', key: '', width: 18 },
            { header: '', key: '', width: 15 }, { header: '', key: '', width: 13 },
            { header: '', key: '', width: 10 }, { header: '', key: '', width: 20 },
        ];

        var reportSheet = workbook.addWorksheet('Orders');

        var rowNumber = 2;
        reportSheet.getRow(rowNumber).height = 15;
        reportSheet.getRow(rowNumber).getCell(2).value = "Order No.";
        reportSheet.getRow(rowNumber).getCell(2).alignment = { vertical: 'bottom', horizontal: 'left' };
        reportSheet.getRow(rowNumber).getCell(2).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: "D3D3D3" } }
        reportSheet.getRow(rowNumber).getCell(2).font = { bold: true, size: 11, name: 'calibri' };

        reportSheet.getRow(rowNumber).getCell(3).value = "Order Date";
        reportSheet.getRow(rowNumber).getCell(3).alignment = { vertical: 'bottom', horizontal: 'left' };
        reportSheet.getRow(rowNumber).getCell(3).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: "D3D3D3" } }
        reportSheet.getRow(rowNumber).getCell(3).font = { bold: true, size: 11, name: 'calibri' };

        reportSheet.getRow(rowNumber).getCell(4).value = "User Name";
        reportSheet.getRow(rowNumber).getCell(4).alignment = { vertical: 'bottom', horizontal: 'left' };
        reportSheet.getRow(rowNumber).getCell(4).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: "D3D3D3" } }
        reportSheet.getRow(rowNumber).getCell(4).font = { bold: true, size: 11, name: 'calibri' };

        reportSheet.getRow(rowNumber).getCell(5).value = "Sub Total";
        reportSheet.getRow(rowNumber).getCell(5).alignment = { vertical: 'bottom', horizontal: 'left' };
        reportSheet.getRow(rowNumber).getCell(5).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: "D3D3D3" } }
        reportSheet.getRow(rowNumber).getCell(5).font = { bold: true, size: 11, name: 'calibri' };

        reportSheet.getRow(rowNumber).getCell(6).value = "Total";
        reportSheet.getRow(rowNumber).getCell(6).alignment = { vertical: 'bottom', horizontal: 'left' };
        reportSheet.getRow(rowNumber).getCell(6).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: "D3D3D3" } }
        reportSheet.getRow(rowNumber).getCell(6).font = { bold: true, size: 11, name: 'calibri' };

        reportSheet.getRow(rowNumber).getCell(7).value = "Payment Mode";
        reportSheet.getRow(rowNumber).getCell(7).alignment = { vertical: 'bottom', horizontal: 'left' };
        reportSheet.getRow(rowNumber).getCell(7).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: "D3D3D3" } }
        reportSheet.getRow(rowNumber).getCell(7).font = { bold: true, size: 11, name: 'calibri' };
        reportData.forEach(rowData => {
            rowNumber++;
            reportSheet.getRow(rowNumber).getCell(2).value = rowData.orderId;
            reportSheet.getRow(rowNumber).getCell(2).alignment = { vertical: 'bottom', horizontal: 'left' };


            var date = new Date(rowData.orderDate);
            var options = {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
            };
            var timeString = date.toLocaleString(options);
            reportSheet.getRow(rowNumber).getCell(3).value = timeString;
            reportSheet.getRow(rowNumber).getCell(3).alignment = { vertical: 'bottom', horizontal: 'left' };

            reportSheet.getRow(rowNumber).getCell(4).value = rowData.username;
            reportSheet.getRow(rowNumber).getCell(4).alignment = { vertical: 'bottom', horizontal: 'left' };

            reportSheet.getRow(rowNumber).getCell(5).value = rowData.subTotal;
            reportSheet.getRow(rowNumber).getCell(5).alignment = { vertical: 'bottom', horizontal: 'left' };

            reportSheet.getRow(rowNumber).getCell(6).value = rowData.total;
            reportSheet.getRow(rowNumber).getCell(6).alignment = { vertical: 'bottom', horizontal: 'left' };

            reportSheet.getRow(rowNumber).getCell(7).value = rowData.paymentMode;
            reportSheet.getRow(rowNumber).getCell(7).alignment = { vertical: 'bottom', horizontal: 'left' };
        });
        reportSheet.columns = tempColumns;
        reportSheet.commit();

        workbook.commit()
            .then(function (result) {
                var returnResult = Buffer.concat(file_buffers);
                resolve(returnResult);
            });
    })
}



let makeExcelSheetForOrderDetailReport = (reportData, filename) => {
    return new Promise((resolve, reject) => {
        var file_buffers = [];
        var options = {
            useStyles: true,
            useSharedStrings: true,
            filename: filename,
        };
        var workbook = new Excel.stream.xlsx.WorkbookWriter(options);
        workbook.zip.on('data', function (buffer) {
            file_buffers.push(buffer);
        });
        var tempColumns = [
            { header: '', key: '', width: 10 }, { header: '', key: '', width: 27 },
            { header: '', key: '', width: 35 }, { header: '', key: '', width: 12 },
            { header: '', key: '', width: 10 }
        ];
        var reportSheet = workbook.addWorksheet('Order-Details');

        var rowNumber = 2;

        reportData.forEach(rowData => {
            rowNumber++;
            reportSheet.getRow(rowNumber).getCell(2).value = "Order No.";
            reportSheet.getRow(rowNumber).getCell(2).alignment = { vertical: 'bottom', horizontal: 'left' };
            reportSheet.getRow(rowNumber).getCell(2).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: "D3D3D3" } }
            reportSheet.getRow(rowNumber).getCell(2).font = { bold: true, size: 11, name: 'calibri' };

            reportSheet.getRow(rowNumber + 1).getCell(2).value = rowData.orderId;
            reportSheet.getRow(rowNumber + 1).getCell(2).alignment = { vertical: 'bottom', horizontal: 'left' };
            reportSheet.getRow(rowNumber + 1).getCell(2).font = { bold: true, size: 11, name: 'calibri' };

            reportSheet.getRow(rowNumber + 2).getCell(2).value = rowData.orderDate;
            reportSheet.getRow(rowNumber + 2).getCell(2).alignment = { vertical: 'bottom', horizontal: 'left' };
            reportSheet.getRow(rowNumber + 2).getCell(2).font = { bold: true, size: 11, name: 'calibri' };

            reportSheet.getRow(rowNumber + 3).getCell(2).value = rowData.username;
            reportSheet.getRow(rowNumber + 3).getCell(2).alignment = { vertical: 'bottom', horizontal: 'left' };
            reportSheet.getRow(rowNumber + 3).getCell(2).font = { bold: true, size: 11, name: 'calibri' };


            reportSheet.getRow(rowNumber).getCell(3).value = "Item Name";
            reportSheet.getRow(rowNumber).getCell(3).alignment = { vertical: 'bottom', horizontal: 'left' };
            reportSheet.getRow(rowNumber).getCell(3).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: "D3D3D3" } }
            reportSheet.getRow(rowNumber).getCell(3).font = { bold: true, size: 11, name: 'calibri' };

            reportSheet.getRow(rowNumber).getCell(4).value = "Qty";
            reportSheet.getRow(rowNumber).getCell(4).alignment = { vertical: 'bottom', horizontal: 'left' };
            reportSheet.getRow(rowNumber).getCell(4).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: "D3D3D3" } }
            reportSheet.getRow(rowNumber).getCell(4).font = { bold: true, size: 11, name: 'calibri' };

            reportSheet.getRow(rowNumber).getCell(5).value = "Total";
            reportSheet.getRow(rowNumber).getCell(5).alignment = { vertical: 'bottom', horizontal: 'left' };
            reportSheet.getRow(rowNumber).getCell(5).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: "D3D3D3" } }
            reportSheet.getRow(rowNumber).getCell(5).font = { bold: true, size: 11, name: 'calibri' }

            var totalAmount = 0, totalItems = 0;
            rowData.items.forEach(item => {
                rowNumber++;
                reportSheet.getRow(rowNumber).getCell(3).value = item.name;
                reportSheet.getRow(rowNumber).getCell(3).alignment = { vertical: 'bottom', horizontal: 'left' };

                reportSheet.getRow(rowNumber).getCell(4).value = -(totalItems - (totalItems += item.orderItem.quantity));
                reportSheet.getRow(rowNumber).getCell(4).alignment = { vertical: 'bottom', horizontal: 'left' };

                reportSheet.getRow(rowNumber).getCell(5).value = -(totalAmount - (totalAmount += item.orderItem.price * item.orderItem.quantity));
                reportSheet.getRow(rowNumber).getCell(5).alignment = { vertical: 'bottom', horizontal: 'left' };
            })

            rowNumber++;
            reportSheet.getRow(rowNumber).getCell(4).value = "Total Items";
            reportSheet.getRow(rowNumber).getCell(4).alignment = { vertical: 'bottom', horizontal: 'left' };
            reportSheet.getRow(rowNumber).getCell(4).font = { bold: true, size: 11, name: 'calibri' };

            reportSheet.getRow(rowNumber).getCell(5).value = totalItems;
            reportSheet.getRow(rowNumber).getCell(5).alignment = { vertical: 'bottom', horizontal: 'left' };
            reportSheet.getRow(rowNumber).getCell(5).font = { bold: true, size: 11, name: 'calibri' }

            rowNumber++;
            reportSheet.getRow(rowNumber).getCell(4).value = rowData.paymentMode;
            reportSheet.getRow(rowNumber).getCell(4).alignment = { vertical: 'bottom', horizontal: 'left' };
            reportSheet.getRow(rowNumber).getCell(4).font = { bold: true, size: 11, name: 'calibri' };

            reportSheet.getRow(rowNumber).getCell(5).value = totalAmount;
            reportSheet.getRow(rowNumber).getCell(5).alignment = { vertical: 'bottom', horizontal: 'left' };
            reportSheet.getRow(rowNumber).getCell(5).font = { bold: true, size: 11, name: 'calibri' }

            rowNumber++;
        })

        reportSheet.columns = tempColumns;
        reportSheet.commit();

        workbook.commit()
            .then(function (result) {
                var returnResult = Buffer.concat(file_buffers);
                resolve(returnResult);
            });

    })
}


module.exports = {
    makeExcelSheetForOrderReport: makeExcelSheetForOrderReport,
    makeExcelSheetForOrderDetailReport: makeExcelSheetForOrderDetailReport
};