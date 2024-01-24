const exceljs = require('exceljs');
const path = require('path');

class ExcelHandler {
    async SheetHandler(report_type){
        let reports = [];
        let workbook = new exceljs.Workbook();
        const pathFile = path.join(__dirname, '../../files/demo.xlsx');
        await workbook.xlsx.readFile(pathFile)
        .then(async() => {

            //Searching the column which corresponds to the given report type
            const worksheet = workbook.getWorksheet(1);
            let counter = 1;
            let cellName;
            do{
                const cell = worksheet.getRow(1).getCell(counter);
                if(cell.value == report_type){
                    cellName = cell.address;
                    counter = 2;
                    break;
                }else{
                    counter++;
                }
                
            }while(counter < 30);


            //Finding the reports number on said column
            const isEmpty = false;
            const clean_col = cellName.replace(/[0-9]/g, '');
            const column = worksheet.getColumn(clean_col);

            column.eachCell((cell, rownumber) => {
                if (rownumber >= 2){
                    reports.push(cell.value);
                }
            });

            
        });
        return reports;
    }
}

module.exports = new ExcelHandler();