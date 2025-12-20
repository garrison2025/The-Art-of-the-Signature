import * as pdfjsLib from 'pdfjs-dist';
import { PDFDocument } from 'pdf-lib';

// Configure worker for PDF.js (Critical for avoiding errors in ESM environment)
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://esm.sh/pdfjs-dist@3.11.174/build/pdf.worker.min.js';

/**
 * Renders a specific page of a PDF file to a base64 image (for preview)
 */
export const renderPdfPageToImage = async (file: File, pageNumber: number = 1): Promise<{ dataUrl: string; width: number; height: number; numPages: number }> => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const page = await pdf.getPage(pageNumber);

    // Render at a decent scale for clarity
    const viewport = page.getViewport({ scale: 1.5 });
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    if (!context) throw new Error("Canvas context not available");

    canvas.height = viewport.height;
    canvas.width = viewport.width;

    await page.render({
        canvasContext: context,
        viewport: viewport
    }).promise;

    return {
        dataUrl: canvas.toDataURL('image/jpeg', 0.8),
        width: viewport.width, // Scaled width
        height: viewport.height, // Scaled height
        numPages: pdf.numPages
    };
};

/**
 * Embeds a PNG signature into a PDF at specific coordinates
 * @param pdfFile Original PDF File
 * @param signatureDataUrl Base64 PNG of the signature
 * @param pageIndex 0-based index of the page to modify
 * @param x X coordinate (in PDF points, from bottom-left)
 * @param y Y coordinate (in PDF points, from bottom-left)
 * @param width Desired width of signature
 * @param height Desired height of signature
 */
export const embedSignatureInPdf = async (
    pdfFile: File,
    signatureDataUrl: string,
    pageIndex: number,
    x: number,
    y: number,
    width: number,
    height: number
): Promise<Uint8Array> => {
    const arrayBuffer = await pdfFile.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    
    // Embed the signature image
    const pngImage = await pdfDoc.embedPng(signatureDataUrl);
    
    const pages = pdfDoc.getPages();
    const page = pages[pageIndex];
    
    // Draw the image
    page.drawImage(pngImage, {
        x,
        y,
        width,
        height,
    });

    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
};

/**
 * Helper to download raw bytes as a file
 */
export const downloadPdfBytes = (data: Uint8Array, filename: string) => {
    const blob = new Blob([data], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
