import sys
import pdfkit

# Get the input HTML file and output PDF file from command line arguments
input_html = sys.argv[1]
output_pdf = sys.argv[2]

# Convert HTML to PDF
pdfkit.from_file(input_html, output_pdf)
