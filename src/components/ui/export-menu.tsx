'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Icons } from '@/components/icons';
import { toast } from 'sonner';

interface ExportMenuProps {
  data: Record<string, string | number>[];
  filename?: string;
  headers?: string[];
}

export function ExportMenu({ data, filename = 'export', headers }: ExportMenuProps) {
  // Convert data to CSV
  const convertToCSV = (data: Record<string, string | number>[]): string => {
    if (data.length === 0) return '';

    const cols = headers || Object.keys(data[0]);
    const csvRows = [];

    // Header
    csvRows.push(cols.join(','));

    // Rows
    for (const row of data) {
      const values = cols.map((col) => {
        const value = row[col] || '';
        // Escape values with commas or quotes
        const escaped = String(value).replace(/"/g, '""');
        if (escaped.includes(',') || escaped.includes('"') || escaped.includes('\n')) {
          return `"${escaped}"`;
        }
        return escaped;
      });
      csvRows.push(values.join(','));
    }

    return csvRows.join('\n');
  };

  // Download CSV
  const downloadCSV = () => {
    if (data.length === 0) {
      toast.error('Nessun dato da esportare');
      return;
    }

    const csv = convertToCSV(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success('CSV esportato con successo');
  };

  // Download JSON
  const downloadJSON = () => {
    if (data.length === 0) {
      toast.error('Nessun dato da esportare');
      return;
    }

    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.json`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success('JSON esportato con successo');
  };

  // Generate PDF (simulated - creates a printable HTML page)
  const downloadPDF = () => {
    if (data.length === 0) {
      toast.error('Nessun dato da esportare');
      return;
    }

    const cols = headers || Object.keys(data[0]);

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      toast.error('Impossibile aprire la finestra di stampa');
      return;
    }

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${filename}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #0d9488; margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th { background-color: #f0fdfa; color: #0f766e; padding: 12px; text-align: left; font-weight: 600; }
            td { padding: 10px 12px; border-bottom: 1px solid #e7e5e4; }
            tr:nth-child(even) { background-color: #fafaf9; }
            .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
            .date { color: #78716c; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>MediAnalytics Pro - ${filename}</h1>
            <span class="date">Generato il: ${new Date().toLocaleDateString('it-IT')}</span>
          </div>
          <table>
            <thead>
              <tr>
                ${cols.map((col) => `<th>${col}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${data
                .map(
                  (row) => `
                <tr>
                  ${cols.map((col) => `<td>${row[col] || ''}</td>`).join('')}
                </tr>
              `
                )
                .join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.print();

    toast.success('PDF pronto per la stampa');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' className='gap-2'>
          <Icons.arrowRight className='h-4 w-4' />
          Esporta
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={downloadCSV} className='gap-2 cursor-pointer'>
          <Icons.fileText className='h-4 w-4 text-primary' />
          <span>Esporta CSV</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={downloadJSON} className='gap-2 cursor-pointer'>
          <Icons.code className='h-4 w-4 text-accent-600' />
          <span>Esporta JSON</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={downloadPDF} className='gap-2 cursor-pointer'>
          <Icons.file className='h-4 w-4 text-error' />
          <span>Stampa / PDF</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
