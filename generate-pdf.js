document.getElementById('generatePdf').addEventListener('click', async () => {
    const { PDFDocument, rgb, StandardFonts } = PDFLib;
	//import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

    // Get text from textboxes
    const textbox1Text = document.getElementById('textbox1').value;
    const textbox2Text = document.getElementById('textbox2').value;
    const textbox3Text = document.getElementById('textbox3').value;
	const textbox4Text = document.getElementById('textbox4').value;

    // Load the existing template PDF file from the server
    const templatePdfUrl = 'https://ama.ua/pdf_01/tmpl.pdf'; // Adjust the URL to the actual path

    // Fetch the template PDF file as bytes
    const templatePdfResponse = await fetch(templatePdfUrl);
    if (!templatePdfResponse.ok) {
        alert('Failed to fetch the template PDF.');
        return;
    }
    const templatePdfBytes = new Uint8Array(await templatePdfResponse.arrayBuffer());

    // Load the template PDF
    const templatePdfDoc = await PDFDocument.load(templatePdfBytes);

    // Get the first page of the template PDF (you may need to adjust the page number)
    const templatePage = templatePdfDoc.getPages()[0];

    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();

    // Add the template page to the new PDF document
    const [copiedPage] = await pdfDoc.copyPages(templatePdfDoc, [0]);
    pdfDoc.addPage(copiedPage);

    // Add the modified text to the new PDF page
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    //const helveticaFontB = await pdfDoc.embedFont(StandardFonts.Helvetica-Bold);
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

    copiedPage.drawText(textbox1Text, {
        x: 42, // Adjust the X and Y coordinates as needed
        y: 12,
        size: 7,
        color: rgb(0, 0, 0),
        font: helveticaFont,
    });

    copiedPage.drawText(textbox2Text, {
        x: 41, // Adjust the X and Y coordinates as needed
        y: 4,
        size: 7,
        color: rgb(0, 0, 0),
        font: helveticaFont,
    });

    copiedPage.drawText(textbox3Text, {
        x: 70, // Adjust the X and Y coordinates as needed
        y: 8,
        size: 12,
        color: rgb(0, 0, 0),
        font: helveticaFont,
    });
   // art
    copiedPage.drawText(textbox4Text, {
        x: 3, // Adjust the X and Y coordinates as needed
        y: 8,
        size: 10,
        color: rgb(0, 0, 0),
        font: helveticaFont,
    });


    // Serialize the PDF to bytes
    const pdfBytes = await pdfDoc.save();

    // Create a blob from the PDF data
    const pdfBlob = new Blob([pdfBytes],{ type: 'application/pdf' });

    // Create a download link
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(pdfBlob);
    downloadLink.download = textbox4Text + '.pdf';
	downloadLink.click();
});
